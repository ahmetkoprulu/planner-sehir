import React, { Component } from 'react';

import CourseEvent from './CourseEvent' 

import $ from 'jquery';
import cheerio from 'cheerio'
import html2canvas from 'html2canvas'



export const loadCourses = scrapOptions => {
    if(scrapOptions.scrapMode === "url"){
        fetch("https://source-extractor.herokuapp.com/redirect?url=" + scrapOptions.url, { mode: "cors" })
            .then((response) => response.text())
            .then((html) => extractCourses(html))
            .catch((err) => console.log('Failed to fetch page: ', err));
    } else if(scrapOptions.scrapMode === "tableHtml"){
        this.extractCourses(scrapOptions.tableHtml)
    }
}

export const extractCourses = html => {
    var courseEvents = []
    // Converting fetched html text to DOM object
    var doc = new DOMParser().parseFromString(html, "text/html")
    var courses = doc.getElementsByTagName("tr")
    console.log(doc);
    console.log(courses);

    for (var i = 1; i < courses.length; i++) {
        try {
            courseEvents.push(
                createEvent(courses.item(i).getElementsByTagName('td'))
                
            )
        } catch(err){
            console.log(err.message);
        }
    }
    this.setState({ events: courseEvents, search: '' })
}


    // Creating Course object and return it.
export const createEvent = row => {
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
                title: row.item(0).innerText,
                description: row.item(1).innerText,
                teacher: row.item(5).innerText,
                room: row.item(4).innerText,
                start: start,
                end: end,
            }
        )
    }

    return temp
} 