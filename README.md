# Introduction to React Router

## Objectives

1. Describe **React Router's** approach to client-side routing
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
soils view with a URL. Enter **React Router**: a routing library for **React**
that allows us to link to specific URLs then show or hide various components
depending on which URL is displayed. As React Router's documentation states:

> Components are the heart of React's powerful, declarative programming model.

React Router is a collection of navigational components that compose
declaratively with your application. Whether you want to have bookmark-able URLs
for your web app or a composable way to navigate in React Native, React Router
works wherever React is rendering--so take your pick!

We will be building our first Component routes as a code along.

## Code Along

### Setting up our Main Route

*Note*: Make sure you clone down this repo, run `npm install && npm start`, and
open `http://localhost:3000` in the browser.

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

To start implementing routes, we first need to import `BrowserRouter` and
`Route` from `react-router-dom`. `BrowserRouter` is commonly renamed as
`Router`, so we'll follow this convention, as well. We can create an _alias_
with the syntax `BrowserRouter as Router`. So every time we refer to `Router` in
this file, we are really just referring to `BrowserRouter`.

```js
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
ReactDOM.render(
  <Router>
    <Route path="/">
      <Home />
    </Route>
  </Router>,
  document.getElementById('root')
);
```

Step 1: In Step 1 above, there are two components that we are importing from
**React Router**. We use them in turn.

Step 2: The `Router` (our alias for BrowserRouter) component is the base for our
application's routing. It is where we declare how **React Router** will be used.
Notice that nested inside the `Router` component we use the `Route` component.
The `Route` component has one props in our example: `path`. The `Route`
component is in charge of saying: "when the URL matches this specified `path`,
render this child component".

Let's try it. Copy the above code into `src/index.js` and run `npm start` to
boot up the application. Once it is running, point your URL to
`http://localhost:3000/`. What you'll notice is that when you type in the URL it
will render `Home!`.

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

ReactDOM.render(
  <Router>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </Router>,
  document.getElementById('root')
);
```

Let's go back to the browser and verify that our application is back to
functioning. We see that our `Home` component is displaying. Try manually
typing in the URL locations for `/`, `/about`, and `/login`. Do you see the
other components rendering?

You may have noticed the strange behavior of the `Home` component. It is always
rendering, no matter which route we go to! Even if we type in nonsense following
the `/`, we still get the `Home` component.

Imagine we had a header we wanted displayed no matter which route was hit. In
that case, this behavior is desirable! Otherwise, there are several ways to fix
this. One way to give more predictable behavior to our Routes is to use the
`Switch` component:


```js
// ./src/index.js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

...

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
```

Now, instead of rendering **all** routes that match the current URL, it will only render the **first** route that matches. Currently, we'll always be rendering the Home component. We can fix this by moving the route for `/` to the bottom of our Switch component:

```js
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
```

Try it out again! Go to `/about` and you'll **only** see the `About` component being displayed.

There's one other prop we can use on our routes to give more control over whether that route will match the given url: `exact`. First, to demonstrate the issue, try visiting a URL that isn't covered by any of our routes, like `/wat`. We'll still see our `Home` component being displayed, because `/` is a _partial match_ for `/`.

To fix this, try adding `exact` to the Route component rendering our `Home` component:

```js
<Route exact path="/">
  <Home />
</Route>
```

Now, `Home` will only display when the URL is **exactly** `/`.

> The `exact` prop looks a bit different from our other props &mdash; where's
> the `=`? This syntax is short for `exact={true}`! You'll see the same syntax
> used in HTML for boolean attributes: if the attribute is present, it's `true`,
> if it's absent, it's `false`.

### Recap

- We imported the `react-router-dom` node module into our `index.js` with the
`BrowserRouter` as `Router` and the `Route` components

- We returned `Router` as the top level component in our React application

- We defined three possible routes, each of which is doing the following:
  - defining what URLs to match on
  - defining what component should be rendered, should a match return true
  - setting an attribute of exact, which explicitly states that you will only
    see the component if you go to the exact path.

We have made great progress so far!

Now that we have the tools to enable routing, let's look into how we can enable
users to trigger our `Route`s without requiring a manual change of the address
bar.

### Links and NavLinks

What good are routes, if users don't know how to find them or what they are?

The React Router API provides two components that enable us to trigger our
routing: `Link` and `NavLink`. They both have the same base level functionality:
they update the browser URL and render the `Route` component. `NavLink` acts as
a superset of `Link`, adding styling attributes to a rendered element when it
matches the current URL.

Let's work on adding in the `NavLink` component to our application:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
/* Add NavLink to importer */
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

/* Add basic styling for NavLinks */
const linkStyles = {
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
      style={linkStyles}
      /* add prop for activeStyle */
      activeStyle={{
        background: 'darkblue'
      }}
    >Home</NavLink>
    <NavLink
      to="/about"
      exact
      style={linkStyles}
      activeStyle={{
        background: 'darkblue'
      }}
    >About</NavLink>
    <NavLink
      to="/login"
      exact
      style={linkStyles}
      activeStyle={{
        background: 'darkblue'
      }}
    >Login</NavLink>
  </div>;

const Home = () => <h1>Home!</h1>;

const About = () => <h1>This is my about component!</h1>;

const Login = () => (
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

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
```

Load up the browser again and you should see beautiful blue NavLinks that load
up the desired component. For more practice, implement `/signup` and `/messages`
routes/NavLinks that load in components.

## Refactoring

In anticipation of a growing codebase, let's refactor by removing the components
we defined in `index.js` and placing them in their own files in `src/components`.

```js
// src/components/Home.js
import React from 'react';

const Home = () => <h1>Home!</h1>;

export default Home;
```

```js
// src/components/About.js
import React from 'react';

const About = () => <h1>This is my about component!</h1>;

export default About;
```

```js
// src/components/Login.js
import React from 'react';

const Login = () => (
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

export default Login;
```

```js
// src/components/Navbar.js
import React from 'react'
import { NavLink } from 'react-router-dom';

const linkStyles = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const NavBar = () => (
  <div>
    <NavLink
      to="/"
      /* set exact so it knows to only set activeStyle when route is deeply equal to link */
      exact
      /* add styling to Navlink */
      style={linkStyles}
      /* add prop for activeStyle */
      activeStyle={{
        background: 'darkblue'
      }}
    >Home</NavLink>
    <NavLink
      to="/about"
      exact
      style={linkStyles}
      activeStyle={{
        background: 'darkblue'
      }}
    >About</NavLink>
    <NavLink
      to="/login"
      exact
      style={linkStyles}
      activeStyle={{
        background: 'darkblue'
      }}
    >Login</NavLink>
  </div>
);

export default Navbar;
```

```js
// src/components/App.js
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home'
import About from './About'
import Login from './Login'
import Navbar from './Navbar'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </div>
)

export default App
```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

## Resources

* [React Router Tutorial](https://reacttraining.com/react-router/web/example/basic)

[route_docs]: https://reacttraining.com/react-router/web/api/Route
[soils]: https://en.wikipedia.org/wiki/Soil_type
