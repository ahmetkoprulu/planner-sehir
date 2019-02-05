import React, { Component } from 'react';

import $ from 'jquery';

import '../App.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';


export default class Calendar extends Component {
    render() {
        return (
            <div className="col-md-8 mb-3">
                <div id="calendar"></div>
            </div>)
    }

    // conmponentDidMount Function is special function that executed immediatly after component rendered.
    componentDidMount() {
        // Setting up calendar
        $('#calendar').fullCalendar(
            {
                eventClick: function (event) {
                    $("#calendar").fullCalendar('removeEvents', event.id); // Removes event when it clicked on calendar.
                },
                header: false,
                defaultView: 'agendaWeek',
                weekends: false,
                allDaySlot: false,
                height: 'auto',
                defaultDate: '2016-01-11',
                slotLabelFormat: 'H:mm',
                minTime: '09:00:00',
                maxTime: '18:00:00',
                slotDuration: '00:30:00',
                columnHeader: true,
                columnHeaderFormat: 'ddd',
            }
        )
    }
}