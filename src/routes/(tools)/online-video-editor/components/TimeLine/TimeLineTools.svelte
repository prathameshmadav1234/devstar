<script>
	import trim from "../../assets/trim.svg";
	import undo from "../../assets/undo.svg";
	import redo from "../../assets/redo.svg";
	import up from "../../assets/up.svg";
	import down from "../../assets/down.svg";
	import duplicate from "../../assets/duplicate.svg";
	import deleted from "../../assets/delete.svg";
</script>

<div class="div-33">
	<img src={undo} alt="undo" />

	<img src={redo} alt="redo" />

	<img src={trim} alt="trim" />

	<img src={duplicate} alt="duplicate" />

	<img src={up} alt="up" />

	<img src={down} alt="down" />

	<img src={deleted} alt="delete" />
</div>

<style>
	.div-33 {
		display: flex;
		padding-right: 80px;
		gap: 20px;
	}

	@media (max-width: 991px) {
		.div-33 {
			flex-wrap: wrap;
		}
	}
</style>
