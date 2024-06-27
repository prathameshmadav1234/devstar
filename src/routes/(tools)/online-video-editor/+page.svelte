<script>

import VideoEditor from './components/VideoEditor.svelte';

</script>

<div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	
	<main>
		<h1>Video Editing App</h1>
		<VideoEditor />
	</main>
</div>

<style>

main {
        text-align: center;
        padding: 1em;
        max-width: 800px;
		color: aliceblue;
        margin: 0 auto;
    }

</style>