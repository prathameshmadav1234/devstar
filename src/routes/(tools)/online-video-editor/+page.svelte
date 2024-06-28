<script>
	import Main from "./Main.svelte";
	import SideBar from "./SideBar.svelte";

</script>

<!-- <div class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg">
	<main>
		<h1>Video Editing App</h1>
		<VideoEditor />
	</main>
	</div>
-->

<div class="div">
	<SideBar></SideBar>

	<Main></Main>
</div>

<style>
	.div {
		height: 60%;
		width: auto;
		background-color: #fff;
		display: flex;
		gap: 0px;
	}

	@media (max-width: 991px) {
		.div {
			flex-wrap: wrap;
		}
	}
</style>
