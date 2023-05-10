<template>
    <div class="time-calender-container">
        <div class="time-calender">
            <div class="header-info">
                <div class="text-center info-grid week-label">
                    星期/时间
                </div>
                <div class="info-grid-container" style="width: 100%; background: #f2f4f5;">
                    <div class="text-center info-grid time-info">
                        00:00 - 12:00
                    </div>
                    <div class="text-center info-grid time-info">
                        12:00 - 24:00
                    </div>
                    <div class="time-label-container">
                        <div v-for="t in Time" :key="t" class="time-label">
                            {{ t }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="time-container">
                <div class="week-label-container">
                    <div v-for="w in Week" :key="w" class="text-center week-label info-grid">
                        {{ w }}
                    </div>
                </div>
                <div class="time-grid-container" @mouseleave="handleMouseup()">
                    <template v-if="disabled">
                        <WeekCalenderGrid v-for="(_, index) in Array.from({ length: 7 * 24 * 2 })" :id="index"
                            :key="index" :selected="currentSelected" />
                    </template>
                    <template v-else>
                        <WeekCalenderGrid v-for="(_, index) in Array.from({ length: 7 * 24 * 2 })" :id="index"
                            :key="index" :selected="currentSelected" @mouse-over="handleMouseover"
                            @mouse-out="handleMouseout" @mouse-down="handleMousedown" @mouse-up="handleMouseup" />
                    </template>
                    <div class="tooltip" :style="{ display: tooltip.show ? 'block' : 'none' }">
                        <div class="label">
                            {{ getFullWeekAndTime(tooltip.id) }}
                        </div>
                        <div class="arrow" />
                    </div>
                </div>
            </div>
        </div>
        <div class="tip-container">
            <div class="row center between">
                <div class="col">
                    <div class="row center" style="gap:4px;">
                        <div class="col">已选择时间段:</div>
                        <div class="col">
                            <span class="demo-time-grid active" />
                            选中
                        </div>
                        <div class="col">
                            <span class="demo-time-grid" />
                            未选中
                        </div>
                    </div>
                </div>
                <div class="col">
                    <button @click="handleReset()">
                        清除全部
                    </button>
                </div>
            </div>
            <template v-if="$props.showFormat">
                <div class="row center between" v-for="week in formattedMap.entries()" :key="week[0]">
                    <div class="col">{{ week[0] }}</div>
                    <div class="col" v-show="(week[1].list.length > 0)">
                        <span style="margin-right:4px;" v-for="item in week[1].list" :key="item">{{ item }}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'WeekCalender',
    inheritAttrs: false,
    customOptions: {}
}
</script>
<script lang="ts" setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import type { GridId } from './helper'
import {
    Week,
    Time,
    getFullWeekAndTime,
    getTimeGridPos,
    defaultPos,
    singleRowColCount,
    defaultValueBitMap,
    defaultValue,
    getPeriodTime,
} from './helper'
import WeekCalenderGrid from './weekCalenderGrid.vue'

const props = withDefaults(defineProps<{
    value: string,
    disabled?: boolean
    showFormat?: boolean
}>(), {
    value: '',
    disabled: false,
    showFormat: true
})
const emits = defineEmits<{
    (e: 'change', data: string): void
    (e: 'update:value', data: string): void
}>()
const disabled = computed(() => props.disabled ?? false)
const selected = computed(() => {
    const selected_: number[] = []
    const ar = props.value || ''
    ar.split('').forEach((val, index) => {
        if (val === '1') {
            selected_.push(index)
        }
    })
    return selected_
})
const isClickEvent = ref(false)
const isMouseDown = ref(false)
const selectedTmp = ref<GridId[]>([])
const isAdd = ref(false)
const startPos = ref(defaultPos)
const endPos = ref(defaultPos)
const tooltip = ref({
    left: '0px',
    top: '0px',
    show: false,
    id: 0,
})
const formatValueWatchHandler = watch(() => props.value, (currentValue, prevValue) => {
    if (currentValue !== prevValue) {
        updateFormattedMap()
    }
})
onUnmounted(formatValueWatchHandler)
const currentSelected = computed(() => {
    if (isAdd.value) {
        return [...selected.value, ...selectedTmp.value]
    } else {
        return [...selected.value.filter((item) => !selectedTmp.value.includes(item))]
    }
})
const formattedMap = ref(initFormattedMap())
initFormattedMap()
function initFormattedMap() {
    const map = new Map<string, { value: string, list: string[] }>()
    Week.forEach((item) => {
        map.set(item, {
            value: '',
            list: []
        })
    })
    return map
}
function updateFormattedMap() {
    const arr: string[] = []
    let index = 0
    while (index <= 6) {
        arr.push(props.value.slice(index * 48, (index * 48) + 48))
        index++
    }
    for (let index = 0; index < Week.length; index++) {
        const element = Week[index];
        const rawData = arr[index]
        const config = formattedMap.value.get(element)!
        if (rawData === config.value) continue
        const res: string[] = []
        if (rawData) {
            let start = 0
            let end = 0
            while (start < 48 && end <= 48) {
                if (rawData[end] === '1') {
                    end++
                } else {
                    if (start < end) {
                        res.push(getPeriodTime(start, end - start))
                    }
                    end++
                    start = end
                }
            }
        }
        formattedMap.value.set(element, {
            value: rawData,
            list: res
        })
    }
}
function handleMousedown(id: GridId) {
    isClickEvent.value = true
    isMouseDown.value = true
    tooltip.value.show = false
    isAdd.value = !selected.value.includes(id)
    startPos.value = getTimeGridPos(id)
}
function handleMouseup(id?: GridId) {
    isMouseDown.value = false
    let val = ''
    if (isClickEvent.value && typeof id === 'number') {
        const index = selected.value.indexOf(id)
        let result = [...selected.value]
        if (index < 0) {
            result.push(id)
        } else {
            result = result.filter((sid) => sid !== id)
        }
        val = getSelectedStr(result)
    } else {
        val = getSelectedStr(currentSelected.value)
        selectedTmp.value = []
        endPos.value = defaultPos
        startPos.value = defaultPos
    }
    if (val !== props.value) {
        emits('update:value', val)
        emits('change', val)
    }
}
function handleMouseout() {
    tooltip.value.show = false
}
function handleMouseover(id: GridId, config: { left: string; top: string }) {
    isClickEvent.value = false
    tooltip.value = {
        ...config,
        show: !isMouseDown.value,
        id,
    }
    if (!isMouseDown.value || endPos.value === id) { return }
    endPos.value = getTimeGridPos(id)
    const colGap = Math.abs(startPos.value.col! - endPos.value.col!) + 1
    let result: GridId[] = []
    let minRow = Math.min(startPos.value.row!, endPos.value.row!)
    const minCol = Math.min(startPos.value.col!, endPos.value.col!)
    const maxRow = Math.max(startPos.value.row!, endPos.value.row!)
    while (minRow <= maxRow) {
        const singleRowResult = Array.from({ length: colGap }).map(
            (_, index) => minRow * singleRowColCount + minCol + index,
        )
        result = [...result, ...singleRowResult]
        minRow++
    }
    selectedTmp.value = result
}
function handleReset() {
    emits('update:value', defaultValue)
    emits('change', defaultValue)
}
function getSelectedStr(data: GridId[]) {
    const bitmap = Array(...defaultValueBitMap)
    data.forEach((id) => {
        bitmap[id] = '1'
    })
    return bitmap.join('')
}

