import React, { Component } from 'react';

import CourseEvent from './CourseEvent' 

import $ from 'jquery';
import cheerio from 'cheerio'
import html2canvas from 'html2canvas'

export default class Courses extends Component {
    constructor() {
        super()
        this.state = {
            events: [],
            search: ''
        }

        this.Search = this.Search.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
    }

    Search() {
        var courseEvents = [];
        var self = this
        var createEv = this.createEvent
        // CORS Proxy Server Connection
        $.ajaxPrefilter(function (options) {

            if (options.crossDomain && $.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }

        });
        // Request for courses table at the url.
        var url = "https://sehir.edu.tr/tr/akademik/insan-ve-toplum-bilimleri-fakultesi/tarih/duyurular/2018-2019-bahar-donemi-ders-programi";
        $.get(url, function (response) { // If requuest success returns html file as "response"
            var mocDoc = cheerio.load(response)
            var doc = document.createElement('table')
            doc.innerHTML = mocDoc('table').children('tbody').html()
            console.log(doc);

            var courses = doc.getElementsByTagName('tr')
            for (var i = 1; i < courses.length; i++) {
                var row = courses.item(i).getElementsByTagName('td')
                console.log(row.item(0).innerText, row.item(2).innerText)
                if (row.item(2).innerText === undefined || row.item(2).innerText === " ") {
                    continue
                }
                try {
                    courseEvents.push(
                        createEv(row)
                    )
                } catch{
                    console.log(row.item(2).innerText + ' Could not added.');
                }
            }
            self.setState({ events: courseEvents, search: '' })
        }, 'html')

        console.log(this.courseEvents);
    }

    createEvent(row) {
        var temp = []
        var days = row.item(2).innerText.split("\n")
        var hours = row.item(3).innerText.split("\n")
        var enumDay = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5 }
        for (var i = 0; i < days.length; i++) {
            var tempHours = hours[i].trim().split('-')
            var start = '2016-01-1' + enumDay[days[i].trim()] + 'T' + tempHours[0]
            var end = '2016-01-1' + enumDay[days[i].trim()] + 'T' + tempHours[1]
            temp.push(
                {
                    id: row.item(0).innerText,
                    title: row.item(0).innerText + '\n ' + row.item(4).innerText,
                    description: row.item(1).innerText,
                    teacher: row.item(5).innerText,
                    room: row.item(4).innerText,
                    start: start,
                    end: end,
                    presentation: days[i] + " " + hours[i]
                }
            )
        }

        return temp
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    updateSearch(event) {
        event.persist()
        this.setState({ events: this.state.events, search: event.target.value.substr(0, 20) })
        console.log(this.state.search);
    }

    takeScreenShot() {
        html2canvas(document.querySelector("#calendar")).then(canvasElm => {
            var element = document.createElement('a');
            element.setAttribute('href', canvasElm.toDataURL('image/jpeg'));
            element.setAttribute('download', 'plan');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
        });
    }

    clearCalendar() {
        $('#calendar').fullCalendar('removeEvents')
    }

    render() {
        var filteredComps = this.state.events.filter(event => {
            return event[0].id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || event[0].description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        console.log(filteredComps);
        var comps = filteredComps.map(event => {
            var color = this.getRandomColor()
            for (var i = 0; i < event.length; i++) {
                event[i]['color'] = color
            }
            return <CourseEvent key={event[0].title} event={event} />
        })
        console.log(comps);
        return (
            <div className="col-md-4 mb-3">
                <div className="row" >
                    <div id="search" class="form-group has-search w-100">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control" value={this.state.search} onChange={this.updateSearch} placeholder="Search"></input>
                    </div>
                    <div className="col-md-12 scrollable" id='external-events'>
                        {comps}
                    </div>
                    <div class="btn-group w-100 mt-2" role="group" aria-label="Basic example">
                        <button className="btn btn-outline-dark w-auto" type="button" onClick={this.Search}>Scrap</button>
                        <button className="btn btn-outline-success w-50" type="button" onClick={this.takeScreenShot}>Done!</button>
                        <button className="btn btn-outline-danger w-auto" type="button" onClick={this.clearCalendar}>Clear</button>     
                    </div>
                </div>
            </div>)
    }
}