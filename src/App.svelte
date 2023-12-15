<svelte:options customElement={{ tag: "tei-converter", shadow: "none" }} />

<script>
    import { onMount } from "svelte";
    import CETEI from "CETEIcean";
    import { teiBehaviours } from '../static/teiBehaviours'

    export let path = "";
    let error = undefined;
    let loaded = false;

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

<!-- <svelte:head>
    <link rel="stylesheet" type="text/css" href="style.css"/>
</svelte:head> -->

<div id="TEI-container" data-testid="TEI-container">
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>
