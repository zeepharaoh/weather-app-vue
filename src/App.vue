<template>
	<div class="main">
		<Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" :cities="cities" />
		<navigation
			v-on:add-city="toggleModal"
			v-on:edit-city="toggleEdit"
			:addCityActive="addCityActive"
			:isDay="isDay"
			:isNight="isNight"
		/>
		<router-view
			:isDay="isDay"
			:isNight="isNight"
			v-bind:cities="cities"
			v-bind:edit="edit"
			:APIkey="APIkey"
			v-on:is-day="dayTime"
			v-on:is-night="nightTime"
			v-on:resetDays="resetDays"
		/>
	</div>
</template>
<script>
import axios from 'axios';
import db from './firebase/firebase';
import Navigation from './components/Navigation.vue';
import Modal from './components/Modal.vue';
export default {
	components: { Navigation, Modal },
	name: 'App',
	data() {
		return {
			isDay: null,
			isNight: null,
			APIkey: '6beec606a0979ac50335b4bd01345d82',
			cities: [],
			modalOpen: null,
			edit: null,
			addCityActive: null,
		};
	},
	created() {
		this.getCurrentWeather();
		this.checkRoute();
	},
	methods: {
		getCurrentWeather() {
			let firebaseDB = db.collection('cities');
			firebaseDB.onSnapshot(snap =>
				snap.docChanges().forEach(async doc => {
					if (doc.type === 'added' && !doc.doc.Nd) {
						try {
							const response = await axios.get(
								`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&appid=${
									this.APIkey
								}`
							);
							const data = response.data;
							firebaseDB
								.doc(doc.doc.id)
								.update({
									currentWeather: data,
								})
								.then(() => {
									this.cities.push(doc.doc.data());
								});
						} catch (err) {
							console.log(err);
						}
					} else if (doc.type === 'added' && doc.doc.Nd) {
						this.cities.push(doc.doc.data());
					} else if (doc.type === 'removed') {
						this.cities = this.cities.filter(city => city.city !== doc.doc.data().city);
					}
				})
			);
		},
		toggleModal() {
			this.modalOpen = !this.modalOpen;
		},
		toggleEdit() {
			this.edit = !this.edit;
		},
		checkRoute() {
			if (this.$route.name === 'AddCity') {
				this.addCityActive = true;
			} else {
				this.addCityActive = false;
			}
		},
		dayTime() {
			this.isDay = !this.isDay;
		},
		nightTime() {
			this.isNight = !this.isNight;
		},
		resetDays() {
			this.isDay = false;
			this.isNight = false;
		},
	},
	watch: {
		$route() {
			this.checkRoute();
		},
	},
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
}
.main {
	max-width: 1024px;
	margin: 0 auto;
	.container {
		padding: 0 20px;
	}
}
.day {
	transition: 500ms ease all;
	background: rgb(129, 168, 250);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.night {
	transition: 500ms ease all;
	background: rgb(27, 52, 107);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.loading {
	@keyframes spin {
		to {
			transform: rotateZ(360deg);
		}
	}
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	span {
		display: block;
		width: 60px;
		height: 60px;
		margin: 0 auto;
		border: 2px solid transparent;
		border-top-color: #142a5f;
		border-radius: 50%;
		animation: spin ease 1000ms infinite;
	}
}
</style>
