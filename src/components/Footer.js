import React, { Component } from 'react';

import '../App.css';

export default class Footer extends Component {
    render() {
        return (
            <footer class="page-footer font-small darken-3">
                <div class="container-fluid material-gray">
                    <div class="row">
                        <div class="col-md-12 pb-4">
                            <div class=" flex-center">
                                <div class="col-md-8 col-12 mt-4">
                                    <h3>Introduction</h3>
                                    <p>Courses will load immediately after page is loaded. If you think courses are wrong you can load manually by clicking "Scrap". In order to add courses to calendar click the loaded courses on the right. To remove them from calendar, click them on the calendar. Ater all "Done" button will create an image and download it to your pc.</p>
                                    <br />
                                    <p>Thanks for using. Contact me for any feedback.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="material-black text-center py-3">
                    Made By Ahmet Ensar Köprülü
                </div>
            </footer>
        )
    }
}