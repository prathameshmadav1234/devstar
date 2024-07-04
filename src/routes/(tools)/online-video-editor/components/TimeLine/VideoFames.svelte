<script>
	import Img from "../../Img.svelte";
	import img from "../../assets/small.svg";
</script>

<div class="div-img">
	<img class="" src={img} alt="img">
	<img class="" src={img} alt="img">
	<img class="" src={img} alt="img">
	<img class="" src={img} alt="img">
	
	
</div>

<style>
	.div-img {
		justify-content: flex-end;
		align-self: start;
		display: flex;
		padding-right: 11px;
		gap: 0px;
		margin: 16px 0 59px;
	}

	@media (max-width: 991px) {
		.div-img {
			flex-wrap: wrap;
			margin-bottom: 40px;
		}
	}
</style>
