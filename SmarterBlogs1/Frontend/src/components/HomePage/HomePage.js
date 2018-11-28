import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Select from 'react-select';
import Autocomplete from "../Autocomplete";

//create the Navbar Component
class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            articles: [],
            isHovering: false,
            //Article: "",
        }

        // this.QueryChangeHandler = this.QueryChangeHandler.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
    }



    submitCreate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            query: this.state.query,
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

    handleMouseHover() {
        this.setState(this.toggleHoverState);
      }
    
      toggleHoverState(state) {
        return {
          isHovering: !state.isHovering,
        }; 
      }

    render(){
         let redirectVar = null;
        if (this.state.a)
        {
            redirectVar = <Redirect to = {{ pathname : "/article" , state: { referrer: this.state.title} }} />
        }  


        let details = this.state.articles.map(article => {
            return(
                <tr onClick = {()=> this.expandArticle( article._source.title) } onMouseEnter= {this.handleMouseHover} onMouseLeave={this.handleMouseHover} >
                    <td ><b>{article._source.title}<br/>  {this.state.isHovering && <div> {article._source.summary} </div>}</b></td>
                </tr>
            )
        })
        return(
        <div>
            {redirectVar}
            <div>
                        <Autocomplete/>
                        <button onClick={this.submitCreate} class="btn btn-success" type="submit">Search</button>
         </div>
    
         <div>
                         <table class="list-table listingTable table table-hover ">
                            <tbody>
                                {/*Display the table row based on data recieved*/}
                                {details}
                            </tbody>
                        </table> 
                        </div>
                        </div>
        )
    }
}

export default HomePage;