<template>
    <div class="dashboard-container">
        <div class="calendar-section">
            <div class="calendar-wrapper">
                <div class="calendar-container">
                    <div class="space-y-2">
                        <VDatePicker expanded v-model.range="range" mode="date" rules="auto" is24hr :update-on-input="true"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="events-section">
            <h2 class="text-xl">Add Event</h2>
            <form @submit.prevent="addEvent">
                <div class="form-group">
                    <label for="eventName">Event Name</label>
                    <input type="text" class="form-control" id="eventName" v-model="Event.EventName" required />
                </div>
                <div class="form-group">
                    <label for="startTime">Start Time</label>
                    <input type="datetime-local" class="form-control" id="startTime" v-model="Event.StartTime"
                        required />
                </div>
                <div class="form-group">
                    <label for="endTime">End Time</label>
                    <input type="datetime-local" class="form-control" id="endTime" v-model="Event.EndTime" required />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input type="text" class="form-control" id="city" v-model="Event.City" required />
                </div>
                <div class="form-group">
                    <label for="country">Country</label>
                    <input type="text" class="form-control" id="country" v-model="Event.Country" required />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" v-model="Event.Description" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Event</button>
            </form>
            <!-- <button class="test" @click="test">test</button> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ref, watch } from 'vue';

export default {
    name: 'EditEvent',
    setup() {
        const range = ref({
            start: new Date(),
            end: new Date()
        });

        function formatDate(date) {
            const d = new Date(date);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const hh = String(d.getHours()).padStart(2, '0');
            const min = String(d.getMinutes()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        }

        const Event = ref({
            StartTime: '',
            EndTime: '',
            EventName: '',
            City: '',
            Country: '',
            Description: ''
        });

        watch(() => range.value, (newRange) => {
            Event.value.StartTime = formatDate(newRange.start);
            Event.value.EndTime = formatDate(newRange.end);
        }, { deep: true });

        // Watch for changes in Event and update range
        watch(() => Event.value.StartTime, (newStartTime) => {
            range.value.start = new Date(newStartTime);
        });

        watch(() => Event.value.EndTime, (newEndTime) => {
            range.value.end = new Date(newEndTime);
        });

        return {
            range,
            Event,
        };
    },
    methods: {
        addEvent() {
            axios.post('http://127.0.0.1:3427/events/addevent', this.Event)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
	mounted(){
		axios.get('http://127.0.0.1:3427/events/update/' + this.$route.params.id)
            .then((res) => {
                this.Event = res.data;
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
	}

}
</script>

<style>
.dashboard-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    padding: 20px;
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
    width: 100%;
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
}

.event-card h3 {
    margin: 0;
    font-size: 1.25em;
}

.event-card p {
    margin: 5px 0;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #66afe9;
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
}

button {
    width: 100%;
}
</style>
