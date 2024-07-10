<script>
	import { trim,undo,redo,up,down,duplicate,deleted,plus,minus,expand, videoFilePath } from "../../Imports";
	import { onMount } from 'svelte';
  
	let currentTime = "00:00:00";
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
	  segments = Array.from({ length: segmentCount }, (_, i) => formatTime(i * frameInterval));
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
		  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
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
		  case 'trim':
			// Handle trim undo logic
			segments.push("00:00:00"); // Example logic, adjust as needed
			break;
		  case 'duplicate':
			// Handle duplicate undo logic
			segments.pop();
			break;
		  case 'up':
			// Handle move up undo logic
			handleDown();
			break;
		  case 'down':
			// Handle move down undo logic
			handleUp();
			break;
		  case 'delete':
			// Handle delete undo logic
			segments.push("00:00:00"); // Example logic, adjust as needed
			break;
		  case 'zoom in':
			// Handle zoom in undo logic
			handleMinus();
			break;
		  case 'zoom out':
			// Handle zoom out undo logic
			handlePlus();
			break;
		  case 'expand':
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
		  case 'trim':
			handleTrim();
			break;
		  case 'duplicate':
			handleDuplicate();
			break;
		  case 'up':
			handleUp();
			break;
		  case 'down':
			handleDown();
			break;
		  case 'delete':
			handleDelete();
			break;
		  case 'zoom in':
			handlePlus();
			break;
		  case 'zoom out':
			handleMinus();
			break;
		  case 'expand':
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

<div class="container">
	<div class="toolbox">
		<div class="tools">
			<button on:click={handleUndo}><img class="tool-icon" src={undo} alt="undo"  />
			</button>
			<button on:click={handleRedo}><img class="tool-icon" src={redo} alt="redo"  /> </button>
			<button on:click={handleTrim}><img class="tool-icon" src={trim} alt="trim"  /> </button>
			<button on:click={handleDuplicate}><img class="tool-icon" src={duplicate} alt="duplicate"  /></button>
			<button on:click={handleUp}><img class="tool-icon" src={up} alt="up"  /></button>
			<button on:click={handleDown}><img class="tool-icon" src={down} alt="down"  /> </button>
			<button on:click={handleDelete}><img class="tool-icon" src={deleted} alt="delete"  /> </button>
			
		</div>

		<div class="time">{currentTime} / {totalTime}</div>

		<div class="sidetools">
			
			
			<button on:click={handlePlus}><img class="img" src={plus} alt="plus"  /></button>		
			<button on:click={handleMinus}><img class="img" src={minus} alt="minus"  /></button>		
			<button on:click={handleExpand}><img class="img" src={expand} alt="expand"  /></button>
			
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

<style>
	.container {
		background-color: #1d1920;
		display: flex;
		flex-direction: column;
		padding: 16px 0 16px 24px;
		border-top: 1px solid rgb(196, 196, 193);
	}

	@media (max-width: 991px) {
		.container {
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
		font-family: 'Inter';
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
