import React from 'react';
import './film.css';

import Modal from 'react-modal';

class Film extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    handleOpenModal () {
        this.setState({ isOpen: true });
    };

    handleCloseModal () {
        this.setState({ isOpen: false });
    };

    render() {
            return (
                <div className='Film'>

                    <h4 className='Film_title'>{this.props.title}</h4>
                    <div id="info-btn">
                        <button className="btn" onClick={this.handleOpenModal}>Details</button>
                        <img className='Film_del' onClick={this.props.onDelete} src={require('../image/x-button.png')}/>
                    </div>
                        <Modal
                        isOpen={this.state.isOpen}
                        contentLabel="Modal"
                        className='Modal'
                    >
                        <div id="detailsModal">
                            <img id="closingImg" onClick={this.handleCloseModal} src={require('../image/cross.png')}/>
                            <div id="contentModal">
                                <div className='Film_stars'>Stars: {this.props.stars}</div>
                                <div className='Film_release'>Release year: {this.props.releaseYear}</div>
                                <div className='Film_format'>Format: {this.props.format}</div>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        };

}

export default Film;