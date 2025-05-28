// interface for the day the user wants to plan the date on.
export interface DateDayInfo {
    year: number | null,
    month: number | null,
    day: number | null
}

// interface for the start time and end time of a date / location ? 
export interface DateTimeInfo { // formatted in 24 hour time
    startTime: string | null,
    endTime: string | null
}
