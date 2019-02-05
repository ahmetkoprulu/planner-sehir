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
                                    <p>In order to load courses data click "Scrap" button. After container on the right filled you may add courses by clicking on them. By clicking the course placed on calender you may remove them. After you create your plan "Done!" button will create image of calendar and download it.</p>
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