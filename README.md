# Introduction to React Router

## Objectives

1. Describe __React Router's__ approach to client-side routing
2. Explain how React Router allows building a route tree as a component
3. Describe how routes are matched in React Router

### A complicated world needs an address

So far, we have been building our applications without any navigation. What we mean, is that so far everything on our page has lived on the same url. Now we can make it look like we are changing the page, by showing or hiding some components, but none of these changes are dependent on a change in the url.

Now this may seem like a small quibble, but web addresses are the backbone of the Internet. Think about it, the web is just a series of links to other pages. And now instead of sharing a link to a list of users, we currently only provide a link to our homepage, and then would require some showing or hiding to a list of users.

__React Router__ is a routing library for __React__ that allows us to link to specific urls then show or hide various components depending on which url is displayed.  As React Router's documentation states:

> __React Router__ is a complete routing library for __React__.
__React Router__ keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.

For this README we will be building our first Component routes as a Code Along

### Code Along

#### Step 1: Setting up our Main Route

*Note*
Make sure you clone down this repo, run `npm install && npm start`, and open http://localhost:8080 in the browser.

If you open up the src/index.js file you will see that currently we are defining an App component, and then rendering that component in the Dom.  

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>Our App Component</h1>
    </div>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('container')
);
```

Now in a world where the content displayed depends on the url, we don't simply want to always render the __App__ component, but rather we want the url to determine what is displayed. So we instead use our __React Router__ library to determine what is displayed.

```javascript
// .src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
// Step 1. Import react-router functions
import { Router, Route, browserHistory } from 'react-router';

const App = () => {
  return (
    <div>
      <h1>Our App Component</h1>
    </div>
  );
};

// Step 2. Changed to have router coordinate what is displayed
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/home" component={App} />
  </Router>), 
  document.getElementById('container')
);
```
Step 1: In Step 1 above, there are three functions that we are importing from __React Router__. We use them in turn.  

Step 2: Let's put __browserHistory__ aside for now, and instead focus on __Router & Route__. The __Router__ component is our outermost component in our application. It is where we declare how we will be using __React Router__. For example, notice that nested inside the __Router__ component we use the __Route__ component. Now the __Route__ component is in charge of saying, when the url matches the the specified path, render the specified component. So in the `./src/index.js` file, it states when the __Route__ is the root url followed by __/home__, display the __App__ component.

Let's try it. Run npm start to boot up the application and then go to localhost:8080. What you'll notice is that when you type in the url localhost:8080, the __App__ component is missing. However, if you direct the browser to localhost:8080/home then the __App__ component will display.

### Explaining the history prop

Ok, so far we have learned that the __Router__ component sets the rules for the how the routes will work, and that nested within it are specific __Route__ components. Each __Route__ component specifies which component to display per the listed url.

Now the __Router__ component's history prop specifies how to reach a particular url. For example currently, we render the __App__ component by visiting localhost:8080/home. However, if we change the history prop to equal __hashHistory__, we render the App component by visiting localhost:8080#home. Let's try it:

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
// 1. change from browserHistory to hashHistory
import { Router, Route, hashHistory } from 'react-router';

const App = () => {
  return (
    <div>
      <h1>Our App Component</h1>
    </div>
  );
};

// change browserHistory to hashHistory
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/home" component={App} />
  </Router>), 
  document.getElementById('container')
);
```

So after importing __hashHistory__ instead of __browserHistory__, and using it as the value to the history prop in the __Router__ component, you no longer rendering the __App__ component by visiting localhost:8080/home. Instead you visit, http://localhost:8080/#/home to render the App component.  Which one is preferred? browserHistory is now preferred. But now hopefully, you understand what the history prop specifies.

## Wrapping Up

As a final step, let's change the history back to the __browserHistory__ and add one more route which displays a users component when visited.  

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
// 1. change back to browserHistory
import { Router, Route, browserHistory } from 'react-router';

const App = () => {
  return (
    <div>
      <h1>Our App Component</h1>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
    </div>
  )
};

/* 
2. change history prop back to using browserHistory
  * change /home path to / so that it renders App at root path
  * add users path so that it renders Users
*/
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/users" component={Users} />
  </Router>), 
  document.getElementById('container')
);
```

Now, if you boot up the application, you see that when visiting localhost:8080/ the __App__ component displays. When visting localhost:8080/users the __Users__ component displays. If a user visits any other url, nothing displays.

### Adding in Links

Now we know that the normal way we interact with an application is not by manually typing in different urls, but by clicking on different buttons, and having them change the url in the browser. Whenever, we think about our __React__ application interacting with the url, we should think that the __React Router__ library has us covered. Indeed it does. We can import a __Link__ component from the __React Router__ library, and specify which url the component should point us to when clicked.  

So now we would update our application to the following:

```javascript
// ./src/index.js 

import React from 'react';
import ReactDOM from 'react-dom';
// 1. add Link component
import { Router, Route, browserHistory, Link } from 'react-router';

const App = () => {
  return (
    <div>
      {/* add Link component */}
      <Link to="/users">Users</Link>
      <h1>Our App Component</h1>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
    </div>
  )
};

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/users" component={Users} />
  </Router>), 
  document.getElementById('container')
);
```

After doing so, you can see that starting off at the root url renders our __App__ component, which displays a link to take us to our users component. Because we set the `to` prop to point us towards the `/users` url, we see that upon clicking on the Link that says users we are taken to that url, and our __Users__ component renders.

## Summary

__React Router__ allows our __React & Redux__ applications to display specific components depending on the browser's url. To implement __React Router__, we no longer directly pass a component like __App__ to the __ReactDOM.render()__ function, and instead pass the __Router__ component. The __Router__ sets the configuration for what will be displayed. It wraps a specific __Route__ component. The __Route__ component specifies the path prop and the component prop, which says what component to render upon visiting a specific path. We also saw that the __Link__ component allows the user to request a specific path upon clicking on a __Link__ component.  

## Resources
* [Ember Core Concepts](https://guides.emberjs.com/v1.10.0/concepts/core-concepts/)
* [React Router Tutorial](https://github.com/reactjs/react-router-tutorial)
