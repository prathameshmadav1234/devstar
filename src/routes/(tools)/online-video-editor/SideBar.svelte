<script>
	// Define an array of sample text fonts and their styles
	let sampleTextFonts = [
		{
			name: "Title text",
			style: "font-family: Arial; font-size: 18px; font-weight: bold;",
		},
		{
			name: "Regular text",
			style: "font-family: Verdana; font-size: 14px;",
		},
		{
			name: "Hand Write",
			style: "font-family: 'Comic Sans MS'; font-size: 14px; font-style: italic;",
		},
		{
			name: "Italic Text",
			style: "font-family: Helvetica; font-size: 14px; font-style: italic;",
		},
		{
			name: "Underline",
			style: "font-family: 'Times New Roman'; font-size: 14px; text-decoration: underline;",
		},
		{
			name: "UPPERCASE",
			style: "font-family: 'Courier New'; font-size: 14px; text-transform: uppercase;",
		},
		{
			name: "Rounded",
			style: "font-family: 'Arial Rounded MT Bold'; font-size: 14px;",
		},
		{
			name: "BLACK",
			style: "font-family: Georgia; font-size: 14px; color: black;",
		},
		{
			name: "WHITE",
			style: "font-family: Palatino; font-size: 14px; color: white; background-color: black;",
		},
		{ name: "Classic", style: "font-family: Garamond; font-size: 14px;" },
		{ name: "MEME TEXT", style: "font-family: Impact; font-size: 14px;" },
		{
			name: "Spacing",
			style: "font-family: 'Lucida Sans Unicode'; font-size: 14px; letter-spacing: 2px;",
		},
		{ name: "Manuscript", style: "font-family: Tahoma; font-size: 14px;" },
		{
			name: "STRICT",
			style: "font-family: 'Trebuchet MS'; font-size: 14px; font-weight: bold;",
		},
		{
			name: "Cheerful",
			style: "font-family: 'Arial Black'; font-size: 14px; font-weight: bold;",
		},
	];

	let audioSuggestions = [
		{
			name: "Acoustic Breeze",
			source: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
		},
		{
			name: "Sunny",
			source: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
		},
		{
			name: "Better Days",
			source: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3",
		},
		{
			name: "Energy",
			source: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
		},
		{
			name: "Epic",
			source: "https://www.bensound.com/bensound-music/bensound-epic.mp3",
		},
		{
			name: "Creative Minds",
			source: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
		},
	];

	let showTextContainer = false;
	let showAudioContainer = false;

	function toggleTextContainer() {
		showTextContainer = !showTextContainer;
	}

	function toggleAudioContainer() {
		showAudioContainer = !showAudioContainer;
	}
</script>

<div class="sidebar">
	<img
		alt=""
		loading="lazy"
		srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e8b01740b62373170157ee3f6b8975ac295a4c4aad7bff721bfe6fa31fb02b4?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
		class="img"
	/>
	<div class="icon-box">
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/c72306dafb60e47b5a46f53e8c9f6fc815278904c7bf80ae727f754bcc52e823?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Media</div>
	</div>
	<div class="icon-box" on:click={toggleTextContainer}>
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd5ae946c095474e108bcf0bf4b20e5bc97176ef0b873297b7a8c2f9f844e935?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Text</div>
	</div>
	<div class="icon-box">
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afb3affa3d01c3fcb2569d2ee002416024bf6a2a93c8edb6a644302420baac2?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Audio</div>
	</div>
	<div class="icon-box">
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/417100d7888fe9eebcf0523c5bc9e823617ce1f34b9c15d4a4b073f4b6d1666f?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Transition</div>
	</div>
	<div class="icon-box">
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8de3af592d38bda0953e3e117f57899a96240559a2069edd95abc751360022b?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Layout</div>
	</div>
	<div class="icon-box">
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b103106b39d7e38d6ec66a1482b1259b027cc4f7a5b0c1e550df5a9a8378bdb?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Shapes</div>
	</div>
	<div class="icon-box">
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5b6127d369b66bcde23695fc71b62117486b299c36549859c9b5f1b220d4a7a?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img"
		/>
		<div class="icon-box-text">Upload</div>
	</div>
</div>

{#if showTextContainer}
	<div class="text-container slide-in">
		<div id="text-fonts-container">
			{#each sampleTextFonts as font}
				<div class="font-sample" style={font.style}>{font.name}</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.sidebar {
		background-color: #352b3d;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		color: var(--Gray-1, #9ca3af);
		font-weight: 400;
		white-space: nowrap;
		text-align: center;
		line-height: 133%;
		padding: 16px 0 80px;
		position: relative;
		z-index: 1;
	}

	@media (max-width: 991px) {
		.sidebar {
			display: none;
			white-space: initial;
		}
	}

	.img {
		aspect-ratio: 1;
		object-fit: auto;
		object-position: center;
		height: 20px;
		width: auto;
		align-self: center;
	}

	.icon-box {
		background-color: var(--Background-1, #413946);
		display: flex;
		margin-top: 16px;
		flex-direction: column;
		color: var(--White-1, #fff);
		width: 86px;
		height: 86px;
		padding: 16px 8px;
		transition:
			background-color 0.3s,
			transform 0.3s;
		cursor: pointer;
	}

	.icon-box:hover {
		background-color: var(--Hover-Background-1, #564d63);
		transform: scale(1.05);
	}

	@media (max-width: 991px) {
		.icon-box {
			white-space: initial;
		}
	}

	.icon-box-text {
		font-family: Inter, sans-serif;
		margin-top: 4px;
	}

	.text-container {
		position: fixed;
		left: 0;
		top: 0;
		width: 300px;
		background-color: #413946;
		padding: 20px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		transform: translateX(-100%);
		transition: transform 0.5s ease-in-out;
		z-index: 0;
	}

	.text-container.slide-in {
		transform: translateX(
			86px
		); /* Move to the right to reveal the text container without hiding the sidebar */
	}

	.text-container.slide-out {
		transform: translateX(-100%);
	}

	#text-fonts-container {
		margin-top: 20px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		padding: 10px;
	}

	.font-sample {
		background-color: #564d63;
		padding: 10px;
		border-radius: 5px;
		color: white;
		text-align: center;
		font-size: 14px;
	}
</style>
