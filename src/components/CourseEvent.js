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
            <div class='course-event'>
                <div class='title'>{this.event[0].id + '-' + this.event[0].description}</div>
                <div class='info'>
                    <div>
                        <div>{this.event[0].teacher}</div>
                        <span>{this.event[0].room}</span>
                    </div>
                    <div>
                        {
                            times.map(time => <div>{time}</div>)
                        }
                        
                    </div>
                    <span></span>
                    
                </div>
            </div>)
    }

    componentDidMount() {
        // Adding on click event that will place event to the calendar
        var element = ReactDOM.findDOMNode(this)
        element.addEventListener('click', () => { // Iterating all child events in the event
            var allEvents = $('#calendar').fullCalendar('clientEvents');
            var el = allEvents.find(el => el.id === this.event[0].id)
            if(!el){
                for (var i = 0; i < this.event.length; i++) {
                    $('#calendar').fullCalendar('renderEvent', this.props.event[i])
                }
            }
        })
    }
}