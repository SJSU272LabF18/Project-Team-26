import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {Redirect} from 'react-router';
import ReactTable from 'react-table'
import Navbar from './Navbar/Navbar'
//import SearchBar from 'material-ui-search-bar'
//import { SearchBar } from 'react-native-elements'
import { Col, Fa, FormInline } from "mdbreact";
import "../autocomplete.css";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      query: "",
      articles: [],
      isHovering: false,
      summary : "",
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const lastChar = userInput[userInput.length - 1];
    console.log(userInput);
    // Filter our suggestions that don't contain the user's input
    if(lastChar === ' '){ //check if the last character is a <space>
        //this.setState({query: val}) //if yes, reset value
        const data = {
            userInput
        }
        axios.post('http://localhost:3001/autocorrect',data)
        .then((response) => {
            console.log("response:", response.data.suggestions);
            
            //console.log(response.data[0].user.Fname);
            this.setState({
                filteredSuggestions : response.data.suggestions
                //profiles : this.state.profiles.concat(response.data) 
            });
        });
    }
    this.setState({
      activeSuggestion: 0,
      //filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  }

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  submitCreate = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
        query: this.state.userInput,
    }
    //set the with credentials to true
                axios.defaults.withCredentials = true;
                //make a post request with the user data
                 axios.post('http://localhost:3001/search',data)
                 .then((response) => {
                     console.log("response:", response.data.hits.hits);
                     //console.log(response.data[0].user.Fname);
                    this.setState({
                        articles : response.data.hits.hits
                        //profiles : this.state.profiles.concat(response.data) 
                    });
                }); 
};

expandArticle(title){
    this.setState({
        title : title,
        a : true
    })

}

handleMouseHover(summary) {
  this.setState({
    summary : summary,
})
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    }; 
  }

  render() {
    let redirectVar = null;
    if (this.state.a)
    {
        redirectVar = <Redirect to = {{ pathname : "/article" , state: { referrer: this.state.title} }} />
    }  


    let details = this.state.articles.map(article => {
        return(
            <tr onClick = {()=> this.expandArticle( article._source.title) }>
                <td><h2>{article._source.title}</h2> <h1>- {article._source.author}, {article._source.date}</h1> {<div> {article._source.summary} </div>}</td>
            </tr>
        )
    })
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
        <div class = "col-md-12">
          <div class="small-top">
    <div class="container">
    <div class="row">
    <div class="col-lg-4 date-sec">
    <div id="Date"></div>
    </div>
    <div class="col-lg-3 offset-lg-5">
    <div class="social-icon"><a target="_blank" href="#" class=" fa fa-google-plus"></a> <a target="_blank" href="#" class=" fa fa-linkedin"></a> <a target="_blank" href="#" class=" fa fa-youtube"></a> <a target="_blank" href="#" class=" fa fa-vimeo-square"></a> </div>
    </div>
    </div>
    </div>
    </div>
    <div class="top-head left">
    <div class="container">
    <div class="row">
    
    <h1 align ="center">Grafreez News<small>Get the latest News</small></h1>
    </div>
    <div class="col-md-6 col-lg-3 ml-auto admin-bar hidden-sm-down">
 <nav class="nav nav-inline"> <a href="#" class="nav-link"><span class="ping"></span><i class="fa fa-envelope-o"></i></a> <a href="#" class="nav-link"><i class="fa fa-bell-o"></i></a> <a href="#" class="nav-link"></a> </nav>
 </div>
    
    </div><br/> <br/>
    </div> 
        {redirectVar}
        <div class="container">  
	<div class="row">
 
        <div class="row justify-content-between">
            <div id="custom-search-input"> 
                <div class="input-group col-md-12"> <br/>
                <Fragment>
                    <input type="text" class="form-control input-lg" placeholder="Search for an article" onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}/>
          <div>
          {suggestionsListComponent}
          </div>
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button" onClick={this.submitCreate}>
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                    
                    </Fragment>
                    
                </div>
            </div>
        </div>
	</div>
</div>  
     <div class = "center">
      <div class = "center" >
                         <table class="list-table listingTable table table-hover">
                            <tbody> 
                                {/*Display the table row based on data recieved*/}
                                {details}
                             </tbody> 
                        </table> 
                        </div>
                        </div>
                        </div>
            
    );
  }
}

export default Autocomplete;
