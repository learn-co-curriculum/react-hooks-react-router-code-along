# Introduction to React Router

## Objectives

1. Describe __React Router's__ approach to client-side routing
2. Explain how React Router allows building a route tree as a component
3. Describe how routes are matched in React Router

## A complicated world needs an address

So far, we have been building our applications without any navigation, so
everything in the app has lived at the same URL. Currently, we can make it look
like we are changing the page, by showing or hiding some components, but none of
these changes are dependent on a change in the URL.

Now this may seem like a small quibble, but web addresses are the backbone of
the Internet. The web is just a series of links to other pages, after all. Let's
imagine that we have a React application hosted at `www.loveforsoils.com` (not a
real website) dedicated to sharing knowledge about [soil types][soils]. As a
facet of our React application, we want to provide users with the option to see
a list of our favorite soils. Currently, instead of sharing a link to a list of
our favorite soils, we can only provide a link to our "Love for soils" homepage.
Following which, users are required to interact with our application to see a
favorite soil list.

Because our personal opinion on the best soils is so important, we want to
provide users with the opportunity to go straight to this list of the favorite
soils view with a URL. Enter __React Router__: a routing library for __React__
that allows us to link to specific URLs then show or hide various components
depending on which URL is displayed. As React Router's documentation states:

> Components are the heart of React's powerful, declarative programming model.
React Router is a collection of navigational components that compose
declaratively with your application. Whether you want to have bookmarkable URLs
for your web app or a composable way to navigate in React Native, React Router
works wherever React is rendering--so take your pick!

For this README we will be building our first Component routes as a code along.

## Code Along

### Setting up our Main Route

*Note*: Make sure you clone down this repo, run `npm install && npm start`, and open
`http://localhost:3000` in the browser.

If you open up `src/index.js`, you will see that currently we are defining
a `Home` component, and then rendering that component in the DOM.  

```javascript
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
};

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
```

With React Router our core routing will live in this component. We will define
our various routes within this file. To start using routes, we need to install
`react-router-dom`:

```sh
npm install react-router-dom
```

To start implementing routes, we first need to import `BrowserRouter` and `Route` from
`react-router-dom`. `BrowserRouter` is commonly renamed as `Router`, so we'll follow this
convention, as well. We can create an _alias_ with the syntax `BrowserRouter as Router`. 
So every time we refer to `Router` in this file, we are really just refering to `BrowserRouter`.

```javascript
// .src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
// Step 1. Import react-router functions
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
};

// Step 2. Changed to have router coordinate what is displayed
ReactDOM.render((
  <Router>
    <Route path="/" component={Home} />
  </Router>),
  document.getElementById('root')
);
```

Step 1: In Step 1 above, there are two components that we are importing from __React
Router__. We use them in turn.

Step 2: The `Router` (our alias for BrowserRouter) component is the base for
our application's routing. It is where we declare how __React Router__ will be
used. Notice that nested inside the `Router` component we use the `Route`
component. The `Route` component has two props in our example: `path`
and `component`. The `Route` component is in charge of saying: "when the URL
matches this specified `path`, render this specified `component`".

Let's try it. Copy the above code into `src/index.js` and run `npm start` to
boot up the application. Once it is running, point your URL to `http://localhost:3000/`.
What you'll notice is that when you type in the URL it will render a
`<div><h1>Home!</h1></div>`.

### Adding Additional Routes

In the last two steps, we learned how to set up the basic `Router` component
and inject our very first `Route` component.

Next, we want to add components for `About` and `Login`:

```javascript
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>This is my about component!</h1>
    </div>
  );
};

const Login = () => {
  return (
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
  );
};
```

Now let's add our `/about` and `/login` routes to our router:

```javascript
// ./src/index.js

ReactDOM.render((
  <Router>
      <Route path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
  </Router>),
  document.getElementById('root')
);
```

Reload your browser and look at our beautiful routes...oops! Error:  

<span style='color:red'>A &lt;Router&gt; may have only one child element</span>

If you open up your browser dev tools console you should be seeing the same
error. What does this mean? Well, as you know in React, a component must return
one child/html node (which may wrap many others). We just gave `Router` three
children! To remedy this problem we can place all of the `Route` components
into a `<div>` tag:

