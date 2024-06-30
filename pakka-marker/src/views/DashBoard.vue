<template>
	<div class="dashboardPage">
		<EventDisplay hue="0"/>
		<EventDisplay hue="45"/>
		<EventDisplay hue="90"/>
		<EventDisplay hue="135"/>
		<EventDisplay hue="180"/>
		<EventDisplay hue="225"/>
		<EventDisplay hue="270"/>
	</div>
</template>

<script setup>
import EventDisplay from '../components/EventDisplay.vue'
import { ref } from 'vue';
import axios from 'axios';

const attrs = ref([
	{
		highlight: true,
		dates: new Date(),
	},
]);
</script>

<script>
export default {
	name: 'DashBoard',
	data() {
		return {
			search: '',
			EventId: '',
			Events: []
		}
	},
	mounted() {
		axios.get('http://127.0.0.1:3427/events/getevents')
			.then((response) => {
				console.log(response);
				this.Events = response.data;
			});
	},
	computed: {
		filterEvents() {
			const today = new Date().toISOString().split('T')[0];
			console.log(today);

			return this.Events.filter((event) => {
				// Ensure EventDate is in ISO format YYYY-MM-DD
				const eventDate = new Date(event.Date).toISOString().split('T')[0];
				return eventDate === today && event.EventName.toLowerCase().includes(this.search.toLowerCase());
			});
		}

	}
}
</script>

<style>
	.dashboardPage {
		padding: 10px;
	}
</style>