<!-- Because CETEIcean itself uses custom elements, the shadow DOM must be disabled so that the custom element is placed directly in the real DOM. This means that inline styles are not encapsulated (can be overwritten or cause conflicts with other sections of the client app) and that Svelte slots are not available.-->
<svelte:options customElement={{ tag: "tei-converter", shadow: "none" }} />

<script>
    import { onMount } from "svelte";
    import CETEI from "CETEIcean";

    // example behaviours file
    import { teiBehaviours } from "../static/teiBehaviours";

    // load fallback default options
    import defaultConfig from "./../static/TeiConverter.config.json";
    import { checkForExternalMetadata, loadMetadataFile } from "./utils/auxFunctions";

    export let path = "";
    export let configPath = "TeiConverter/TeiConverter.config.json";
    export let pageRange = undefined;

    let xmlString = undefined;
    let cetei = undefined;

    let error = undefined;
    let loaded = false;
    let config = undefined;

    let metadataFiles = undefined;

    let uniqueId = undefined;

    function verifyPageRange(pageRange, data) {
        let page_range = undefined;

        if (isNaN(pageRange)) {
            try {
                page_range = pageRange.split("-");
                if (!isNaN(page_range[0]) && !isNaN(page_range[1])) {
                    page_range[0] = parseInt(page_range[0]) - 1;
                    page_range[1] = parseInt(page_range[1]);
                } else {
                    throw new Error(
                        "Page range must be in format x-y, where x and y are numbers",
                    );
                }
            } catch (e) {
                console.error(e);
                return (page_range = "all");
            }
        } else {
            // page range is a single number
            return (page_range = [
                parseInt(pageRange) - 1,
                parseInt(pageRange),
            ]);
        }

        // Tests that the page range is in bounds
        const pages = data.getElementsByTagName("tei-pb");
        if (page_range[1] > pages.length) {
            console.error(
                `Page range is out of bounds: document only has ${pages.length} pages`,
            );
            return (page_range = "all");
        }

        if (page_range[0] < 0) {
            console.error(`Page numbers start at 1, not ${page_range[0] + 1}`);
            return (page_range = "all");
        }
    }

    function startPagination(pageRange, data = undefined) {
        // decides whether the pagination is being started from witin the TEI transformation, or from the reactive variable
        if (!data) {
            // if there is no data, the function is being called from the reactive value; it will replace the existing HTML five with the original one
            // this is necessary to ensure that pagination works properly, and that no custom behaviours are lost from deep cloning elements
            try {
                cetei.makeHTML5(xmlString, function (data) {
                    let rootEl = document.getElementById(
                        `TEI-container-${uniqueId}`,
                    );
                    rootEl.innerHTML = "";
                    rootEl.appendChild(data);

                    if (pageRange) {
                    pagination(pageRange, data);
                }
                });
            } catch (e) {
                // it runs once on mount, so if it fails, it will try again on the next run
                return;
            }
        } else {
            pagination(pageRange, data);
        }
    }

    function pagination(pageRange, data) {
        // pagination - needs to happen after appending the data, otherwise all the behaviours will fail (the document will be empty)

        if (pageRange) {
            let page_range = undefined;
            // checks to see if the pageRange is valid
            page_range = verifyPageRange(pageRange, data);

            const pages = data.getElementsByTagName("tei-pb");

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
    }

    onMount(async () => {
        uniqueId = Date.now();
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

            

            // separating the fetching from the transformation is necessary to allow for pagination
            // fetch the TEI file
            let metadataFiles = {};
            let xmlDoc = await fetch(path);
            if (xmlDoc.ok) {
                xmlString = await xmlDoc.text();

                // check for external metadata files
                let externalMetadata = await checkForExternalMetadata(xmlString);
                if (externalMetadata) {
                    for (const metadataFile of externalMetadata) {
                        metadataFiles[metadataFile] = await loadMetadataFile(config.projectRoot, metadataFile)
                    }
                }
            } else {
                throw new Error(`${path} does not exist`);
            }

            cetei = new CETEI({ ignoreFragmentId: true });
            if (config.useCustomBehaviours) {
                cetei.addBehaviors(teiBehaviours(config, metadataFiles));
            }

            // transform the TEI file
            cetei.makeHTML5(xmlString, function (data) {
                let rootEl = document.getElementById(
                    `TEI-container-${uniqueId}`,
                );
                rootEl.innerHTML = "";
                rootEl.appendChild(data);

                if (pageRange) {
                    pagination(pageRange, data);
                }
            });

            loaded = true;

        } catch (err) {
            error = err.toString();
            loaded = true;
            return;
        }
    });

    // pagination is reactive, each time the pageRange changes, the document is re-converted to HTML and paginated
    $: startPagination(pageRange);
</script>

<div id="TEI-container-{uniqueId}" data-testid="TEI-container">
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>
