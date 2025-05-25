"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Component } from 'react'

export default class Calendar extends Component {
    render() {
        return (
            <div className="w-4/5 ml-auto h-screen flex flex-col justify-center bg-gradient-to-br from-indigo-900 to-purple-800 px-4 ">

                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    height="75%"
                    aspectRatio={0.2}
                />
            </div>)
    }
}
