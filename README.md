# Introduction to React Router

## Objectives

1. Describe __React Router's__ approach to client-side routing
2. Explain how React Router allows building a route tree as a component
3. Describe how routes are matched in React Router

### A complicated world needs an address

So far, we have been building our applications without any navigation, so everything in the app has lived at the same url. Now we can make it look like we are changing the page, by showing or hiding some components, but none of these changes are dependent on a change in the url.

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
      <h1>Home</h1>
    </div>
  );
};

// Step 2. Changed to have router coordinate what is displayed
ReactDOM.render((
  <Router>
    <Route path="/" component={App} />
  </Router>), 
  document.getElementById('root')
);
```

Step 1: In Step 1 above, there are two components that we are importing from __React Router__. We use them in turn.  

Step 2: The __Router__ (aka BrowserRouter) component is the base for our app's routing. It is where we declare how __React Router__ will be used. For example, notice that nested inside the __Router__ component we use the __Route__ component. The __Route__ component is in charge of saying, when the url matches this specified path, render this specified component. We are using the `render` prop in the `Route` component, but we could have used `component={Home}` instead. With `render` we are just invoking a function call to render `<div><h1>Home</h1></div>`.

Let's try it. Run npm start to boot up the application and then point your url to localhost:3000. What you'll notice is that when you type in the url; it will render a `<div>Home</div>`.

#### Adding Additional Routes

In the last two steps we learned how to set up the basic __Router__ component and inject our very first __Route__ component. Let's continue down the rabbit hole and add routes for an __about__ page and a __login__ page. 

In our `/src/index.js file we should now have the following code: 

```javascript 
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" render={() => <h1>Home</h1>} />
      </Router>
    </div>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
```

Let's add our `/about` and `/login` routes

```javascript 
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" render={() => <h1>Home</h1>} />
        {/* add in this code */}
        <Route exact path="/about" render={() => <h1>About</h1>} />
        <Route exact path="/login" render={() => 
          <div>
            <form>
              <div>
                <input type="text" name="username" placeholder="Username" />
                <label htmlFor="username">Username</label>
              </div>
              <div>
                <input type="password" name="password" placeholder="Password" />
                <label htmlFor="password">Password</label>
              </div>
              <input type="submit" value="Login" />
            </form>
          </div>
        } />
      </Router>
    </div>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
```

Reload your browser and look at our beautiful routes, but..... oh wait....?!?! Where is the rendered content?

If you open up your browser dev tools console You should be seeing the error: `Uncaught Error: A <Router> may have only one child element`. What does this mean? Well a __Router__ component can only have one child, but we just gave it 3 children. To remedy this problem we need to place all of the __Route__ components into a `<div>` tag. Lets take the parent `<div>` tag and nest it inside of the __Router__ component instead like this: 

```javascript 
return (
  <Router>
    {/* move the <div> tag to be nested inside of the <Router> component */}
    <div>
      <Route exact path="/" render={() => <h1>Home</h1>} />
      
      <Route exact path="/about" render={() => <h1>About</h1>} />
      <Route exact path="/login" render={() => 
        <div>
          <h1>Login</h1>
          <form>
            <div>
              <input type="text" name="username" placeholder="Username" />
              <label htmlFor="username">Username</label>
            </div>
            <div>
              <input type="password" name="password" placeholder="Password" />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
      } />
    </div>
  </Router>
);
```

Let's go back to the browser and manually type in the url locations for `/, /about & /login`. Do you see the rendered h1 tags for the `/` and `/about` urls? What about the form when you go to `/login`? 

