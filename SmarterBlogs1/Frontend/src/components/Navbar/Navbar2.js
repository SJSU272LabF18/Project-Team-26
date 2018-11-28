import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
//import {Redirect} from 'react-router';

//create the Navbar Component
class NavBar2 extends Component {
    constructor(props){
        super(props);
       // this.handleLogout = this.handleLogout.bind(this);
    }
    render(){
    return(<div>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">SmarterBlogs</a>
            </div>
            <ul class="nav navbar-nav">
                <li><Link to="/create">Subscribe</Link></li>
                <li><Link to="/delete">Login</Link></li>
            </ul>
        </div>
    </nav>
</div>
    )
    }
}

export default NavBar2;