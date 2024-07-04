<script>
	import media from "./assets/media.svg";
	import text from "./assets/text.svg";
	import audio from "./assets/audio.svg";
	import transition from "./assets/transition.svg";
	import layout from "./assets/layout.svg";
	import logo from "./assets/logo.svg";
</script>

<!-- saurabh -->
<div class="sidebar">
	<img class="img" src={logo} alt="logo" />

	<div class="icon-box">
		<img class="img" src={media} alt="media" />

		<div class="icon-box-text">Media</div>
	</div>
	<div class="icon-box">
		<img class="img" src={text} alt="text" />

		<div class="icon-box-text">Text</div>
	</div>
	<div class="icon-box">
		<img class="img" src={audio} alt="audio" />

		<div class="icon-box-text">Audio</div>
	</div>
	<div class="icon-box">
		<img class="img" src={transition} alt="transition" />

		<div class="icon-box-text">Transition</div>
	</div>
	<div class="icon-box">
		<img class="img" src={layout} alt="layout" />

		<div class="icon-box-text">Layout</div>
	</div>
</div>

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
		/* background-color: var(--Background-1, #413946); */
		display: flex;
		margin-top: 16px;
		flex-direction: column;
		color: var(--White-1, #fff);
		width: 86px;
		height: 86px;
		padding: 16px 8px;
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
</style>