Just to recap what we have done so far: We imported the `react-router-dom` node module into our `index.js` with the __BrowserRouter as Router__ & the __Route__ components. After importing these into the file we returned the __Router__ component as the top level tag in our __JSX__ return statement with a proceding __div__ tag that contained our 3 children route components. Each route is doing 3 things right now:
  - setting a path `path="/about"
  - passing a arrow function inside of a `render` prop to render some __JSX__
  - setting an attribute of exact, which explicitly states that you will only see the rendered JSX if you go to `/about` not `/about/something_else`. 

We have made great progress, but this doesn't seem like it is managable long term. What if we have 20 routes, do we render the __JSX__ inline for each __Route__? We should fix that. 

#### Components as Props 

In the above step we just used the `render` prop to invoke some __JSX__ code to be rendered. This is great for small simple apps, but we want our code to be reusable and less britle. Let's move this code into small components and inject them into the `render` prop. 

```javascript 
// ./src/index.js 

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Login = () => 
  <div>
    <h1>Login</h1>
    <form>
      <div>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="username">Username</label>
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" />
        <label htmlFor="password">Password</label>
      </div>
      <input type="submit" value="Login" />
    </form>
  </div>;

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" render={Home} />
        <Route exact path="/about" render={About} />
        <Route exact path="/login" render={Login} />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
```

After you're finished, refresh the browser and verify that it is still working. So before we congratulate ourselves yet go take a look at the __Route__ component documentation and see if there is a prop that is better suited for this. 

https://reacttraining.com/react-router/web/api/Route

Yep, that is right! The __Route__ component API has a prop called `component`. This is more declarative and it also uses the `React.createElement` instead of inline __JSX__ injection. We should change our code to use this now. 

```javascript 
<Router>
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/login" component={Login} />
  </div>
</Router>
```

You can verify that everything is working as it should, in the browser. 

So now we have a __Router__ component with __Routes__ that invoke components. What are we missing?

#### NavLinks 

What good are routes, if users don't know how to find them or what they are? 

The React Router API comes with two options of adding in Links: __\<Link>__ and __\<NavLink>__. They both have the same base level functionality that will update the browser url and render the __Route__ component, but __\<NavLink>__ comes with some additional features that are great for navbars like: 
  - __activeClassName__ for when a link is active and you want additional styling using html classes.
  - __activeStyle__ if you want to do inline styling.
  - __isActive__ if you want to add aditional logic to your application to state which link is currently active. This prop can invoke a function call. `isActive={() => doSomething}`

There are some additional attributes too, but those are the 3 to get comfortable with. 

So now that we know what component to use let's add them into our application. 

```javascript 
import React from 'react';
import ReactDOM from 'react-dom';
/* Add NavLink to importer */
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

/* Add basic styling for NavLinks */
const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

/* add the navbar component */
const Navbar = () => 
  <div>
    <NavLink 
      to="/"
      /* set exact so it knows only to only set activeStyle when route is deeply equal to link */
      exact
      /* add styling to Navlink */
      style={link}
      /* add prop for activeStyle */
      activeStyle={{
        background: 'darkblue'
      }}
    >Home</NavLink>
    <NavLink 
      to="/about"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >About</NavLink>
    <NavLink 
      to="/login"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
    >Login</NavLink>
  </div>;

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Login = () => 
  <form>
    <h1>Login</h1>
    <div>
      <input type="text" name="username" placeholder="Username" />
      <label htmlFor="username">Username</label>
    </div>
    <div>
      <input type="password" name="password" placeholder="Password" />
      <label htmlFor="password">Password</label>
    </div>
    <input type="submit" value="Login" />
  </form>;

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" render={Home} />
        <Route exact path="/about" render={About} />
        <Route exact path="/login" render={Login} />
      </div>
    </Router>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);
```

Load up the browser again and you should see beautiful blue navlinks that load up the desired component. To get more comfortable, I would recommend implementing `/signup` and `/messages` routes that load in compnents, also make sure to add in some __NavLinks__.

## Resources
* [React Router Tutorial](https://reacttraining.com/react-router/web/example/basic)

<p class='util--hide'>View <a href='https://learn.co/lessons/react-components-as-routes'>React Components As Routes</a> on Learn.co and start learning to code for free.</p>
