import React from 'react';

class SortBox extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            sort: ascending,
        }
    };

    handleChange(){
        if(this.refs.sort.value == 'ascending'){
            this.setState({
                sort: 'ascending'
            });
        }else{
            this.setState({
                sort:'descending'
            })
        }

        this.props.sort();
    };


    render(){
        return(
            <select id="selectSort" defaultValue="ascending" ref='sort' onChange={this.handleChange}>
                <option>ascending</option>
                <option>descending</option>
            </select>
        );
  };
};


export default SortBox;
