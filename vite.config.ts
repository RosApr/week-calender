import { defineConfig } from 'vite';
import typescript2 from 'rollup-plugin-typescript2';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        {
            ...vue(),
        },
        {
            ...typescript2({
                check: false,
                tsconfig: './tsconfig.json',
            }),
            apply: 'build'
        }
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler',
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'main.js'),
            name: 'WeekCalender',
            fileName: 'week-calender',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    }
})