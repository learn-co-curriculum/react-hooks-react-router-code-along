# Introduction to React Router

## Objectives

1. Describe React Router's approach to client-side routing
2. Explain how React Router allows building a route tree as a component
3. Describe how routes are matched in React Router

### A complicated world needs an address
So far, we have been building our applications without any navigation.  What we mean, is that so far everything on our page has lived on the same url.  Now we can make it look like we are changing the page, by showing or hiding some components, but none of these changes are dependent on a change in the url.

Now this may seem like a small quibble, but web addresses are the backbone of the Internet.  Think about it, the web is just a series of links to other pages.  And now instead of sharing a link to a list of users, we currently only provide a link to our homepage, and then would require some showing or hiding to a list of users.

React Router is a routing library for __React__ that allows us to link to specific urls then show or hide various components depending on which url is displayed.  As React Router's documentation states:

> React Router is a complete routing library for React.
React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.

For this README we will be building our first Component routes as a Code Along

### Code Along

#### Step 1: Setting up our Main Route

*Note*
Make sure you clone down this repo and run `npm install`.
To Run `npm start` to run the code and open http://localhost:8080 in the browser.

```javascript
  import React from 'react'
  import ReactDOM from 'react-dom'
  const App = () => {
      return (
          <div><h1>Our App Component</h1></div>
      )
  }

  ReactDOM.render(
      <App />
  , document.getElementById('container'))
```

If you open up the src/index.js file you will see that currently we are defining an App component, and then rendering that component in the Dom.  

Now in a world where the content displayed depends on the url, we don't simply want to always render the App component, but rather we want the url to determine what is displayed.  So we instead use our react-router library to determine what is displayed.

```JavaScript
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
// Step 1. Import react-router methods
import { Router, Route, browserHistory } from 'react-router'

const App = () => {
    return (
        <div><h1>Our App Component</h1></div>
    )
}

// Step 2. Changed to have router coordinate what is displayed
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/home" component={App} />
    </Router>
), document.getElementById('container'))

```
Step 1: There are three methods that we are importing from react-router.  We use them in turn.  

Step 2: Let's put browserHistory aside for now, and instead focus on Router and Route.  The router component is our outermost component in our application.  It is where we declare how we will be using react-router.  For example, notice that nested inside the Router component we use the route component.  Now the route component is in charge of saying, when the url matches the the specified path, render the specified component.  So in the index.js file, it states when the route is the root url followed by /home, display the App component.

Let's try it. Run npm start to boot up the application and then go to localhost:8080. What you'll notice is that when you type in the url localhost:8080, the App component is missing.  However, if you direct the browser to localhost:8080/home then the App component will display.

### Explaining the history prop

Ok, so far we have learned that the Router component sets the rules for the how the routes will work, and that nested within it are specific Route components.  Each Route component specifies which component to display per the listed url.

Now the Router component's history prop specifies how to reach a particular url.  For example currently, we render the App component by visiting localhost:8080/home.  However, if we change the history prop to equal hashHistory, we render the App component by visiting localhost:8080#home.  Let's try it:

```javascript
// index.js

import React from 'react'
import ReactDOM from 'react-dom'

// 1. change from browserHistory to hashHistory
import { Router, Route, hashHistory } from 'react-router'

const App = () => {
    return (
        <div><h1>Our App Component</h1></div>
    )
}

ReactDOM.render((
  // 2. change browserHistory to hashHistory
    <Router history={hashHistory}>
        <Route path="/home" component={App} />
    </Router>
), document.getElementById('container'))

```

So after importing hashHistory instead of browserHistory and using it as the value to the history prop in the Router component, you no longer render the App component by visiting localhost:8080/home.  Instead you visit, http://localhost:8080/#/home to render the App component.  Which one is preferred?  browserHistory is now preferred.  But now hopefully, you understand what the history prop specifies.

## Wrapping Up

As a final step, let's change the history back to the browserHistory and add one more route which displays a users component when visited.  
```javascript
import React from 'react'
import ReactDOM from 'react-dom'

// 1. change back to browserHistory
import { Router, Route, browserHistory } from 'react-router'

const App = () => {
    return (
        <div><h1>Our App Component</h1></div>
    )
}

const Users = () => {
    return (
        <div><h1>Users</h1></div>
    )
}

ReactDOM.render((
  // 2. change back to browserHistory
    <Router history={browserHistory}>
        // add root path renders App
        <Route path="/" component={App} />
        <Route path="/home" component={App} />
        // add users path renders Users
        <Route path="/users" component={Users} />
    </Router>
), document.getElementById('container'))
```

Now, if you boot up the application, you see that when visiting localhost:8080/home the App component displays.  When visiting localhost:8080 the App component displays again.  When visting localhost:8080/users the Users component displays.  If a user visits any other url, nothing displays.

## Summary

React router allows our react-redux applications to display specific components depending on the browser's url.  To implement react-router, we no longer directly pass a component like App to the ReactDOM.render function, and instead pass the Router component.  The Router sets the configuration for what will be displayed.  It wraps a specific Route component.  The Route component specifies the path prop and the component prop, which says what component to render upon visiting a specific path.  

## Resources
* [Ember Core Concepts](https://guides.emberjs.com/v1.10.0/concepts/core-concepts/)
* [React Router Tutorial](https://github.com/reactjs/react-router-tutorial)
