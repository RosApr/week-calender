<template>
    <div @mousedown="handleMousedown($props.id)" @mouseover="(e:MouseEvent) => handleMouseover(e, $props.id)"
        @mouseout="handleMouseout" @mouseup="handleMouseup($props.id)" @click="handleClick($props.id)"
        :class="['time-grid', { active: isActive }]"></div>
</template>
<script lang="ts">
import { computed, defineComponent, } from 'vue';

// const props = defineProps<{ selected: number[]; id: number }>()
// const emits = defineEmits<{
//     (e: 'mouseOver', id: number, tooltip: { left: string; top: string }): void
//     (e: 'mouseDown', id: number): void
//     (e: 'mouseOut'): void
//     (e: 'mouseUp', id: number): void
//     (e: 'click', id: number): void
// }>()


export default defineComponent({
    name: 'WeekCalenderGrid',
    props: {
        id: {
            type: Number,
            required: true,
        },
        selected: {
            type: Array<Number>,
            default: []
        },
    },
    emits: ['mouseOver', 'mouseDown', 'mouseOut', 'mouseUp', 'click'],
    setup(props, { emit }) {

        const isActive = computed(() => props.selected.includes(props.id))
        function handleMouseover(e: MouseEvent, id: number) {
            const dom = (e.target as unknown as HTMLElement).getBoundingClientRect()
            const position = {
                left: dom.left - 75 + 6 + 'px', // 6 is half of time grid width & 75 is half of width of tooltip
                top: dom.top - window.screenTop - 35 - 5 + 'px', // 35 is time grid height  8 is arrow height
            }
            emit('mouseOver', id, position)
        }
        function handleMouseout() {
            emit('mouseOut')
        }
        function handleMousedown(id: number) {
            emit('mouseDown', id)
        }
        function handleMouseup(id: number) {
            emit('mouseUp', id)
        }
        function handleClick(id: number) {
            emit('click', id)
        }
        return {
            isActive,
            handleMouseout,
            handleMouseover,
            handleMousedown,
            handleMouseup,
            handleClick,
        }
    }
})

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
  