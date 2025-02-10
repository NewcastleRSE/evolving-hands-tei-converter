<!-- Because CETEIcean itself uses custom elements, the shadow DOM must be disabled so that the custom element is placed directly in the real DOM. This means that inline styles are not encapsulated (can be overwritten or cause conflicts with other sections of the client app) and that Svelte slots are not available.-->
<svelte:options customElement={{ tag: "tei-converter", shadow: "none" }} />

<script>
    import { onMount } from "svelte";
    import CETEI from "CETEIcean";

    // example behaviours file
    import { teiBehaviours } from "../static/teiBehaviours";

    // load fallback default options
    import defaultConfig from "./../static/TeiConverter.config.json";

    export let path = "";
    export let configPath = "TeiConverter/TeiConverter.config.json";
    export let pageRange = undefined;
    let error = undefined;
    let loaded = false;
    let config = undefined;

    let metadataFiles = undefined;

    onMount(async () => {
        try {
            // Tries to load custom config file
            config = await fetch(configPath).then((response) =>
                response.json(),
            );
        } catch (err) {
            // If it can't, uses defaults that should be bundled in the umd
            console.log(
                "Could not load config file, using default values",
                err,
            );
            try {
                config = defaultConfig;
            } catch (err) {
                // If it can't read defaults, logs the error
                console.log("Could not load default values", err);
            }
        }
        try {
            if (path === "") {
                throw "No path specified";
            }

            try {
                if (config.metadataSeparate) {
                    metadataFiles = {};
                    for (let key of Object.keys(config.metadataSeparate)) {
                        let xmlFile = await fetch(`${config.projectRoot}${config.metadataSeparate[key]}`);
                        let metadataFile = await xmlFile.text();
                        // parse the metadata file
                        let parser = new DOMParser();
                        let xmlDoc = parser.parseFromString(metadataFile, "text/xml");
                        metadataFiles[key] = xmlDoc
                    }
                }
            } catch (e) {
                console.warn('Could not read the metadata file: ', e)
            }

            var cetei = new CETEI();
            if (config.useCustomBehaviours) {
                cetei.addBehaviors(teiBehaviours(config, metadataFiles));
            }
            cetei.getHTML5(path, function (data) {
                // show TEI document
                document.getElementById("TEI-container").appendChild(data);

                // pagination - needs to happen after appending the data, otherwise all the behaviours will fail (the document will be empty)
                if (pageRange) {
                    let page_range = undefined;
                    // checks to see if the pageRange is valid
                    if (isNaN(pageRange)) {
                        try {
                            page_range = pageRange.split("-");
                            if (
                                !isNaN(page_range[0]) &&
                                !isNaN(page_range[1])
                            ) {
                                page_range[0] = parseInt(page_range[0]) - 1;
                                page_range[1] = parseInt(page_range[1]);
                            } else {
                                throw new Error(
                                    "Page range must be in format x-y, where x and y are numbers",
                                );
                            }
                        } catch (e) {
                            console.error(e);
                            page_range = "all";
                        }
                    } else {
                        // page range is a single number
                        page_range = [
                            parseInt(pageRange) - 1,
                            parseInt(pageRange),
                        ];
                    }

                    // Tests that the page range is in bounds
                    const pages = data.getElementsByTagName("tei-pb");
                    if (page_range[1] > pages.length) {
                        console.error(
                            `Page range is out of bounds: document only has ${pages.length} pages`,
                        );
                        page_range = "all";
                    }

                    if (page_range[0] < 0) {
                        console.error(
                            `Page numbers start at 1, not ${page_range[0] + 1}`,
                        );
                        page_range = "all";
                    }

                    if (page_range != "all") {
                        // defines starting point for pagination
                        let nextSib = pages[page_range[0]];

                        // creates the new div to be shown
                        const newBodyDiv = document.createElement("div");

                        // collects list of elements that need to be added - this collection needs to be separated from the moving of the element to avoid having to deep clone it, which will fail the custom event (though I think it shouldn't)
                        const elToAdd = [];
                        while (nextSib != pages[page_range[1]]) {
                            elToAdd.push(nextSib);
                            try {
                                nextSib = nextSib.nextSibling;
                            } catch (e) {
                                // reached the end of the array
                                console.log("reached the end of the document");
                                break;
                            }
                        }

                        // creates the new body with just the required pages
                        for (const el of elToAdd) {
                            newBodyDiv.append(el);
                        }

                        // replaces the entire body with only the selected pages
                        const body = data.getElementsByTagName("tei-body")[0];
                        body.replaceChildren(newBodyDiv);
                    }
                }
            });
            loaded = true;
        } catch (err) {
            error = err.toString();
            loaded = true;
            return;
        }
    });
</script>

<div id="TEI-container" data-testid="TEI-container">
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>
