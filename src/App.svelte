<svelte:options customElement={{tag: 'test-component', shadow: 'none'}}/>

<script>
    import { onMount } from 'svelte';
    import  CETEI  from 'CETEIcean';

    export let path='https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml'
    let error = undefined;
    let loaded = false;

    onMount(async () => {
        try {
            if (path === '') {
                throw 'No path specified';
            }
            var cetei = new CETEI();
            console.log(cetei);
            // cetei.addBehaviors(teiBehaviours);
            cetei.getHTML5(path, function(data) {
                document.getElementById('TEI-container').appendChild(data);
            });
            loaded = true;
        } catch (err) {
            error = err.toString();
            loaded = true;
            return
        }
    })


</script>

<div id='TEI-container' data-testid="TEI-container">
    {#if error}
        <p data-testid="error-message">{error}</p>
    {/if}
</div>
