<script>
	import FileMenu from "./FileMenu.svelte";

	import EditingArea from "./EditingArea.svelte";

	import TimeLine from "./components/TimeLine/TimeLine.svelte";


</script>

<div class="div-13">
	<div class="div-14">
		<div class="div-15">
			<div class="column">
				<FileMenu></FileMenu>
			</div>
			<div class="column-2">
				<EditingArea></EditingArea>
			</div>
		</div>
	</div>

	<TimeLine></TimeLine>
</div>

<style>
	.div-13 {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-basis: 0;
		width: fit-content;
		background: #323232;
		
	}
	.div-14 {
		height: 50vh;
	}
	@media (max-width: 991px) {
		.div-13 {
			max-width: 100%;
		}
	}

	@media (max-width: 991px) {
		.div-14 {
			max-width: 100%;
		}
	}

	.div-15 {
		gap: 20px;
		display: flex;
	}

	@media (max-width: 991px) {
		.div-15 {
			flex-direction: column;
			align-items: stretch;
			gap: 0px;
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		line-height: normal;
		/* width: 25%; */
		margin-left: 0px;
		height: 75vh;
	}

	@media (max-width: 991px) {
		.column {
			width: 100%;
		}
	}

	.column-2 {
		margin-left: -20px;
		display: flex;
		flex-direction: column;
		line-height: normal;
		width: 100%;
		/* margin-left: 20px; */
		height: 75vh;
		border-left: 1px solid rgb(196, 196, 193);
	}

	@media (max-width: 991px) {
		.column-2 {
			width: 100%;
		}
	}
</style>
