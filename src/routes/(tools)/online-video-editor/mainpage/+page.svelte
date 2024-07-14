<script>
    import {
        media,
        text,
        audio,
        transition,
        layout,
        logo,
        play,
        backward,
        forward,
        zoom,
        videoFilePath,
        trim,
        undo,
        redo,
        up,
        down,
        duplicate,
        deleted,
        plus,
        minus,
        expand,
    } from "../Imports";

    const icons = [
        { src: media, alt: "media", label: "Media" },
        { src: text, alt: "text", label: "Text" },
        { src: audio, alt: "audio", label: "Audio" },
        { src: transition, alt: "transition", label: "Transition" },
        { src: layout, alt: "layout", label: "Layout" },
    ];

    let selectedIcon = null;

    function showOverlay(icon) {
        selectedIcon = icon;
    }

    function closeOverlay() {
        selectedIcon = null;
    }

    // filemenu
    import { onMount } from "svelte";
    import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
    import { library, dom } from "@fortawesome/fontawesome-svg-core";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    library.add(faTrash, faPlus);
    dom.watch();

    let selectedCategory = "All";
    let importedMedia = [];
    let filteredMedia = [];

    function handleCategoryClick(category) {
        selectedCategory = category;
        filterMedia();
    }

    function handleFileImport(event) {
        const files = Array.from(event.target.files);
        importedMedia = [...importedMedia, ...files];
        filterMedia();
    }

    function filterMedia() {
        if (selectedCategory === "All") {
            filteredMedia = importedMedia;
        } else if (selectedCategory === "Videos") {
            filteredMedia = importedMedia.filter(
                (file) => getFileType(file) === "video" && isVideoFile(file),
            );
        } else if (selectedCategory === "Audio") {
            filteredMedia = importedMedia.filter(
                (file) => getFileType(file) === "audio" && isAudioFile(file),
            );
        } else if (selectedCategory === "Images") {
            filteredMedia = importedMedia.filter(
                (file) => getFileType(file) === "image" && isImageFile(file),
            );
        }
    }

    function isImageFile(file) {
        const imageExtensions = [".jpg", ".jpeg", ".png"];
        return imageExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
        );
    }

    function isVideoFile(file) {
        const videoExtensions = [".mp4"];
        return videoExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
        );
    }

    function isAudioFile(file) {
        const audioExtensions = [".mp3"];
        return audioExtensions.some((ext) =>
            file.name.toLowerCase().endsWith(ext),
        );
    }

    function getFileType(file) {
        if (file.type.startsWith("video/")) return "video";
        if (file.type.startsWith("audio/")) return "audio";
        if (file.type.startsWith("image/")) return "image";
        return "other";
    }

    function deleteMediaItem(index) {
        importedMedia = importedMedia.filter((_, i) => i !== index);
        filterMedia();
    }

    // editing area
    let projectTitle = "Untitled Project";
    let videoElement; // Reference to the video element
    let currentTime = 0;
    let duration = 0;

    // Function to handle export button click
    function handleExport() {
        console.log("Export clicked");
        // Implement export functionality here if needed
    }

    // Function to play or pause the video
    function togglePlay() {
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    }

    // Function to rewind the video by 5 seconds
    function rewindVideo() {
        videoElement.currentTime -= 5;
    }

    // Function to forward the video by 5 seconds
    function forwardVideo() {
        videoElement.currentTime += 5;
    }

    // Function to update current time and duration
    function updateTime() {
        currentTime = videoElement.currentTime;
        duration = videoElement.duration;
    }

    function exportOrSaveFile(file) {
        // Example: Download the file
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;
        downloadLink.click();
    }

    // timeline

    let TimeLinecurrentTime = "00:00:00";
    let totalTime = "00:15:22";
    let segments = [];

    let actionsHistory = [];
    let actionsRedo = [];
    let videoFrames = [];

    const frameInterval = 0.01; // Extract a frame every 2 seconds

    onMount(() => {
        const videoFile = document.createElement("video");
        videoFile.src = videoFilePath;

        videoFile.addEventListener("loadedmetadata", () => {
            totalTime = formatTime(videoFile.duration);
            initializeSegments(videoFile.duration);
            extractVideoFrames(videoFile);
        });
    });

    function initializeSegments(duration) {
        const segmentCount = Math.floor(duration / frameInterval);
        segments = Array.from({ length: segmentCount }, (_, i) =>
            formatTime(i * frameInterval),
        );
    }

    function formatTime(seconds) {
        const date = new Date(0);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }

    function extractVideoFrames(videoFile) {
        const videoElement = document.createElement("video");
        videoElement.src = videoFile.src;

        videoElement.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            videoElement.currentTime = 0;

            videoElement.addEventListener("seeked", function captureFrame() {
                if (videoElement.currentTime >= videoFile.duration) {
                    videoElement.removeEventListener("seeked", captureFrame);
                    return;
                }

                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(
                    videoElement,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );

                videoFrames = [...videoFrames, canvas.toDataURL()];

                videoElement.currentTime += frameInterval;
            });

            videoElement.currentTime = frameInterval;
        });
    }

    function handleUndo() {
        if (actionsHistory.length > 0) {
            const lastAction = actionsHistory.pop();
            actionsRedo.push(lastAction);
            console.log("Undo action:", lastAction);
            // Reverse the last action
            switch (lastAction) {
                case "trim":
                    // Handle trim undo logic
                    segments.push("00:00:00"); // Example logic, adjust as needed
                    break;
                case "duplicate":
                    // Handle duplicate undo logic
                    segments.pop();
                    break;
                case "up":
                    // Handle move up undo logic
                    handleDown();
                    break;
                case "down":
                    // Handle move down undo logic
                    handleUp();
                    break;
                case "delete":
                    // Handle delete undo logic
                    segments.push("00:00:00"); // Example logic, adjust as needed
                    break;
                case "zoom in":
                    // Handle zoom in undo logic
                    handleMinus();
                    break;
                case "zoom out":
                    // Handle zoom out undo logic
                    handlePlus();
                    break;
                case "expand":
                    // Handle expand undo logic
                    segments = segments.map((segment, index) => {
                        const seconds = index * 1;
                        return formatTime(seconds);
                    });
                    break;
                default:
                    break;
            }
        }
    }

    function handleRedo() {
        if (actionsRedo.length > 0) {
            const lastUndoneAction = actionsRedo.pop();
            actionsHistory.push(lastUndoneAction);
            console.log("Redo action:", lastUndoneAction);
            // Reapply the last undone action
            switch (lastUndoneAction) {
                case "trim":
                    handleTrim();
                    break;
                case "duplicate":
                    handleDuplicate();
                    break;
                case "up":
                    handleUp();
                    break;
                case "down":
                    handleDown();
                    break;
                case "delete":
                    handleDelete();
                    break;
                case "zoom in":
                    handlePlus();
                    break;
                case "zoom out":
                    handleMinus();
                    break;
                case "expand":
                    handleExpand();
                    break;
                default:
                    break;
            }
        }
    }

    function handleTrim() {
        actionsHistory.push("trim");
        console.log("Trim action");
        segments.pop();
    }

    function handleDuplicate() {
        actionsHistory.push("duplicate");
        console.log("Duplicate action");
        if (segments.length > 0) {
            segments.push(segments[segments.length - 1]);
        }
    }

    function handleUp() {
        actionsHistory.push("up");
        console.log("Move up action");
        if (segments.length > 1) {
            let temp = segments[segments.length - 1];
            segments[segments.length - 1] = segments[segments.length - 2];
            segments[segments.length - 2] = temp;
        }
    }

    function handleDown() {
        actionsHistory.push("down");
        console.log("Move down action");
        if (segments.length > 1) {
            let temp = segments[0];
            segments[0] = segments[1];
            segments[1] = temp;
        }
    }

    function handleDelete() {
        actionsHistory.push("delete");
        console.log("Delete action");
        segments.pop();
    }

    function handlePlus() {
        actionsHistory.push("zoom in");
        console.log("Zoom in action");
        segments = segments.map((segment, index) => {
            const seconds = index * 1;
            return formatTime(seconds);
        });
    }

    function handleMinus() {
        actionsHistory.push("zoom out");
        console.log("Zoom out action");
        segments = segments.filter((_, index) => index % 2 === 0);
    }

    function handleExpand() {
        actionsHistory.push("expand");
        console.log("Expand action");
        segments = segments.map((segment, index) => {
            const seconds = index * 3;
            return formatTime(seconds);
        });
    }
