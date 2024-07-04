<script>
	import Img from "../../Img.svelte";
	import plus from "../../assets/plus.svg";
	import minus from "../../assets/minus.svg";
	import expand from "../../assets/arrow.svg";
</script>

<div class="div-35">
	<img class="img" src={plus} alt="plus" />
	<img class="img" src={minus} alt="minus" />
	<img class="img" src={expand} alt="expand" />
</div>

<style>
	.div-35 {
		justify-content: end;
		display: flex;
		padding-left: 80px;
		gap: 20px;
	}

	@media (max-width: 991px) {
		.div-35 {
			flex-wrap: wrap;
		}
	}
</style>
