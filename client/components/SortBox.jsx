import React from 'react';
import { apiPrefix } from '../../configuration/config.json';
import  './sortBox.css';

class SortBox extends React.Component{
    constructor(props){
        super(props);

        this.handleAscendingClick=this.handleAscendingClick.bind(this);
        this.handleDescendingClick = this.handleDescendingClick.bind(this);
    };

    handleAscendingClick(){
        this.props.sort('ascending');
    };

    handleDescendingClick(){
        this.props.sort('descending');
    }


    render(){
        return(
            <div className="chooseSort">
                <img src={require('../image/ascending.png')}  onClick={this.handleAscendingClick}/>
                <img src={require('../image/descending.png')} onClick={this.handleDescendingClick} />
            </div>
        );
  };
};


export default SortBox;
