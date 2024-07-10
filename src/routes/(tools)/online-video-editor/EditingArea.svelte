<script>
	// Importing necessary assets and components
	import { play, backward, forward, zoom, videoFilePath } from "./Imports";
	  
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
  </script>
  
  <div class="container">
	<div class="header">
	  <div class="title">{projectTitle}</div>
	  <div class="export-container" on:click={handleExport}>
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
	  <div class="progress-bar" style="width: {currentTime / duration * 100}%;"></div>
	</div>
  
	<div class="footer">
	  <div class="footer-icons">
		<!-- Button to rewind video by 15 seconds -->
		<button class="rewind" on:click={rewindVideo} >
		  <img class="footer-icon" src={backward} alt="Backward Icon" />
		</button>
		<!-- Button to toggle play/pause of the video -->
		<button class="play" on:click={togglePlay}>
		  <img class="footer-icon" src={play} alt="Play Icon" />
		</button>
		<!-- Button to forward video by 15 seconds -->
		<button class="forward" on:click={forwardVideo}>
		  <img class="footer-icon" src={forward} alt="Forward Icon" />
		</button>
	  </div>
	  <!-- Button for zoom functionality -->
	  <button>
		<img class="footer-icon" src={zoom} alt="Zoom Icon" />
	  </button>
	</div>
  </div>
  
  <style>
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
  </style>
  