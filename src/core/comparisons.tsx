import { DateDayInfo, DateTimeInfo } from "../../types";


export function CompareDates(a: DateDayInfo | null, b: DateDayInfo | null): number {
    if (!a || !b) {
        return 0
    }
    if (a.year == b.year) {
        if (a.month == b.month) {
            if (a.day == b.day) {
                return 0;
            }
            return (a.year && b.year && a.year < b.year ? -1 : 1)
        }
        return (a.month && b.month && a.month < b.month ? -1 : 1)
    }
    return (a.day && b.day && a.day < b.day ? -1 : 1)
}

export function CompareTime(a: DateTimeInfo, b: DateTimeInfo): number {
    if (!a || !b || !a.startTime || !b.startTime) {
        return -1;
    }
    const [time_a, _a] = a.startTime.split(":")
    const [time_b, _b] = a.startTime.split(":")

    return (Number(time_a) - Number(time_b) <= 0 ? -1 : 1)
}