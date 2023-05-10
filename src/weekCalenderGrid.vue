<template>
    <div @mousedown="handleMousedown($props.id)" @mouseover="(e:MouseEvent) => handleMouseover(e, $props.id)"
        @mouseout="handleMouseout" @mouseup="handleMouseup($props.id)" @click="handleClick($props.id)"
        :class="['time-grid', { active: isActive }]"></div>
</template>
<script lang="ts">
export default {
    name: 'WeekCalenderGrid',
    inheritAttrs: false,
    customOptions: {}
}
</script>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ selected: number[]; id: number }>()
const emits = defineEmits<{
    (e: 'mouseOver', id: number, tooltip: { left: string; top: string }): void
    (e: 'mouseDown', id: number): void
    (e: 'mouseOut'): void
    (e: 'mouseUp', id: number): void
    (e: 'click', id: number): void
}>()
const isActive = computed(() => props.selected.includes(props.id))
function handleMouseover(e: MouseEvent, id: number) {
    const dom = (e.target as unknown as HTMLElement).getBoundingClientRect()
    const position = {
        left: dom.left - 160 / 2 + 6 + 'px', // 6 is half of time grid width & 80 is half of width of tooltip
        top: dom.top - window.screenTop - 35 + 'px', // 35 is time grid height  14 is arrow height
    }
    emits('mouseOver', id, position)
}
function handleMouseout() {
    emits('mouseOut')
}
function handleMousedown(id: number) {
    emits('mouseDown', id)
}
function handleMouseup(id: number) {
    emits('mouseUp', id)
}
function handleClick(id: number) {
    emits('click', id)
}
</script>
<style lang="scss" scoped>
.time-grid {
    user-select: none;
    cursor: pointer;
    float: left;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    width: 13px;
    height: 35px;

    &.active {
        background-color: #6997f3 !important;
    }
}
</style>
  