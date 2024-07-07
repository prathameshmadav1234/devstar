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

    let selectedIcon = null;

    function showOverlay(icon) {
        selectedIcon = icon;
    }

    function closeOverlay() {
        selectedIcon = null;
    }
</script>

<div class="sidebar">
    <img class="img logo" src={logo} alt="Logo" />

    {#each icons as icon}
        <div class="icon-box" tabindex="0" aria-label={icon.label} on:click={() => showOverlay(icon)}>
            <img class="img" src={icon.src} alt={icon.alt} />
            <div class="icon-box-text">{icon.label}</div>
        </div>
    {/each}
</div>

{#if selectedIcon}
    <div class="overlay">
        <div class="overlay-content">
            <button class="close-button" on:click={closeOverlay}>✖</button>
            {#if selectedIcon.label === "Text"}
                <h3>Text Elements</h3>
                <ul>
                    <li>Bold</li>
                    <li>Italic</li>
                    <li>Underline</li>
                    <li>Font Size</li>
                    <li>Font Color</li>
                </ul>
            {/if}
            {#if selectedIcon.label === "Audio"}
                <h3>Audio Samples</h3>
                <ul>
                    <li>Sample 1</li>
                    <li>Sample 2</li>
                    <li>Sample 3</li>
                </ul>
            {/if}
            {#if selectedIcon.label === "Media"}
                <h3>Media Elements</h3>
                <ul>
                    <li>Video 1</li>
                    <li>Video 2</li>
                    <li>Video 3</li>
                </ul>
            {/if}
            {#if selectedIcon.label === "Transition"}
                <h3>Transition Effects</h3>
                <ul>
                    <li>Fade</li>
                    <li>Slide</li>
                    <li>Zoom</li>
                </ul>
            {/if}
            {#if selectedIcon.label === "Layout"}
                <h3>Layout Options</h3>
                <ul>
                    <li>Grid</li>
                    <li>Flexbox</li>
                    <li>Spacing</li>
                </ul>
            {/if}
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

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
		margin-left: 80px;
        width: 100%;
        height: 100%;
        background: transparent;
	
        display: flex;
        align-items: center;
        /* justify-content: center; */
    }

    .overlay-content {
        background: #494856;
		
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        position: relative;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
    }

    .overlay-content h3 {
		color: white;
        margin-top: 0;
    }

    .overlay-content ul {
        list-style-type: none;
        padding: 0;
    }

    .overlay-content li {
        background-color: #5f4262;
		color: white;
        margin-bottom: 4px;
        padding: 8px;
        border: 1px solid #ccc;
    }
</style>
