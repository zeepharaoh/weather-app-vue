<template>
	<div>
		<div v-if="cities.length === 0" class="no-cities">
			<p>No cities added, add a new one?</p>
			<button @click="addCity">Add City</button>
		</div>
		<div class="grid">
			<div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
				<City v-bind:city="city" v-bind:edit="edit" />
			</div>
		</div>
	</div>
</template>

<script>
import City from '../components/City';

export default {
	name: 'AddCity',
	props: ['cities', 'edit'],
	created() {},
	methods: {
		addCity() {
			this.$emit('add-city');
		},
	},
	components: {
		City,
	},
};
</script>
<style lang="scss" scoped>
.grid {
	display: grid;
	padding: 4.4rem 0 0 0;
	background: #0a192e;
	width: 100%;
	grid-auto-rows: 250px;
	@media screen and (min-width: 500px) {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
