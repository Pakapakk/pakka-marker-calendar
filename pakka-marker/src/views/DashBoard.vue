<template>
	<div class="dashboard-container">
		<div class="calendar-section">
			<div class="calendar-wrapper">
				<div class="calendar-container">
					<div class="space-y-2">
						<VDatePicker class="text-2xl" v-model.range="range" expanded borderless color="green" />
					</div>
				</div>
				<div class="add-button">
					<router-link to="/addEvent">
						<button class="btn btn-warning" style="margin-left: 10px;">Add</button>
					</router-link>
				</div>
			</div>
		</div>
		<div class="events-section">
			<h2 class="text-xl">Today's Events</h2>
			<div v-if="filterEvents.length === 0">
				<p>No events for today.</p>
			</div>
			<div v-else>
				<div v-for="event in filterEvents" :key="event.id" class="event-card">
					<h3>{{ event.EventName }}</h3>
					<p>{{ formatDate(event.StartTime) }}</p>
					<p>{{ event.City }}, {{ event.Country }}</p>
					<button class="btn btn-primary" @click="openMoreInfo(event._id)">More</button>
				</div>
			</div>
		</div>

		<!-- Modal for More Info -->
		<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">{{ Data.EventDetail.EventName }}</h5>
						<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<!-- <p><strong>ID:</strong> {{ Data.EventDetail._id }}</p> -->
						<p><strong>Start Time:</strong> {{ formatDate(Data.EventDetail.StartTime) }}</p>
						<p><strong>End Time:</strong> {{ formatDate(Data.EventDetail.EndTime) }}</p>
						<p><strong>City:</strong> {{ Data.EventDetail.City }}</p>
						<p><strong>Country:</strong> {{ Data.EventDetail.Country }}</p>
						<p><strong>Description:</strong> {{ Data.EventDetail.Description }}</p>
					</div>
					<div class="modal-footer">
						<router-link :to="{ path: 'editEvent', name: 'editEvent', params: { id: Data.EventId } }">
							<button class="btn btn-primary btn-sm mr-2" data-bs-dismiss="modal">Edit</button>
						</router-link>
						<button type="button" class="btn btn-danger"
							@click="deleteEvent(Data.EventDetail._id)">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import { ref, watch, computed } from 'vue';
import axios from 'axios';

export default {
	name: 'DashBoard',
	setup() {
		const range = ref({
			start: new Date(),
			end: new Date()
		});

		const Data = ref({
			search: '',
			EventId: 'helloilovewebprosomuch69',
			Events: [],
			EventDetail: {}
		});



		const filterEvents = computed(() => {
			console.log(range.value.start)
			const selectedDay = new Date(range.value.start).toISOString().split('T')[0];
			// const today = new Date().toISOString().split('T')[0];
			console.log(selectedDay);
			// console.log(today);

			return Data.value.Events.filter((event) => {
				const eventDate = new Date(event.StartTime).toISOString().split('T')[0];
				return eventDate === selectedDay && event.EventName?.toLowerCase().includes(Data.value.search.toLowerCase());
			});
		});

		const openMoreInfo = (id) => {
			Data.value.EventId = id;
			console.log("event -> " + Data.value.EventId);
			$('#myModal').modal('show');

			axios.get('http://127.0.0.1:3427/events/readevent/' + Data.value.EventId)
				.then((response) => {
					console.log(response);
					Data.value.EventDetail = response.data;
				});
		};

		const formatDate = (date) => {
			const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
			return new Date(date).toLocaleString('en-GB', options).toUpperCase();
		};

		axios.get('http://127.0.0.1:3427/events/getevents')
			.then((response) => {
				console.log(response);
				Data.value.Events = response.data;
			});

		return {
			range,
			Data,
			filterEvents,
			openMoreInfo,
			formatDate
		};
	}
}
</script>


<style>
.dashboard-container {
	display: flex;
	width: 100vw;
	height: 100vh;
	padding: 50px;
}

.calendar-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.calendar-wrapper {
	width: 100%;
}

.calendar-container {
	width: 80%;
	justify-content: center;
	align-items: center;
}

.add-button {
	margin-top: 20px;
}

.events-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.events-container {
	width: 100%;
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
	width: 500px;
}

.event-card h3 {
	margin: 0;
	font-size: 1.25em;
}

.event-card p {
	margin: 5px 0;
}
</style>
