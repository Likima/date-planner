"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Component } from 'react'

export default class Calendar extends Component {
    render() {
        return (
            <div className="w-full h-screen translate-x-1/3">

                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height="100%"
                    aspectRatio={0.2}
                />
            </div>)
    }
}
