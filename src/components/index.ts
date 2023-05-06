import type { App } from 'vue';
import WeekCalender from './weekCalender';

export default {
    install(app: App) {
        app.use(WeekCalender)
    }
}

export * from './weekCalender'