import React, { Component } from 'react';

import CourseEvent from './CourseEvent' 
import CustomSearchModal from './CustomSearchModal'
import FilterModal from './FilterModal'

import $ from 'jquery';
import html2canvas from 'html2canvas'

import settings from '../settings.json'

export default class Courses extends Component {
    constructor() {
        super()
        this.state = {
            events: [],
            search: '',
            scrapOptions:{
                url: settings.default_url,
                tableHtml: "",
                scrapMode: "url"
            },
            filterOptions: {
                events: []
            }
        }

        this.updateSearch = this.updateSearch.bind(this)
        this.handleState = this.handleState.bind(this)
        this.loadCourses = this.loadCourses.bind(this)
    }

    handleState(childState){
        this.setState({events:[], scrapOptions: childState})
        this.loadCourses(childState)
    }

    // Send request to courses url and fetches html file than extract table and its rows which contains courses data
    componentDidMount(){
        //this.loadCourses(this.state.scrapOptions)
    }

    loadCourses(scrapOptions){
        if(scrapOptions.scrapMode === "url"){
            fetch("https://source-extractor.herokuapp.com/redirect?url=" + scrapOptions.url, { mode: "cors" })
                .then((response) => response.text())
                .then((html) => this.extractCourses(html))
                .catch((err) => console.log('Failed to fetch page: ', err));
        } else if(scrapOptions.scrapMode === "tableHtml"){
            this.extractCourses(scrapOptions.tableHtml)
        }
    }

    extractCourses(html){
        var courseEvents = []
        // Converting fetched html text to DOM object
        var doc = new DOMParser().parseFromString(html, "text/html")
        var courses = doc.getElementsByTagName("tr")
        console.log(doc);
        console.log(courses);

        for (var i = 1; i < courses.length; i++) {
            try {
                courseEvents.push(
                    this.createEvent(courses.item(i).getElementsByTagName('td'))
                    
                )
            } catch(err){
                console.log(err.message);
            }
        }
        this.setState({ events: courseEvents, search: '' })
    }

    // Creating Course object and return it.
    createEvent(row) {
        var temp = []; var days = row.item(2).innerText.split("\n"); var hours = row.item(3).innerText.split("\n")
        var enumDay = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5 }
        if(days.length > hours.length){
            for (var i = 0; i < days.length; i++) {
                var tempHours = hours[0].trim().split('-')
                var start = '2016-01-1' + enumDay[days[i].trim()] + 'T' + tempHours[0]; var end = '2016-01-1' + enumDay[days[i].trim()] + 'T' + tempHours[1]
                temp.push(
                    {
                        id: row.item(0).innerText,
                        title: row.item(0).innerText + '\n ' + row.item(4).innerText,
                        description: row.item(1).innerText,
                        teacher: row.item(5).innerText,
                        room: row.item(4).innerText,
                        start: start,
                        end: end,
                        presentation: days[i] + " " + hours[0]
                    }
                )
            }
        }
        else {
            for (var i = 0; i < days.length; i++) {
                var tempHours = hours[i].trim().split('-')
                var start = '2016-01-1' + enumDay[days[i].trim()] + 'T' + tempHours[0]; var end = '2016-01-1' + enumDay[days[i].trim()] + 'T' + tempHours[1]
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
        }

        

        return temp
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'; var color = '#';
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

    generateComponents(){
        var filteredComps = this.state.events.filter(event => {
            return event[0].id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || event[0].description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        var comps = filteredComps.map(event => {
            var color = this.getRandomColor()
            for (var i = 0; i < event.length; i++) {
                event[i]['color'] = color
            }
            return <CourseEvent key={event[0].title} event={event} />
        })

        return comps
    }

    render() {
        return (
            <div className="col-md-4 mb-3 pr-4 courses">
                <div className="row">
                    <div class="btn-group w-100 mb-2" role="group" aria-label="Basic example">
                    <button className="btn btn-outline-dark w-auto" type="button" data-toggle="modal" data-target="#exampleModalCenter">Load Syllabus</button>
                    <button className="btn btn-outline-dark w-auto" type="button" data-toggle="modal" data-target="#filterModal">Time Filter</button>
                    <button className="btn btn-success" type="button" onClick={this.takeScreenShot}>Done!</button>
                    <button className="btn btn-danger w-auto" type="button" onClick={this.clearCalendar}>Clear</button>     
                    </div>
                    <div id="search" class="form-group has-search w-100">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control" value={this.state.search} onChange={this.updateSearch} placeholder="Search"></input>
                    </div>
                    <div className="col-md-12 scrollable" id='external-events'>
                        
                        {this.state.events.length > 0 ? 
                            this.generateComponents() : 
                            (<div class="spinner inner">
                                <div class="cube1"></div>
                                <div class="cube2"></div>
                                <div className="inner-text">Loading...</div>
                            </div>)
                        }

                    </div>
                </div>
                <CustomSearchModal stateHandler={this.handleState} />
                <FilterModal stateHandler={this.state} />
            </div>)
    }
}