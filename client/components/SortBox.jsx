import React from 'react';
import { apiPrefix } from '../../configuration/config.json';
import  './sortBox.css';

class SortBox extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

    };

    handleChange() {
        if (this.refs.sort.alt === 'ascending') {
            this.refs.sort.setAttribute('alt', 'descending');
            console.log(this.refs.sort);
            this.refs.sort.setAttribute('src', require('../image/descending.png'));
        } else {
            this.refs.sort.setAttribute('alt', 'ascending');
            this.refs.sort.setAttribute('src', require('../image/ascending.png'));
        }
        ;

        this.props.sort(this.refs.sort.alt);

    };

        render(){
        return(
            <div className="chooseSort">
                <img src={require('../image/ascending.png')} alt='ascending' ref='sort' onClick={this.handleChange}/>
            </div>
        );
  };
};


export default SortBox;
