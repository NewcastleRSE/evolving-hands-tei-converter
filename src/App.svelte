<!-- Because CETEIcean itself uses custom elements, the shadow DOM must be disabled so that the custom element is placed directly in the real DOM. This means that inline styles are not encapsulated (can be overwritten or cause conflicts with other sections of the client app) and that Svelte slots are not available.-->
<svelte:options customElement={{ tag: "tei-converter", shadow: "none" }} />

<script>
    import { onMount } from "svelte";
    import CETEI from "CETEIcean";

    // example behaviours file
    import { teiBehaviours } from '../static/teiBehaviours'

    export let path = "";
    let error = undefined;
    let loaded = false;

    // events can be captured here
    addEventListener('drawBox', (event) => {
        console.log('This was captured in the custom component');
      })

    onMount(async () => {
        try {
            if (path === "") {
                throw "No path specified";
            }
            var cetei = new CETEI();
            console.log(cetei);
            cetei.addBehaviors(teiBehaviours);
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
