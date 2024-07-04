<script>
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
	import videoimg from "../../assets/small.svg";

	let currentTime = "00:00:00";
	let totalTime = "00:15:22";
	let segments = [
		"0",
		"0:02",
		"0:04",
		"0:06",
		"0:08",
		"0:10",
		"0:12",
		"0:14",
		"0:16",
		"0:18",
		"0:20",
		"0:22",
	];

	const handleUndo = () => {
		console.log("Undo action");
	};

	const handleRedo = () => {
		console.log("Redo action");
	};

	const handleTrim = () => {
		console.log("Trim action");
	};

	const handleDuplicate = () => {
		console.log("Duplicate action");
	};

	const handleUp = () => {
		console.log("Move up action");
	};

	const handleDown = () => {
		console.log("Move down action");
	};

	const handleDelete = () => {
		console.log("Delete action");
	};

	const handlePlus = () => {
		console.log("Zoom in action");
	};

	const handleMinus = () => {
		console.log("Zoom out action");
	};

	const handleExpand = () => {
		console.log("Expand action");
	};
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
			<img
				class="img"
				src={expand}
				alt="expand"
				on:click={handleExpand}
			/>
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

	<div class="video-img">
		<img src={videoimg} alt="img" />
		<img src={videoimg} alt="img" />
		<img src={videoimg} alt="img" />
		<img src={videoimg} alt="img" />
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
