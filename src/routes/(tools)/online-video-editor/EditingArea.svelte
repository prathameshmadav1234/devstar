<script>
	import TimeLine from "./TimeLine.svelte";

	import SideBar from "./SideBar.svelte";

	import VideoEditor from "./components/VideoEditor.svelte";
</script>
<!-- Manas -->
<div class="div-24">
	<div class="div-25">
		<div class="div-26">Untitled Project</div>
		<div class="div-27">
			<div class="div-28">Export</div>
			<img
				alt=""
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ce611041759588e982af4b388bafdf465001908656f92fb74d9f7fd2974f444?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
				class="img -3"
			/>
		</div>
	</div>
	<img
		alt=""
		loading="lazy"
		srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4da4c2a296afeeff110b4f5a5c374dc8d0c414be0e7c3dd2268132bd1a36ffd0?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
		class="img -4"
	/>
	<div class="div-29">
		<div class="div-30">
			<img
				alt=""
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/be697dd2f9a381dded14f0c2db3e01e3970ec6ccc07eaaad355589a9b28666e1?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
				class="img -5"
			/><img
				alt=""
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7e8151bc4ea153f2aafaec558c34f64b8e496ca2f66e90c77025febe83bf781?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
				class="img -6"
			/><img
				alt=""
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/50434a0d2dfd999931ce93c4db7e8bb50f6718ae5903a4a168a6813641ad54f2?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
				class="img -7"
			/>
		</div>
		<img
			alt=""
			loading="lazy"
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/46d5bd3fe09d1ef571e4b307090c8b90a5f6939cba80a37ce59d7481b9b63235?apiKey=e040a0c51faa4d4d8f0634ad4d3864ea&"
			class="img -8"
		/>
	</div>
</div>

<style>
	.div-24 {
		background-color: #1d1920;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		width: 100%;
		padding: 16px 16px 16px 32px;
	}

	@media (max-width: 991px) {
		.div-24 {
			max-width: 100%;
			padding-left: 20px;
		}
	}

	.div-25 {
		display: flex;
		width: 100%;
		gap: 20px;
		font-size: 16px;
		color: var(--White-1, #fff);
		font-weight: 600;
		line-height: 150%;
	}

	@media (max-width: 991px) {
		.div-25 {
			max-width: 100%;
			flex-wrap: wrap;
		}
	}

	.div-26 {
		font-family: Inter, sans-serif;
		flex: 1;
		margin: auto 0;
	}

	.div-27 {
		justify-content: center;
		border-radius: 8px;
		background-color: var(--Primary, #078060);
		display: flex;
		gap: 8px;
		white-space: nowrap;
		text-align: center;
		padding: 12px 12px 12px 14px;
	}

	@media (max-width: 991px) {
		.div-27 {
			white-space: initial;
		}
	}

	.div-28 {
		font-family: Inter, sans-serif;
	}

	.div-29 {
		align-self: end;
		display: flex;
		width: 518px;
		max-width: 100%;
		gap: 20px;
		justify-content: space-between;
		margin: 16px 264px 0 0;
	}

	@media (max-width: 991px) {
		.div-29 {
			margin-right: 10px;
			flex-wrap: wrap;
		}
	}

	.div-30 {
		justify-content: center;
		display: flex;
		gap: 20px;
	}
</style>
