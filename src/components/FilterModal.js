import React from 'react'

export default class CustomSearchModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            events:[
                [{},{}]
            ]
        }

        this.saveChanges = this.saveChanges.bind(this)
        this.addCourseDates = this.addCourseDates.bind(this)
        this.addTimeInterval = this.addTimeInterval.bind(this)
    }

    saveChanges(){
        this.props.stateHandler(this.state)
    }

    addCourseDates(e){
        this.setState( prevState => {
            events: [prevState.events, ]
        })
    }

    addTimeInterval(){

    }

    render(){
        return(
            <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Filter Courses</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {
                                this.state.events.length === 0
                                ? <p>There is no course time to filter</p> 
                                : this.state.events.map((event, index) => {
                                    <
                                })
                            }
                            <button className='btn btn-outline-dark w-100'>Add Course Time</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={this.saveChanges} data-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}