import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router';
import Navbar2 from '../Navbar/Navbar2'

//create the Navbar Component
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
           title :  this.props.location.state && this.props.location.state.referrer,
            article : [],
          };
        
        }
        

            componentDidMount() {
                const data = {
                    query : this.state.title,
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
     <h3 align = 'center'>{x._source.title}</h3> <br/> <b>-By {x._source.author}</b> <br/> <br/> <b>{x._source.date}</b> <br/><br/><p align='justify'>{x._source.content}</p>
     </div>
            )
        })
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
 
 </div>
    
    </div>
    </div>
            <div class="container">
                        
                                {/*Display the table row based on data recieved*/}
                                {details}
                           
                </div> 
                </div>
        )
    }
}

export default Article;