</script>
<style lang="scss" scoped>
.time-calender-container {
    width: 706px;

    & * {
        box-sizing: border-box;
    }

    .row {
        display: flex;

        &.center {
            align-items: center;
        }

        &.between {
            justify-content: space-between;
        }

        .col {
            &.none {
                flex: none;
            }

            &.auto {
                flex: auto;
            }
        }
    }
}

.text-center {
    text-align: center;
}

.time-calender {
    border: 1px solid #ccc;
    width: 100%;

    .info-grid {
        font-size: 13px;
        color: #888;
    }

    .header-info {
        display: flex;
        width: 100%;

        .week-label {
            flex: 0 0 80px;
            height: 50px;
            line-height: 50px;
            border-right: 1px solid #ccc;
        }

        .time-label-container {
            float: left;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;

            .time-label {
                float: left;
                width: 26px;
                height: 16px;
                line-height: 16px;
                font-size: 13px;
                color: #333;
            }
        }

        .info-grid-container {
            display: flex;
            flex-flow: row wrap;

            .time-info {
                flex: 1;
                width: 50%;
                height: 32px;
                line-height: 32px;

                &:first-child {
                    border-right: 1px solid #ccc;
                }
            }
        }


    }

    .time-container {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        .week-label-container {
            flex: 0 0 80px;

            .week-label {
                height: 35px;
                line-height: 35px;
                border-right: 1px solid #ccc;
                border-top: 1px solid #ccc;
            }
        }

        .time-grid-container {
            position: relative;

            .tooltip {
                position: fixed;
                z-index: 2;
                left: v-bind("tooltip.left");
                top: v-bind("tooltip.top");
                border-radius: 4px;
                border: 1px solid #ccc;
                padding: 2px 4px;
                box-shadow: 2px 2px 2px 0 #ccc;
                background-color: #fff !important;
                font-size: 14px;
                width: 160px;

                .label {
                    position: relative;
                    z-index: 2;
                }

                .arrow {
                    $width: 10px;
                    position: absolute;
                    bottom: calc($width / -2);
                    left: 50%;
                    margin-left: calc($width / -2); // half arrow width & half time grid width
                    width: $width;
                    height: $width;
                    transform: rotateZ(45deg);
                    box-shadow: 2px 2px 2px 0 #ccc;
                    background: #fff;
                    transform-origin: center center;
                }
            }

            .time-grid {
                z-index: 1;
                position: relative;

                &:nth-child(even) {
                    background-color: #f0f1f2;
                }

                &:nth-child(odd) {
                    background-color: #f8f9fa;
                }
            }
        }
    }
}

.tip-container {
    margin-top: 4px;
    font-size: 14px;

    button {
        font-size: 14px;
    }

    .demo-time-grid {
        background-color: #f0f1f2;
        vertical-align: text-top;
        width: 16px;
        height: 16px;
        line-height: 16px;
        display: inline-block;
        user-select: none;
        cursor: pointer;

        &.active {
            background-color: #6997f3;
        }
    }
}
</style>
  