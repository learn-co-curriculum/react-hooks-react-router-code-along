// code goes here
import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, hashHistory } from 'react-router'

const App = () => {
    return (
        <div><h1>Our App Component</h1></div>
    )
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="home" component={App} />
    </Router>
), document.getElementById('container'))
