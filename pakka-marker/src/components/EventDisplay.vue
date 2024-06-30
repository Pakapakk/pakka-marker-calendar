<script setup>
    const props = defineProps(['hue'])
</script>

<template>
    <div class="eventDisplay" :style="style">
        <div class="time">
            <span class="startTime">00:00</span>-<span class="finishTime">00:00</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EventDisplay',
        methods: {
        },
        data() {
            return {
            }
        },
        props: [
            'hue'
        ],
        computed: {
            style() {
                return {
                    '--eventDisplayHueValue': `${this.hue}`
                }
            }
        }
    }
</script>

<style>
    .eventDisplay {
        --eventDisplayBorderRadius: 10px;
        min-width: 400px;
        height: 200px;
        width: 50vw;
        background: hsl(var(--eventDisplayHueValue), 50%, 92%);
        border-radius: var(--eventDisplayBorderRadius);
    }
    
    .eventDisplay::before {
        content: '';
        background: hsl(var(--eventDisplayHueValue), 100%, 40%);
        width: 5px;
        height: 200px;
        display: block;
        border-radius: var(--eventDisplayBorderRadius) 0 0 var(--eventDisplayBorderRadius);
        position: absolute;
    }
</style>