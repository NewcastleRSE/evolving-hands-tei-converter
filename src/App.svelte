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
    let error = undefined;
    let loaded = false;
    let config = undefined;

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
            var cetei = new CETEI();
            if (config.useCustomBehaviours) {
                cetei.addBehaviors(teiBehaviours(config));
            }
            cetei.getHTML5(path, function (data) {
                // show TEI document
                document.getElementById("TEI-container").appendChild(data);

                // pagination - needs to happen after appending the data, otherwise all the behaviours will fail (the document will be empty)
                let page_range = [0, 1]; // this will be a variable given to the converter
                // Needs test here to make sure it's in range
                const surfaces = data.getElementsByTagName("tei-surface");
                const pages = data.getElementsByTagName("tei-pb");
                
                // defines starting point for pagination
                let nextSib = pages[page_range[0]];
                
                // creates the new div to be shown
                const newBodyDiv = document.createElement("div");

                // collects list of elements that need to be added - this collection needs to be separated from the moving of the element to avoid having to deep clone it, which will fail the custom event (though I think it shouldn't)
                const elToAdd = []
                while (nextSib != pages[page_range[1]]) {
                    elToAdd.push(nextSib)
                    nextSib = nextSib.nextSibling;
                }

                // creates the new body with just the required pages
                for (const el of elToAdd) {
                    newBodyDiv.append(el);
                }
                
                // replaces the entire body with only the selected pages
                const body = data.getElementsByTagName("tei-body")[0];
                body.replaceChildren(newBodyDiv);
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
