<!-- Because CETEIcean itself uses custom elements, the shadow DOM must be disabled so that the custom element is placed directly in the real DOM. This means that inline styles are not encapsulated (can be overwritten or cause conflicts with other sections of the client app) and that Svelte slots are not available.-->
<svelte:options customElement={{ tag: "tei-converter", shadow: "none" }} />

<script>
    import { onMount } from "svelte";
    import CETEI from "CETEIcean";

    // example behaviours file
    import { teiBehaviours } from '../static/teiBehaviours'

    // load fallback default options
    import defaultConfig from './../static/TeiConverter.config.json'

    export let path = "";
    export let configPath = 'TeiConverter/TeiConverter.config.json'
    let error = undefined;
    let loaded = false;
    let config = undefined;

    onMount(async () => {
        try {
            // Tries to load custom config file
            config = await fetch(configPath).then(
                (response) => response.json()
            )
        } catch (err) {
            // If it can't, uses defaults that should be bundled in the umd
            console.log('Could not load config file, using default values', err);
            try {
                config = defaultConfig;
            } catch (err) {
                // If it can't read defaults, logs the error
                console.log('Could not load default values', err)
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
                document.getElementById("TEI-container").appendChild(data);
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
