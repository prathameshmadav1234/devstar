<script>
	let items = [
		{ icon: "plus-icon.png", label: "Media", action: "media" },
		{ icon: "canvas-icon.png", label: "Canvas", action: "canvas" },
		{ icon: "text-icon.png", label: "Text", action: "text" },
		{ icon: "audio-icon.png", label: "Audio", action: "audio" },
		{ icon: "video-icon.png", label: "Videos", action: "videos" },
		{ icon: "images-icon.png", label: "Images", action: "images" },
		{ icon: "elements-icon.png", label: "Elements", action: "elements" },
		{ icon: "record-icon.png", label: "Record", action: "record" },
		{ icon: "tts-icon.png", label: "TTS", action: "tts" },
	];

	let currentView = "media";

	function handleClick(action) {
		currentView = action;
	}
</script>

<div class="container">
	<div class="sidebar">
		{#each items as item}
			<div class="icon" on:click={() => handleClick(item.action)}>
				<img src={item.icon} alt={item.label} />
			</div>
			<div class="icon-label">{item.label}</div>
		{/each}
	</div>

	<div class="main-content">
		{#if currentView === "media"}
			<div>Media Content</div>
		{:else if currentView === "canvas"}
			<div>Canvas Content</div>
		{:else if currentView === "text"}
			<div>Text Content</div>
		{:else if currentView === "audio"}
			<div>Audio Content</div>
		{:else if currentView === "videos"}
			<div>Videos Content</div>
		{:else if currentView === "images"}
			<div>Images Content</div>
		{:else if currentView === "elements"}
			<div>Elements Content</div>
		{:else if currentView === "record"}
			<div>Record Content</div>
		{:else if currentView === "tts"}
			<div>TTS Content</div>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
	}

	.sidebar {
		width: 60px;
		background-color: #1e1e1e;
		color: #fff;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20px;
		position: fixed;
		top: 0;
		left: 0;
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
		cursor: pointer;
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

	.main-content {
		margin-left: 70px; /* Adjust based on sidebar width */
		padding: 20px;
		width: calc(
			100% - 70px
		); /* Adjust the width to take up remaining space */
		height: 100vh;
		overflow-y: auto; /* Make content scrollable if it overflows */
	}
</style>
