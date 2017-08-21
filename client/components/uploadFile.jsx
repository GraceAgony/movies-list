import React from 'react';
import { apiPrefix } from '../../configuration/config.json';
import  './uploadFile.css';

class UploadFile extends React.Component{
    constructor(props){
        super(props);
        this.state = {file: '',};

        this.readFile=this.readFile.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    };

    readFile(event){
       event.preventDefault();
        let file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
            this.setState({
                file: reader.result,
            });
        };
        reader.readAsText(file);
    };

    _handleSubmit(event) {
        event.preventDefault();
        this.props.handleUploadSubmit(this.state.file);
    };

    render(){
        return(
            <form id="uploadForm">
                <div id="fileContainer">
                    <img className="img" src={require('../image/upload-file.png')}/>
            <input id="upload" className="inputfile" ref="upload" type="file" accept=".txt"
                    onChange={(event)=> {
                       this.readFile(event)
                   }}
                   onClick={(event)=> {
                       event.target.value = null
                   }}

            />
                </div>
                <button id="upload-btn"
                        className="btn"
                        type="submit"
                        onClick={(e)=>this._handleSubmit(event)}>Upload</button>
            </form>
        );
    };
};

export default UploadFile;