import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link } from 'react-router'

const App = () => {
    return (
        <div>
          <h1>Our App Component</h1>
        </div>
    )
}


ReactDOM.render((
    <App />
), document.getElementById('container'))
