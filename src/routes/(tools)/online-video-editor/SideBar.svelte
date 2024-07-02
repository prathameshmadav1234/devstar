<script>
	let items = [
	  { icon: 'plus-icon.png', label: 'Media', action: 'media' },
	  { icon: 'canvas-icon.png', label: 'Canvas', action: 'canvas' },
	  { icon: 'text-icon.png', label: 'Text', action: 'text' },
	  { icon: 'audio-icon.png', label: 'Audio', action: 'audio' },
	  { icon: 'video-icon.png', label: 'Videos', action: 'videos' },
	  { icon: 'images-icon.png', label: 'Images', action: 'images' },
	  { icon: 'elements-icon.png', label: 'Elements', action: 'elements' },
	  { icon: 'record-icon.png', label: 'Record', action: 'record' },
	  { icon: 'tts-icon.png', label: 'TTS', action: 'tts' }
	];
  
	let currentView = 'media';
  
	function handleClick(action) {
	  currentView = action;
	}
  </script>
  
  <style>
	.container {
	  display: flex;
	  height: 100vh; /* Use full height of the viewport */
	}
  
	.sidebar {
	  width: 60px;
	  background-color: #1e1e1e;
	  color: #fff;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 20px;
	}
  
	.sidebar .icon {
	  width: 40px;
	  height: 40px;
	  margin: 10px 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: #333;
	  border-radius: 5px;
	  cursor: pointer;
	}
  
	.sidebar .icon img {
	  width: 20px;
	  height: 20px;
	}
  
	.sidebar .icon-label {
	  margin-top: 5px;
	  font-size: 12px;
	  text-align: center;
	}
  
	.main-content {
	  flex-grow: 1; /* Take up remaining space */
	  padding: 20px;
	  background-color: #282828; /* Example background color for main content */
	  color: white; /* Ensure text is visible */
	  overflow-y: auto; /* Make content scrollable if it overflows */
	  display: flex;
	  flex-direction: column; /* Use column layout for content sections */
	  gap: 20px; /* Space between content sections */
	}
  
	.content-section {
	  flex: 1; /* Make each content section take equal space */
	  background-color: #3a3a3a; /* Different background for content sections */
	  padding: 10px;
	  border-radius: 5px;
	}
  </style>
  
  <div class="container">
	<div class="sidebar">
	  {#each items as item}
		<div class="icon" on:click={() => handleClick(item.action)}>
		  <img src={item.icon} alt={item.label} />
		</div>
		<div class="icon-label">{item.label}</div>
	  {/each}
	</div>
  
	<div class="main-content">
	  {#if currentView === 'media'}
		<div class="content-section">Media Content</div>
	  {:else if currentView === 'canvas'}
		<div class="content-section">Canvas Content</div>
	  {:else if currentView === 'text'}
		<div class="content-section">Text Content</div>
	  {:else if currentView === 'audio'}
		<div class="content-section">Audio Content</div>
	  {:else if currentView === 'videos'}
		<div class="content-section">Videos Content</div>
	  {:else if currentView === 'images'}
		<div class="content-section">Images Content</div>
	  {:else if currentView === 'elements'}
		<div class="content-section">Elements Content</div>
	  {:else if currentView === 'record'}
		<div class="content-section">Record Content</div>
	  {:else if currentView === 'tts'}
		<div class="content-section">TTS Content</div>
	  {/if}
	</div>
  </div>
  