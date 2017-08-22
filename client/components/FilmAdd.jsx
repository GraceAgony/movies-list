import React from 'react';
import './FilmAdd.css';
import Formsy from 'formsy-react';

import Modal from 'react-modal';

class FilmAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            format: '',
            releaseYear: '',
            stars: '',
            isOpen: false,
            canSubmit: false,
        };



        this.handleChangeFormat = this.handleChangeFormat.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeRelease = this.handleChangeRelease.bind(this);
        this.handleChangeStars = this.handleChangeStars.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
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
            stars: this.state.stars,
            sortFileld: this.state.title.toLowerCase(),
        };
        this.props.onFilmAdd(newFilm);

        this.handleCloseModal();
    };

    enableButton() {
        this.setState({ canSubmit: true });
    };
    disableButton() {
        this.setState({ canSubmit: false });
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
                <div id="closeDiv">
                <img id="closeImg" onClick={this.handleCloseModal} src={require('../image/cross.png')}/>
                </div>
                <Formsy.Form id="addFilmForm" onSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                    <MyInput name="title" className="labelInput" type="text" placeholder="Enter title" value={this.state.title} onChange={this.handleChangeTitle} required />
                    <MyInput name="year" id="numberInput" className="labelInput" validations="isNumeric" validationError="This is not a valid year" type="number" placeholder="Enter release year" value={this.state.releaseYear} onChange={this.handleChangeRelease} />
                    <MyInput name="format" className="labelInput" type="text" placeholder="Enter format" value={this.state.format} onChange={this.handleChangeFormat} />
                    <MyInput name="stars" className="labelInput" type="text" placeholder="Enter stars" value={this.state.stars} onChange={this.handleChangeStars} />
                    <button id="addFilmButton"  className="btn" type="submit" disabled={!this.state.canSubmit} onClick={this.handleSubmit}>Submit</button>
                </Formsy.Form>
            </Modal>
        </div>
        );
    }
};

const MyInput = React.createClass({
    mixins: [Formsy.Mixin],
    render() {
        const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
        const errorMessage = this.getErrorMessage();
        return (
            <div className={className}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <input
                    type={this.props.type || 'text'}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    value={this.getValue()}
                    checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
                />
                <span ref="noValid" className='validation-error'>{errorMessage + (this.showRequired()&&(this.value === undefined)) ? "*it's required" : ''}</span>
            </div>
        );
    }
});



export default FilmAdd;