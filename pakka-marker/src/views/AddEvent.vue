<!-- TODO : Add Event -->
<template>
	<div class="dashboard-container">
		<div class="calendar-section">
			<div class="calendar-wrapper">
				<div class="calendar-container">
					<div class="space-y-2">
						<VDatePicker class="text-2xl" expanded borderless color="blue" :attributes="attrs" />
					</div>
				</div>
				<div class="add-button">
					<router-link to="/addEvent">
						<button class="btn btn-warning" style="margin-left: 10px;">Add</button>
					</router-link>
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
        color: 'green'
	},
]);
</script>

<script>
export default {
	name: 'AddEvent',
    data(){
        return {
            Event :  {
                StartTime: '',
                EndTime: '',
                EventName: '',
                City: '',
                Country: '',
                Description: '',
            }
        }
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
