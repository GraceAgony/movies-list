import React from 'react';
import './SearchBox.css'

class SearchBox extends React.Component{

  constructor(props){
      super(props);
      this.state={
          searchString: "",
          searchBy: "title"
      };

      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSearchByChange = this.handleSearchByChange.bind(this);
      this.handleEnter = this.handleEnter.bind(this);

  };

  handleSearchByChange(){
      let searchBy = document.getElementById('selectSearch').value.slice(3);

      this.setState({
          searchBy: searchBy,
      });
  };

    handleSearch() {
        this.props.searchFilm(this.state.searchBy,this.state.searchString);
    };

    handleTextChange(event){

        this.setState({
            searchString: event.target.value,
        });
    };

    handleEnter(event){
        event.preventDefault();
        if (event.keyCode == 13) {
            this.handleSearch(event);
        }
    };

    render() {
        return (
            <div className="searchbox">
                <input type="text" onChange={this.handleTextChange} onKeyUp={this.handleEnter}/>
                <button className="btn" onClick={this.handleSearch}>Search</button>
                <select id="selectSearch" defaultValue="by title" onChange={this.handleSearchByChange}>
                    <option>by title</option>
                    <option>by stars</option>
                </select>
            </div>
        );
    };
};

export default SearchBox;