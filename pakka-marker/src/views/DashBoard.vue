<template>
	<div class="calendar-wrapper">
		<div class="calendar-container">
			<div class="space-y-2">
				<VCalendar class="text-2xl" expanded borderless color="green" :attributes="attrs" />
			</div>
		</div>
		<div class="events-container">
			<h2 class="text-xl">Today's Events</h2>
			<div v-if="filterEvents.length === 0">
				<p>No events for today.</p>
			</div>
			<div v-else>
				<div v-for="event in filterEvents" :key="event.id" class="event-card">
					<h3>{{ event.EventName }}</h3>
					<p>{{ event.Time }}</p>
					<p>{{ event.Location }}</p>
					<p>{{ event.Description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
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
.calendar-wrapper {
	padding-top: 35px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 98vw;
	height: 100vh;
}

.calendar-container {
	width: 600px;
	height: 600px;
	justify-content: center;
	align-items: center;
}

.events-container {
	width: 600px;
	margin-top: 20px;
}

.event-card {
	border: 1px solid #ccc;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 10px;
	/* Rounded edges */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	/* Shadow */
}

.event-card h3 {
	margin: 0;
	font-size: 1.25em;
}

.event-card p {
	margin: 5px 0;
}
</style>