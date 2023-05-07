export const Week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
export type TValue = number
export const Time = Array.from({ length: 24 }).map((_, i) => i)
export const singleRowColCount = 48
export const defaultValue = '0'.repeat(singleRowColCount * 7)
export const defaultValueBitMap = defaultValue.split('')
export function getTime(id: number) {
    const count = id / 2
    if (id % 2 === 0) {
        return `${hourToStr(count)}:00 ~ ${hourToStr(count)}:30`
    } else {
        return `${hourToStr(Math.floor(count))}:30 ~ ${hourToStr(Math.ceil(count))}:00`
    }
}
export function getFullWeekAndTime(index: number) {
    const week = Math.floor(index / singleRowColCount) + 1
    const time = getTime(index % singleRowColCount)
    return `${Week[week - 1]} - ${time}`
}
export function getIdFromTime(time: string) {
    const [week, period] = time.split(' - ')
    const row = Week.indexOf(week) * singleRowColCount
    const [starttime] = period.split(' ~ ')
    const [hour, minute] = starttime.split(':')
    const col = parseInt(hour) * 2 + (minute === '00' ? 0 : 1)
    return row + col
}
function hourToStr(count: number) {
    return count < 10 ? `0${count}` : count
}
export function getTimeGridPos(id: number) {
    const week = Math.floor(id / singleRowColCount)
    return {
        row: week,
        col: id - week * singleRowColCount,
    }
}
export function getPeriodTime(id: number, periodLength: number) {
    const startTime = `${hourToStr(Math.floor(id / 2))} : ${id % 2 === 0 ? '00' : '30'}`
    const endTime = `${hourToStr(Math.floor((id + periodLength) / 2))} : ${(id + periodLength) % 2 === 0 ? '00' : '30'
        }`
    return `${startTime} ~ ${endTime}`
}
export interface Pos {
    col?: number
    row?: number
}
export const defaultPos: Pos = {
    row: undefined,
    col: undefined,
}
