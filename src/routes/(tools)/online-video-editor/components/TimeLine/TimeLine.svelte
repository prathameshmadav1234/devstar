<script>
	import { onMount } from 'svelte';
	import trim from "../../assets/trim.svg";
	import undo from "../../assets/undo.svg";
	import redo from "../../assets/redo.svg";
	import up from "../../assets/up.svg";
	import down from "../../assets/down.svg";
	import duplicate from "../../assets/duplicate.svg";
	import deleted from "../../assets/delete.svg";
	import plus from "../../assets/plus.svg";
	import minus from "../../assets/minus.svg";
	import expand from "../../assets/arrow.svg";
	import videoFilePath from "../../assets/sample.mp4";
  
	let currentTime = "00:00:00";
	let totalTime = "00:15:22";
	let segments = [];
  
	let actionsHistory = [];
	let actionsRedo = [];
	let videoFrames = [];
  
	const frameInterval = 2; // Extract a frame every 2 seconds
  
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
  
		  // Create a new array each time you update videoFrames
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
			break;
		  case 'duplicate':
			// Handle duplicate undo logic
			break;
		  case 'up':
			// Handle move up undo logic
			break;
		  case 'down':
			// Handle move down undo logic
			break;
		  case 'delete':
			// Handle delete undo logic
			break;
		  case 'zoom in':
			// Handle zoom in undo logic
			break;
		  case 'zoom out':
			// Handle zoom out undo logic
			break;
		  case 'expand':
			// Handle expand undo logic
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
			// Handle trim redo logic
			break;
		  case 'duplicate':
			// Handle duplicate redo logic
			break;
		  case 'up':
			// Handle move up redo logic
			break;
		  case 'down':
			// Handle move down redo logic
			break;
		  case 'delete':
			// Handle delete redo logic
			break;
		  case 'zoom in':
			// Handle zoom in redo logic
			break;
		  case 'zoom out':
			// Handle zoom out redo logic
			break;
		  case 'expand':
			// Handle expand redo logic
			break;
		  default:
			break;
		}
	  }
	}
  
	function handleTrim() {
	  actionsHistory.push("trim");
	  console.log("Trim action");
	  // Trim logic goes here
	  // For example, trim the last segment
	  segments.pop();
	}
  
	function handleDuplicate() {
	  actionsHistory.push("duplicate");
	  console.log("Duplicate action");
	  // Duplicate logic goes here
	  // For example, duplicate the last segment
	  if (segments.length > 0) {
		segments.push(segments[segments.length - 1]);
	  }
	}
  
	function handleUp() {
	  actionsHistory.push("up");
	  console.log("Move up action");
	  // Move up logic goes here
	  // For example, swap the last two segments
	  if (segments.length > 1) {
		let temp = segments[segments.length - 1];
		segments[segments.length - 1] = segments[segments.length - 2];
		segments[segments.length - 2] = temp;
	  }
	}
  
	function handleDown() {
	  actionsHistory.push("down");
	  console.log("Move down action");
	  // Move down logic goes here
	  // For example, swap the first two segments
	  if (segments.length > 1) {
		let temp = segments[0];
		segments[0] = segments[1];
		segments[1] = temp;
	  }
	}
  
	function handleDelete() {
	  actionsHistory.push("delete");
	  console.log("Delete action");
	  // Delete logic goes here
	  // For example, remove the last segment
	  segments.pop();
	}
  
	function handlePlus() {
	  actionsHistory.push("zoom in");
	  console.log("Zoom in action");
	  // Zoom in logic goes here
	  // For example, double the segments
	  segments = segments.map((segment, index) => {
		const seconds = index * 1;
		return formatTime(seconds);
	  });
	}
  
	function handleMinus() {
	  actionsHistory.push("zoom out");
	  console.log("Zoom out action");
	  // Zoom out logic goes here
	  // For example, halve the segments
	  segments = segments.filter((_, index) => index % 2 === 0);
	}

	function handleExpand() {
		actionsHistory.push("expand");
		console.log("Expand action");
		// Expand logic goes here
		// For example, expand each segment time by 1 second
		segments = segments.map((segment, index) => {
			const seconds = index * 3;
			return formatTime(seconds);
		});
	}
</script>

<div class="container">
	<div class="toolbox">
		<div class="tools">
			<img src={undo} alt="undo" on:click={handleUndo} />
			<img src={redo} alt="redo" on:click={handleRedo} />
			<img src={trim} alt="trim" on:click={handleTrim} />
			<img src={duplicate} alt="duplicate" on:click={handleDuplicate} />
			<img src={up} alt="up" on:click={handleUp} />
			<img src={down} alt="down" on:click={handleDown} />
			<img src={deleted} alt="delete" on:click={handleDelete} />
		</div>

		<div class="time">{currentTime} / {totalTime}</div>

		<div class="sidetools">
			<img class="img" src={plus} alt="plus" on:click={handlePlus} />
			<img class="img" src={minus} alt="minus" on:click={handleMinus} />
			<img class="img" src={expand} alt="expand" on:click={handleExpand} />
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
		{#each videoFrames as frame}
			<img src={frame} alt="Video frame" />
		{/each}
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
		padding-right: 80px;
		gap: 20px;
	}

	@media (max-width: 991px) {
		.tools {
			flex-wrap: wrap;
		}
	}

	.time {
		color: var(--White-1, #fff);
		text-align: center;
		margin: auto 0;
		font:
			600 14px/143% Inter,
			sans-serif;
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

	.video-img {
		display: flex;
		justify-content: flex-end;
		align-self: start;
		padding-right: 11px;
		gap: 0px;
		margin: 16px 0 59px;
	}

	@media (max-width: 991px) {
		.video-img {
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
