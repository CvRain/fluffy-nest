<script lang="ts">
    import {page} from '$app/stores'
    import { afterNavigate, beforeNavigate } from '$app/navigation';

    console.log($page.params.slug)
    const slugArr = $page.params.slug.split("/")

    slugArr.forEach((value, index) =>{
        console.log(index, ":", value)
    })

    beforeNavigate((navigation) => {
        console.debug("before navigation ", navigation)
    })
    afterNavigate((navigation) =>{
        console.debug("afteer naviagtion ", navigation)
    })
</script>

{#if slugArr.length === 1}
    <h1>Viewing docs for feature{slugArr[0]}</h1>
{:else if slugArr.length === 2}
    <h1>Viewing docs for feature{slugArr[2]}</h1>
{/if}