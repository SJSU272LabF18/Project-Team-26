import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router';


//create the Navbar Component
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
           Heading :  this.props.location.state && this.props.location.state.referrer,
            article : [],
          };
        
        }
        

            componentDidMount() {
                const data = {
                    query : this.state.Heading,
                }
                axios.post('http://localhost:3001/search',data)
                        .then((response) => {
                        console.log(response.data.hits.hits[0]);
                        this.setState({
                            article : this.state.article.concat(response.data.hits.hits[0])
                        });
                })
            }


    render() {
        let details = this.state.article.map(x => {
            return(
                <div>
     <h2>{x._source.Heading}</h2> <br/> {x._source.Article}
     </div>
            )
        })
        return (
                <div class="container">
                        
                                {/*Display the table row based on data recieved*/}
                                {details}
                           
                </div> 
        )
    }
}

export default Article;