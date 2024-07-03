<template>
	<div class="dashboard-container">
		<div class="calendar-section">
			<div class="calendar-wrapper">
				<div class="calendar-container">
					<div class="space-y-2">
						<!-- Use VDatePicker to select a date -->
						<VDatePicker expanded v-model="range" mode="date" rules="auto" is24hr
							color="green"/>
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
			<h2 class="text-xl">Events on Selected Date</h2>
			<div v-if="filterEvents.length === 0">
				<p>No events for the selected date.</p>
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
		<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">{{ Data.EventDetail.EventName }}</h5>
						<button type="button" class="btn close-btn" data-bs-dismiss="modal" aria-label="Close" style="width : 2rem;">
							<span aria-hidden="true" style="font-size: 1.5rem;">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p><strong>Start Time:</strong> {{ formatDate(Data.EventDetail.StartTime) }}</p>
						<p><strong>End Time:</strong> {{ formatDate(Data.EventDetail.EndTime) }}</p>
						<p><strong>City:</strong> {{ Data.EventDetail.City }}</p>
						<p><strong>Country:</strong> {{ Data.EventDetail.Country }}</p>
						<p><strong>Description:</strong> {{ Data.EventDetail.Description }}</p>
						<p><strong>Weather:</strong></p>
						<img v-bind:src=getWeatherImg alt="weatherImg" width = 90px height =90px style="margin-left: 3rem">
						<p><strong>Temperature: </strong>{{ getLocationTemp }} &deg;C</p>
					</div>
					<div class="modal-footer">
						<router-link :to="{ path: 'editEvent', name: 'editEvent', params: { id: Data.EventId } }">
							<button class="btn btn-primary btn-sm mr-2" data-bs-dismiss="modal">Edit</button>
						</router-link>
						<button type="button" class="btn btn-danger"
							@click="DELETE(Data.EventDetail._id)">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
const weatherAPIkey = "5d9d32200a84199ec1c632c65e028ac4";

export default {
	name: 'DashBoard',
	data() {
		return {
			range: new Date(),
			Data: {
				search: '',
				EventId: 'helloilovewebprosomuch69',
				Events: [],
				EventDetail: {},
				tmpID: '',
				locationWeather: '',
				weatherImg:'../assets/images/404.png',
				locationTemp: '',
			},
			attrs: {
                dot: 'true',
				dates: [
					new Date(2024, 6, 15)
				]
            }
		};
	},
	computed: {
		filterEvents() {
			const selectedDay = this.formatLocalDateString(new Date(this.range));
			return this.Data.Events.filter((event) => {
				const eventDate = this.formatLocalDateString(new Date(event.StartTime));
				return eventDate === selectedDay && event.EventName.toLowerCase().includes(this.Data.search.toLowerCase());
			});
		},
		getWeatherImg(){
			return this.Data.weatherImg;
		},
		getLocationTemp(){
			return this.Data.locationTemp;
		}
	},
	methods: {
		formatLocalDateString(date) {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}-${month}-${day}`;
		},
		async openMoreInfo(id) {
			this.Data.EventId = id;
			const weatherAPIkey = 'f649f878bddca1f1d3fec205bfbbae9f';
			$('#myModal').modal('show');
			
			axios.get(`http://127.0.0.1:3427/events/readevent/${this.Data.EventId}`)
			.then((response) => {
				
				this.Data.EventDetail = response.data;

				let eventLocation = this.Data.EventDetail.City;
				console.log(this.Data.EventDetail.City);
				fetch(`https://api.openweathermap.org/data/2.5/find?q=${this.Data.EventDetail.City}&type=accurate&units=metric&appid=${weatherAPIkey}`)
				.then((response => response.json()))
				.then(json =>{
				if(json.cod === '404'){
					console.log("Not-Found");
					this.weatherImg = '/images/404.png'
					this.Data.locationTemp = '-'
				}
				else{
					console.log(json)
					console.log(json.list[0].weather[0].main)
					switch (json.list[0].weather[0].main) {
						case 'Clear':
							this.Data.weatherImg = '/images/clear.png'
							break;
						case 'Rain':
							this.Data.weatherImg = '/images/rain.png'
							break;
						case 'Snow':
							this.Data.weatherImg = '/images/snow.png'
							break;
						case 'Clouds':
							console.log("here")
							this.Data.weatherImg = '/images/cloud.png'
							break;
						case 'Haze':
							this.Data.weatherImg = '/images/mist.png'
							break;
						default:
							this.Data.weatherImg = '/images/404.png'
							break;
					}
					if(json.list[0].main.temp)
						this.Data.locationTemp = json.list[0].main.temp
					else
					 this.Data.locationTemp = '-'
				}
			})
			});

			
			
		},
		formatDate(date) {
			const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
			return new Date(date).toLocaleString('en-GB', options).toUpperCase();
		},
		DELETE(id) {
			this.tmpID = id;
			var url = `http://127.0.0.1:3427/events/delete/${this.tmpID}`;
			axios.delete(url)
				.then(() => {
					console.log('deleted event ' + this.tmpID);
					this.Data.Events = this.Data.Events.filter(event => event._id !== this.tmpID);
					$('#myModal').modal('hide');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	},
	mounted() {
		axios.get('http://127.0.0.1:3427/events/getevents')
			.then((response) => {
				this.Data.Events = response.data;
			});
	}
};
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
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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