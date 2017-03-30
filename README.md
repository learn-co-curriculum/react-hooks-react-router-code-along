# Introduction to React Router

## Objectives

1. Describe __React Router's__ approach to client-side routing
2. Explain how React Router allows building a route tree as a component
3. Describe how routes are matched in React Router

### A complicated world needs an address

So far, we have been building our applications without any navigation. What we mean, is that so far everything on our page has lived on the same url. Now we can make it look like we are changing the page, by showing or hiding some components, but none of these changes are dependent on a change in the url.

Now this may seem like a small quibble, but web addresses are the backbone of the Internet. Think about it, the web is just a series of links to other pages. And now instead of sharing a link to a list of users, we currently only provide a link to our homepage, and then would require some showing or hiding to a list of users.

__React Router__ is a routing library for __React__ that allows us to link to specific urls then show or hide various components depending on which url is displayed. As React Router's documentation states:

> Components are the heart of React's powerful, declarative programming model. React Router is a collection of navigational components that compose declaratively with your application. Whether you want to have bookmarkable URLs for your web app or a composable way to navigate in React Native, React Router works wherever React is rendering--so take your pick!


For this README we will be building our first Component routes as a Code Along

### Code Along

#### Step 1: Setting up our Main Route

*Note*
Make sure you clone down this repo, run `npm install && npm start`, and open http://localhost:3000 in the browser.

If you open up the src/index.js file you will see that currently we are defining an App component, and then rendering that component in the Dom.  

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
    </div>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
```

With React Router our core app routing will live in this component. We will define our navbar and our various routes within this file. Let's install that package now.

```
npm install react-router-dom
```

We now want to import the __BrowserRouter__ component as a __Router__ and the __Route__ component and inject it into our __App__ component.

```javascript
// .src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
// Step 1. Import react-router functions
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
      </Router>
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

Step 1: In Step 1 above, there are two components that we are importing from __React Router__. We use them in turn.  

Step 2: The __Router__ (aka BrowserRouter) component is the base for our apps routing. It is where we declare how we will be using __React Router__. For example, notice that nested inside the __Router__ component we use the __Route__ component. Now the __Route__ component is in charge of saying, when the url matches this specified path, render this specified component. We are using the `render` prop in the `Route` component, but we could have used `component={Home}` instead. With `render` we are just invoking a function call to render `<div>Home</div>`.

Let's try it. Run npm start to boot up the application and then go to localhost:3000 again. What you'll notice is that when you type in the url; it will render the `<div>Home</div>`.

<!--TODO-->
<!--more routes for more components-->
<!--NavLinks-->


## Resources
* [React Router Tutorial](https://reacttraining.com/react-router/web/example/basic)
