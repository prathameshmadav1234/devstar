<script>
	import Img from "./Img.svelte";
	import play from "./assets/play.svg";
	import backward from "./assets/back.svg";
	import forward from "./assets/forward.svg";
	import zoom from "./assets/zoom.svg";
	import game from "./assets/game.svg";
	let projectTitle = "Untitled Project";

	function handleExport() {
		console.log("Export clicked");
	}
</script>

<div class="container">
	<div class="header">
		<div class="title">{projectTitle}</div>
		<div class="export-container">
			<div class="export-text">Export</div>
			<button class="btn">
				<img
					alt="Export Icon"
					loading="lazy"
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ce611041759588e982af4b388bafdf465001908656f92fb74d9f7fd2974f444?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
					class="export-icon"
				/>
			</button>
		</div>
	</div>

	<!-- <img
		alt="Game Screenshot"
		loading="lazy"
		src="https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
		class="main-image"
	/> -->
	<img class="main-image" src={game} alt="main-img" />
	<div class="footer">
		<div class="footer-icons">
			<img class="footer-icon" src={backward} alt="backward" />

			<img class="footer-icon" src={play} alt="play" />

			<img class="footer-icon" src={forward} alt="backward" />
		</div>

		<img class="additional-footer-icon" src={zoom} alt="zoom" />
	</div>
</div>

<style>
	.container {
		background-color: #1d1920;
		display: flex;
		flex-direction: column;
		height: 80%;
		width: 100%;
		padding: 16px 16px 16px 32px;
	}

	.header {
		display: flex;
		width: 100%;
		gap: 20px;
		font-size: 16px;
		color: white;
		font-weight: 600;
		line-height: 150%;
	}

	.title {
		flex: 1;
		margin: auto 0;
	}

	.export-container {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 14px;
		background-color: #078060;
		border-radius: 8px;
		cursor: pointer;
	}

	.export-text {
		font-family: Inter, sans-serif;
		color: white;
	}

	.export-icon {
		width: 24px;
		height: 24px;
	}

	.main-image {
		height: 50%;
		width: 70%;
		margin: 16px 0;
		align-self: last baseline;
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 518px;
		margin: 0 auto;
	}

	.footer-icons {
		display: flex;
		gap: 20px;
	}

	.footer-icon {
		width: 32px;
		height: 32px;
	}

	.additional-footer-icon {
		width: 48px;
		height: 48px;
	}

	@media (max-width: 991px) {
		.container {
			padding-left: 20px;
		}

		.header,
		.footer {
			flex-wrap: wrap;
		}

		.footer {
			width: 100%;
			justify-content: center;
		}

		.main-image {
			margin: 16px 10px;
		}
	}
</style>