</script>

<div class="div">
    <!-- sidebar  -->
    <div class="sidebar">
        <img class="img logo" src={logo} alt="Logo" />

        {#each icons as icon}
            <div
                class="icon-box"
                tabindex="0"
                aria-label={icon.label}
                on:click={() => showOverlay(icon)}
            >
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

    <!-- main  -->
    <div class="main-container">
        <div class="header-container">
            <div class="content-container">
                <div class="file-menu-container">
                    <!-- <FileMenu></FileMenu> -->
                    <div class="div-16">
                        <div class="div-17">
                            <button
                                class="div-18 {selectedCategory === 'All'
                                    ? 'active'
                                    : ''}"
                                on:click={() => handleCategoryClick("All")}
                                >All</button
                            >
                            <button
                                class="div-19 {selectedCategory === 'Videos'
                                    ? 'active'
                                    : ''}"
                                on:click={() => handleCategoryClick("Videos")}
                                >Videos</button
                            >
                            <button
                                class="div-20 {selectedCategory === 'Audio'
                                    ? 'active'
                                    : ''}"
                                on:click={() => handleCategoryClick("Audio")}
                                >Audio</button
                            >
                            <button
                                class="div-21 {selectedCategory === 'Images'
                                    ? 'active'
                                    : ''}"
                                on:click={() => handleCategoryClick("Images")}
                                >Images</button
                            >
                        </div>
                        <label class="div-22" for="fileInput"
                            >Import Media</label
                        >
                        <input
                            id="fileInput"
                            type="file"
                            accept="video/*,audio/*,image/*"
                            multiple
                            on:change={handleFileImport}
                            style="display: none;"
                        />
                        <div class="media-grid">
                            {#each filteredMedia as file, index (file.name)}
                                <div class="media-item">
                                    {#if getFileType(file) === "image"}
                                        <img
                                            alt=""
                                            loading="lazy"
                                            src={URL.createObjectURL(file)}
                                            class="img-2"
                                        />
                                    {:else if getFileType(file) === "video"}
                                        <video
                                            controls
                                            src={URL.createObjectURL(file)}
                                            class="video-preview"
                                        ></video>
                                    {:else if getFileType(file) === "audio"}
                                        <audio
                                            controls
                                            src={URL.createObjectURL(file)}
                                            class="audio-preview"
                                        ></audio>
                                    {:else}
                                        <div class="unknown-preview">
                                            <p>Unsupported file type</p>
                                        </div>
                                    {/if}
                                    <div class="div-23">{file.name}</div>
                                    <div class="icon-container">
                                        <button
                                            class="icon-button"
                                            on:click={() =>
                                                deleteMediaItem(index)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button
                                            class="icon-button"
                                            on:click={() =>
                                                document
                                                    .getElementById("fileInput")
                                                    .click()}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="editing-area-container">
                    <div class="container">
                        <div class="header">
                            <div class="title">{projectTitle}</div>
                            <div
                                class="export-container"
                                on:click={handleExport}
                            >
                                <button class="export-text">Export</button>
                            </div>
                        </div>

                        <!-- Video element for displaying the main video -->

                        <video
                            class="video"
                            src={videoFilePath}
                            alt="Main Video Preview"
                            bind:this={videoElement}
                            on:timeupdate={updateTime}
                        ></video>

                        <!-- Progress bar to indicate video playback -->
                        <div class="video-progress">
                            <div
                                class="progress-bar"
                                style="width: {(currentTime / duration) *
                                    100}%;"
                            ></div>
                        </div>

                        <div class="footer">
                            <div class="footer-icons">
                                <!-- Button to rewind video by 15 seconds -->
                                <button class="rewind" on:click={rewindVideo}>
                                    <img
                                        class="footer-icon"
                                        src={backward}
                                        alt="Backward Icon"
                                    />
                                </button>
                                <!-- Button to toggle play/pause of the video -->
                                <button class="play" on:click={togglePlay}>
                                    <img
                                        class="footer-icon"
                                        src={play}
                                        alt="Play Icon"
                                    />
                                </button>
                                <!-- Button to forward video by 15 seconds -->
                                <button class="forward" on:click={forwardVideo}>
                                    <img
                                        class="footer-icon"
                                        src={forward}
                                        alt="Forward Icon"
                                    />
                                </button>
                            </div>
                            <!-- Button for zoom functionality -->
                            <button>
                                <img
                                    class="footer-icon"
                                    src={zoom}
                                    alt="Zoom Icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <TimeLine></TimeLine> -->
        <div class="timeline-container">
            <div class="toolbox">
                <div class="tools">
                    <button on:click={handleUndo}
                        ><img class="tool-icon" src={undo} alt="undo" />
                    </button>
                    <button on:click={handleRedo}
                        ><img class="tool-icon" src={redo} alt="redo" />
                    </button>
                    <button on:click={handleTrim}
                        ><img class="tool-icon" src={trim} alt="trim" />
                    </button>
                    <button on:click={handleDuplicate}
                        ><img
                            class="tool-icon"
                            src={duplicate}
                            alt="duplicate"
                        /></button
                    >
                    <button on:click={handleUp}
                        ><img class="tool-icon" src={up} alt="up" /></button
                    >
                    <button on:click={handleDown}
                        ><img class="tool-icon" src={down} alt="down" />
                    </button>
                    <button on:click={handleDelete}
                        ><img class="tool-icon" src={deleted} alt="delete" />
                    </button>
                </div>

                <div class="time">{TimeLinecurrentTime} / {totalTime}</div>

                <div class="sidetools">
                    <button on:click={handlePlus}
                        ><img class="img" src={plus} alt="plus" /></button
                    >
                    <button on:click={handleMinus}
                        ><img class="img" src={minus} alt="minus" /></button
                    >
                    <button on:click={handleExpand}
                        ><img class="img" src={expand} alt="expand" /></button
                    >
                </div>
            </div>

            <div class="timeline">
                {#each segments as segment}
                    <div class="segment">
                        <div class="divider"></div>
                        <div class="time-segment">{segment}</div>
                    </div>
                {/each}
            </div>

            <div class="video-frames">
                <div class="frames-scroll">
                    {#each videoFrames as frame}
                        <img src={frame} alt="Video frame" />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .div {
        margin-top: -112px;
        margin-left: -46px;
        height: 85%;
        width: 100%;
        background-color: #fff;
        display: flex;
        gap: 0px;
        overflow: hidden;
        position: fixed;
    }

    @media (max-width: 991px) {
        .div {
            flex-wrap: wrap;
        }
    }

    /* sidebarcss */
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

    .icon-box:hover,
    .icon-box:focus {
        cursor: pointer;
        opacity: 0.8;
        transform: scale(1.2);
        transition:
            transform 0.2s,
            opacity 0.2s;
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

    /* main css */

    .main-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-basis: 0;
        width: fit-content;
        background: #323232;
    }

    .header-container {
        height: 50vh;
    }

    @media (max-width: 991px) {
        .main-container {
            max-width: 100%;
        }
        .header-container {
            max-width: 100%;
        }
    }

    .content-container {
        gap: 20px;
        display: flex;
    }

    @media (max-width: 991px) {
        .content-container {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
        }
    }

    .file-menu-container {
        display: flex;
        flex-direction: column;
        line-height: normal;
        height: 75vh;
    }

    @media (max-width: 991px) {
        .file-menu-container {
            width: 100%;
        }
    }

    .editing-area-container {
        margin-left: -20px;
        display: flex;
        flex-direction: column;
        line-height: normal;
        width: 100%;
        height: 75vh;
        border-left: 1px solid rgb(196, 196, 193);
    }

    @media (max-width: 991px) {
        .editing-area-container {
            width: 100%;
        }
    }

    /* filemenucss */
    .div-16 {
        background-color: #413946;
        display: flex;
        width: 100%;
        flex-grow: 1;
        flex-direction: column;
        color: var(--White-1, #fff);
        font-weight: 60;
        margin: 0 auto;
        padding: 10px;
        max-height: 370px; /* Set a maximum height */
        overflow-y: auto; /* Enable vertical scrolling */
    }

    .div-17 {
        display: flex;
        gap: 16px;
        font-size: 14px;
        color: var(--Gray-1, #9ca3af);
        white-space: nowrap;
        line-height: 143%;
    }

    @media (max-width: 991px) {
        .div-17 {
            white-space: initial;
        }
    }

    .div-18,
    .div-19,
    .div-20,
    .div-21 {
        font-family: Inter, sans-serif;
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px 10px;
        border-radius: 4px;
        transition:
            background-color 0.3s,
            color 0.3s;
    }

    .div-18:hover,
    .div-19:hover,
    .div-20:hover,
    .div-21:hover {
        background-color: #2f2b34;
    }

    .active {
        background-color: #078060;
        color: white;
    }

    .div-22 {
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background-color: var(--Primary, #078060);
        margin-top: 16px;
        text-align: center;
        padding: 12px 16px;
        font:
            16px/150% Inter,
            sans-serif;
        cursor: pointer;
    }

    @media (max-width: 991px) {
        .div-22 {
            padding: 0 20px;
        }
    }

    .div-23 {
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 4px;
        font:
            400 10px/120% Inter,
            sans-serif;
    }

    @media (max-width: 991px) {
        .div-23 {
            white-space: initial;
        }
    }

    .media-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two columns layout */
        gap: 16px;
        margin-top: 16px;
    }

    .media-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .video-preview,
    .audio-preview,
    .img-2 {
        width: 100%;
        max-width: 200px; /* Set a fixed width for the previews */
        max-height: 150px; /* Set a fixed height for the previews */
        object-fit: cover; /* Ensure the media fits within the given dimensions */
        margin-top: 10px;
    }

    .unknown-preview {
        color: var(--Gray-1, #9ca3af);
        font-size: 14px;
        margin-top: 10px;
    }

    .icon-container {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

    .icon-button {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
    }

    .icon-button:hover {
        color: #ff0000;
    }

    .icon-button .fas {
        pointer-events: none;
    }

    .container {
        background-color: #1d1920;
        display: flex;
        flex-direction: column;
        height: 80%;
        width: 80%;
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

    .video {
        height: 50%;
        width: 100%; /* Full width for the video element */
        margin: 16px 0;
        align-self: center;
    }

    .video-progress {
        width: 100%;
        height: 4px;
        background-color: #333;
        margin-top: 8px;
    }

    .progress-bar {
        height: 100%;
        background-color: #078060;
        width: 0%;
        transition: width 0.1s linear;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 518px;
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

        .video {
            margin: 16px 10px;
        }
    }

    .timeline-container {
        background-color: #1d1920;
        display: flex;
        flex-direction: column;
        padding: 16px 0 16px 24px;
        border-top: 1px solid rgb(196, 196, 193);
    }

    @media (max-width: 991px) {
        .timeline-container {
            max-width: 100%;
            padding-left: 20px;
        }
    }

    .toolbox {
        display: flex;
        justify-content: space-between;
        padding-right: 24px;
        gap: 10px;
    }

    @media (max-width: 991px) {
        .toolbox {
            flex-wrap: wrap;
            padding-right: 20px;
        }
    }

    .tools {
        display: flex;
        gap: 20px;
    }

    .time {
        font-family: "Inter";
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 143%; /* 20px */
        letter-spacing: 0.009em;
        text-align: right;
        color: #9ca3af;
        margin: 0;
        margin-top: auto;
        margin-bottom: auto;
        padding-right: 20px;
        overflow: hidden;
        max-width: 200px;
    }

    @media (max-width: 991px) {
        .time {
            max-width: 100%;
        }
    }

    .sidetools {
        display: flex;
        justify-content: end;
        padding-left: 80px;
        gap: 20px;
    }

    @media (max-width: 991px) {
        .sidetools {
            flex-wrap: wrap;
        }
    }

    .timeline {
        display: flex;
        margin-top: 16px;
        width: 100%;
        padding-right: 28px;
        gap: 20px;
        font-size: 10px;
        color: var(--Gray-1, #9ca3af);
        font-weight: 400;
        white-space: nowrap;
        line-height: 120%;
        justify-content: space-between;
    }

    @media (max-width: 991px) {
        .timeline {
            max-width: 100%;
            flex-wrap: wrap;
            padding-right: 20px;
            white-space: initial;
        }
    }

    .segment {
        display: flex;
        gap: 3px;
    }

    @media (max-width: 991px) {
        .segment {
            white-space: initial;
        }
    }

    .divider {
        border-color: rgba(156, 163, 175, 1);
        border-style: solid;
        border-width: 1px;
        background-color: #9ca3af;
        width: 1px;
        height: 20px;
    }

    .time-segment {
        font-family: Inter, sans-serif;
        margin: auto 0;
    }

    .video-frames {
        display: flex;
        justify-content: flex-end;
        align-self: start;
        padding-right: 11px;
        gap: 0px;
        margin: 16px 0 59px;
    }

    .frames-scroll {
        display: flex;
        overflow-x: scroll;
        gap: 10px;
        padding-bottom: 10px;
    }

    @media (max-width: 991px) {
        .video-frames {
            flex-wrap: wrap;
            margin-bottom: 40px;
        }
    }
    img:hover {
        cursor: pointer;
        opacity: 0.8;
        transform: scale(1.1);
        transition:
            transform 0.2s,
            opacity 0.2s;
    }
</style>
