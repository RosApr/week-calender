import { App, Plugin } from 'vue';
import WeekCalender from './weekCalender.vue';

export default {
    install(Vue: App) {
        Vue.component(WeekCalender.name, WeekCalender)
    }
} as Plugin

export {
    WeekCalender
}