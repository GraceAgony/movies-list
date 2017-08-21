import React from 'react';
import './FilmAdd.css';

import Modal from 'react-modal';

class FilmAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            format: '',
            releaseYear: 0,
            stars: '',
             isOpen: false
        };

        this.handleChangeFormat = this.handleChangeFormat.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeRelease = this.handleChangeRelease.bind(this);
        this.handleChangeStars = this.handleChangeStars.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);


    };

    handleChangeTitle(event){
        this.setState({title: event.target.value});
    };

    handleChangeFormat(event){
        this.setState({format: event.target.value});
    };

    handleChangeRelease(event){
        this.setState({releaseYear: event.target.value});
    };

    handleChangeStars(event){
        this.setState({stars: event.target.value});
    };

    handleOpenModal () {
        this.setState({ isOpen: true });
    };

    handleCloseModal () {
        this.setState({ isOpen: false ,
                        title: '',
                        format: '',
                        releaseYear: 0,
                        stars: '',});
    };

    handleSubmit(){
        const newFilm = {
            title: this.state.title,
            format: this.state.format,
            releaseYear: this.state.releaseYear,
            stars: this.state.stars
        };

        this.props.onFilmAdd(newFilm);

        this.handleCloseModal();
    };

    render(){
        return (
            <div id="formDiv">
                <button id="openModalAdd" className="btn" onClick={this.handleOpenModal}>Add</button>
            <Modal
                isOpen={this.state.isOpen}
                contentLabel="Modal"
                className='Modal'
            >
                <form id="addFilmForm">
                    <img id="closeImg" onClick={this.handleCloseModal} src={require('../image/cross.png')}/>
                    <div id="inputForm">
                        <input className="labelInput" type="text" placeholder="Enter title" value={this.state.title} onChange={this.handleChangeTitle} />
                        <input id="numberInput" className="labelInput" type="number" placeholder="Enter release year" value={this.state.releaseYear} onChange={this.handleChangeRelease} />
                        <input className="labelInput" type="text" placeholder="Enter format" value={this.state.format} onChange={this.handleChangeFormat} />
                        <input className="labelInput" type="text" placeholder="Enter stars" value={this.state.stars} onChange={this.handleChangeStars} />
                    </div>
                </form>
                <input id="addFilmButton"  className="btn" type="submit" value="Submit" onClick={this.handleSubmit}/>

            </Modal>
        </div>
        );
    }
};

export default FilmAdd;