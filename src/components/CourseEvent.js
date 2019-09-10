import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import $ from 'jquery';

export default class CourseEvent extends Component {
    constructor(props) {
        super(props)
        this.event = props.event // event is an array of event objects because one course has multiple events on calendar
    }

    render() {
        var times = this.event.map(event => event.presentation)
        return (
            <div className='fc-event mb-2 bg-dark'>
                {this.event[0].id + ' | ' + this.event[0].description}
                <br />
                {this.event[0].teacher + ' | ' + this.event[0].room}
                <br />
                {times}
            </div>)
    }

    componentDidMount() {
        // Adding on click event that will place event to the calendar
        var element = ReactDOM.findDOMNode(this)
        element.addEventListener('click', () => { // Iterating all child events in the event
            for (var i = 0; i < this.event.length; i++) {
                $('#calendar').fullCalendar('renderEvent', this.props.event[i])
            }
        })
    }
}