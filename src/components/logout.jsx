import React, { Component } from 'react';
import * as auth from '../services/auth';

class Logout extends Component {
    state = {  }
    async componentDidMount() {
        //const { data: response } = await auth.logout();
        localStorage.removeItem('token');
        window.location = '/';
    }
    render(){
        return null;
    }
}

export default Logout;