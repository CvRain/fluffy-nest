<script lang="ts">
    import {page} from '$app/stores';
    const userName:string = $page.params.userName;
</script>

<div>
    <h1>{userName}</h1>
</div>