<script>
	export let items = [
		{ icon: "plus-icon.png", label: "Media" },
		{ icon: "canvas-icon.png", label: "Canvas" },
		{ icon: "text-icon.png", label: "Text" },
		{ icon: "audio-icon.png", label: "Audio" },
		{ icon: "video-icon.png", label: "Videos" },
		{ icon: "images-icon.png", label: "Images" },
		{ icon: "elements-icon.png", label: "Elements" },
		{ icon: "record-icon.png", label: "Record" },
		{ icon: "tts-icon.png", label: "TTS" },
	];
</script>

<div class="sidebar">
	{#each items as item}
		<div class="icon">
			<img src={item.icon} alt={item.label} />
		</div>
		<div class="icon-label">{item.label}</div>
	{/each}
</div>

<style>
	.sidebar {
		width: 60px;
		background-color: #1e1e1e;
		color: #fff;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20px;
	}

	.sidebar .icon {
		width: 40px;
		height: 40px;
		margin: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #333;
		border-radius: 5px;
	}

	.sidebar .icon img {
		width: 20px;
		height: 20px;
	}

	.sidebar .icon-label {
		margin-top: 5px;
		font-size: 12px;
		text-align: center;
	}
</style>
