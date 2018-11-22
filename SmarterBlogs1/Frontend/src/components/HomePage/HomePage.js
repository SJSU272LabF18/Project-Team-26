import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            articles: []
        }

        this.QueryChangeHandler = this.QueryChangeHandler.bind(this);
    }

    QueryChangeHandler = (e) => {
        this.setState({
            query: e.target.value
        })
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
                            articles : this.state.articles.concat(response.data.hits.hits)
                            //profiles : this.state.profiles.concat(response.data) 
                        });
                    }); 
    };

    expandArticle(Heading){
        this.setState({
            Heading : Heading,
            a : true
        })

    }

    render(){
         let redirectVar = null;
        if (this.state.a)
        {
            redirectVar = <Redirect to = {{ pathname : "/article" , state: { referrer: this.state.Heading} }} />
        }  

        let details = this.state.articles.map(article => {
            return(
                <tr onClick = {()=> this.expandArticle( article._source.Heading) } >
                    <td><b>{article._source.Heading}</b></td>
                </tr>
            )
        })
        return(
        <div>
            {redirectVar}
            <div>
                            <input value = {this.state.query} onChange={this.QueryChangeHandler} type="text" className="form-control form-control-lg" placeholder="Search here"></input>
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