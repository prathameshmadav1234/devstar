<script>
	import media from "./assets/media.svg";
	import text from "./assets/text.svg";
	import audio from "./assets/audio.svg";
	import transition from "./assets/transition.svg";
	import layout from "./assets/layout.svg";
	import logo from "./assets/logo.svg";

	const icons = [
		{ src: media, alt: "media", label: "Media" },
		{ src: text, alt: "text", label: "Text" },
		{ src: audio, alt: "audio", label: "Audio" },
		{ src: transition, alt: "transition", label: "Transition" },
		{ src: layout, alt: "layout", label: "Layout" }
	];
</script>

<div class="sidebar">
	<img class="img logo" src={logo} alt="Logo" />

	{#each icons as icon}
		<div class="icon-box" tabindex="0" aria-label={icon.label}>
			<img class="img" src={icon.src} alt={icon.alt} />
			<div class="icon-box-text">{icon.label}</div>
		</div>
	{/each}
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

	.logo {
		height: 40px;
	}

	.icon-box:hover, .icon-box:focus {
		cursor: pointer;
		opacity: 0.8;
		transform: scale(1.2);
		transition: transform 0.2s, opacity 0.2s;
	}

	.icon-box {
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
