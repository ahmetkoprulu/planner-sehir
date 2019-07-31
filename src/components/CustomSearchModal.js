import React from 'react'

export default class CustomSearchModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
                url: "",
                tableHtml: "",
                scrapMode: "url"
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCick = this.handleCick.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
    }

    handleCick(event){
        const { name } = event.target
        if(event.target.getAttribute('data-value') === "url")
            this.setState({ [name]: event.target.getAttribute('data-value'), tableHtml: "" })
        else
            this.setState({ [name]: event.target.getAttribute('data-value'), url: "" })

        console.log(this.state.scrapMode, this.state.url, this.state.tableHtml);
        
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({ [name]: value })

        console.log(this.state.scrapMode, this.state.url, this.state.tableHtml);
    }

    saveChanges(){
        this.props.stateHandler(this.state)
    }

    render(){
        return(
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Manual Course Load</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <ul class="nav nav-pills red mb-3 w-100" id="pills-tab" role="tablist">
                                <li class="nav-item pill-1 w-50">
                                    <a class="nav-link active" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"
                                    name="scrapMode" data-value="url" checked={this.state.scrapMode === "url"} onClick={this.handleCick} >Course Url</a>
                                </li>
                                <li class="nav-item pill-1 w-50">
                                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"
                                    name="scrapMode" data-value="tableHtml" checked={this.state.scrapMode === "tableHtml"} onClick={this.handleCick}>Course Html</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <p>Please copy the url of recently published syllabus <br/> (it fails on pages that needs authentication)</p>
                                    <input type="text" name="url" value={this.state.url} onChange={this.handleChange} className="w-100" placeholder="Url here."/>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <p>Please copy the HTML SOURCE of syllabus. For more imformation https://developers.google.com/web/tools/chrome-devtools/</p>
                                    <textarea name="tableHtml" value={this.state.tableHtml} onChange={this.handleChange} className="w-100" placeholder="Html tags here."/>
                                </div>
                            </div>
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