```javascript
ReactDOM.render((
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>),
  document.getElementById('root')
);
```

Let's go back to the browser and verify that our application is back to
functioning. We see that our `Home` component is displaying. Try manually
typing in the URL locations for `/`, `/about`, and `/login`. Do you see the
other components rendering?

You may have noticed the aberrant behavior of the `Home` component. It is
always rendering, no matter which route we go to! Even if we type in nonsense
following the `/`, we still get the `Home` component.

Imagine we had a header we wanted displayed no matter which route was hit. In
that case, this behavior is desirable! Otherwise, there are several ways to fix
this. One way is to change our `Route` component for `Home` to `exact path`
instead of just `path`. 

```javascript
<Route exact path="/" component={Home} />
 ```

Try it now.

### Recap

* We imported the `react-router-dom` node module into our `index.js` with the
`BrowserRouter` as `Router` and the `Route` components

* We returned `Router` as the top level component in our React application

* We defined three possible routes, each of which is doing the following:
  * defining what URLs to match on
  * defining what component should be rendered, should a match return true
  * setting an attribute of exact, which explicitly states that you will only see
the rendered component if you go to `/about` not `/about/something_else` or
`/abo`.

We have made great progress so far!

### Using `render`

If we look closely at our `Route`s, we see that our 'components' being passed to
the `component` prop are merely functions defined above that return JSX. If we
preferred, we could instead use the `render` prop and write inline code directly
in our `Route`:

```javascript
<Route path="/" render={() => <h1>Home!</h1>} />
```

While this inline style may be useful for very simple renders, it becomes
unreasonable when we want to render larger, more complex components, but this 
shows that we can be pretty flexible in how we set up our `Route`s.

If you are interested in seeing the 'under the hood' differences between the
`render` and the `component` prop and when to use each take a moment to
familiarize yourself with the [__Route__ documentation][route_docs].

Now that we have the tools to enable routing, let's look into how we can enable
users to trigger our `Route`s without requiring a manual change of the address
bar.

### NavLinks

What good are routes, if users don't know how to find them or what they are?

The React Router API provides two components that enable us to trigger our
routing: `Link` and `NavLink`. They both have the same base level functionality:
they update the browser URL and render the `Route` component. `NavLink` acts 
as a superset of `Link`, adding styling attributes to a rendered element when 
it matches the current URL.

Let's work on adding in the `NavLink` component to our application:

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
      /* set exact so it knows to only set activeStyle when route is deeply equal to link */
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

const Home = () => <h1>Home!</h1>;

const About = () => <h1>This is my about component!</h1>;

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

ReactDOM.render((
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>),
  document.getElementById('root')
);
```

Load up the browser again and you should see beautiful blue navlinks that load
up the desired component. For more practice, implement `/signup` and `/messages`
routes/navlinks that load in components.

## Refactoring

In anticipation of a growing codebase, let's refactor by removing the components
we defined in `index.js` and placing them in their own files in `src/`.
Additionally, let's change them to classic class `React.Component`s, i.e.:

```javascript
// src/Home.js
import React from 'react';

class Home extends React.Component {
  render() {
    return <h1>Home!</h1>
  }
}

export default Home;
```

```js
// src/About.js
import React from 'react';

class About extends React.Component {
  render() {
    return <h1>This is my about component!</h1>;
  }
}

export default About;
```

```js
// src/Login.js
import React from 'react';

class Login extends React.Component {
  render() {
    return (
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
      </form>
    );
  }
}

export default Login;
```

```js
// src/Navbar.js
import React from 'react'
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <NavLink
          to="/"
          /* set exact so it knows to only set activeStyle when route is deeply equal to link */
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
      </div>
    )
  }
}

export default Navbar;
```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home'
import About from './About'
import Login from './Login'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render((
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>),
  document.getElementById('root')
);
```

## Resources

* [React Router Tutorial](https://reacttraining.com/react-router/web/example/basic)

[route_docs]: https://reacttraining.com/react-router/web/api/Route
[soils]: https://en.wikipedia.org/wiki/Soil_type

