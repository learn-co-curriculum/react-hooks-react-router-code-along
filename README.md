# React Router Code-Along

## Learning Goals

- Add `react-router-dom` to an existing React application
- Create multiple client-side routes

## Introduction

So far, we have been building our applications without any navigation, so
everything in the app has lived at the same URL. Currently, we can make it look
like we are changing the page based on state by showing or hiding some
components, but none of these changes are dependent on a change in the URL.

Now this may seem like a small quibble, but web addresses are the backbone of
the Internet. The web is just a series of links to other pages, after all.

Let's imagine that we have a React application hosted at `www.loveforsoils.com`
(not a real website) dedicated to sharing knowledge about [soil types][soils].
As a facet of our React application, we want to provide users with the option to
see a list of our favorite soils. Currently, instead of sharing a link to a list
of our favorite soils, we can only provide a link to our "Love for soils"
homepage. Following which, users are required to interact with our application
to see a favorite soil list.

Because our personal opinion on the best soils is so important, we want to
provide users with the opportunity to go straight to this list of the favorite
soils view with a URL. Enter **React Router**: a routing library for **React**
that allows us to link to specific URLs and conditionally render components
depending on which URL is displayed.

React Router is a collection of navigational components and custom hooks that
are implemented using declarative programming and [compose with][composition]
the components in your application. Whether you want to have bookmark-able URLs
for your web app, or a composable way to navigate in React Native, React Router
works wherever React is rendering — so take your pick!

[composition]: https://reactgraphql.academy/react/react-is-all-about-composition-react-hooks-render-props-hocs/

To demonstrate some of the key features of React Router, we have an exercise
to code along with, so let's get going!

## Code Along

### Setting up our Main Route

To get started, clone down this repo and run `npm install`.

If you open up `src/index.js`, you will see that currently we are defining
a `Home` component, and then rendering that component in the DOM.

```jsx
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";

function Home() {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}

ReactDOM.render(<Home />, document.getElementById("root"));
```

To start using React Router, we need to install `react-router-dom`:

```console
$ npm install react-router-dom
```

To start implementing routes, we first need to import `BrowserRouter` and
`Route` from `react-router-dom`:

```jsx
// .src/index.js

import React from "react";
import ReactDOM from "react-dom";
// Step 1. Import react-router functions
import { BrowserRouter, Route } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}

// Step 2. Changed to have router coordinate what is displayed
ReactDOM.render(
  <BrowserRouter>
    <Route path="/">
      <Home />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
```

In the code above, there are two components that we are importing from **React
Router**. We use them in turn:

1. The `BrowserRouter` component is the base for our application's routing. It
   is where we declare how **React Router** will be used. Notice that nested
   inside the `BrowserRouter` component we use the `Route` component. The
   `Route` component has one prop in our example: `path`.
2. The `Route` component is in charge of saying: "when the URL matches this
   specified `path`, render this child component." This handles the conditional
   rendering based on the URL that we described earlier.

Let's try it. Copy the above code into `src/index.js` and run `npm start` to
boot up the application. Once it is running, point your URL to
`http://localhost:3000/`. What you'll notice is that when you type in the URL it
will render `Home!`.

### Adding Additional Routes

In the last two steps, we learned how to set up the basic `BrowserRouter`
component and inject our very first `Route` component.

Next, we want to add components for `About` and `Login`:

```javascript
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>This is my about component!</h1>
    </div>
  );
}

function Login() {
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
}
```

Now let's add our `/about` and `/login` routes to our router:

```javascript
// ./src/index.js

ReactDOM.render(
  <BrowserRouter>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);
```

If you go back to the browser you will see that it looks the same — our `Home`
component is displaying as before. Now try manually typing in the URL locations
for `/`, `/about`, and `/login`. Do you see the other components rendering?

You may have noticed the strange behavior of the `Home` component. It is always
rendering, no matter which route we go to! Even if we type in nonsense following
the `/`, we still get the `Home` component.

If we had a header component we wanted to be displayed no matter which route was
hit, this behavior would be desirable. Otherwise, there are several ways to fix
this. One way to give more predictable behavior to our Routes is to use the
`Switch` component:

```jsx
// ./src/index.js
import { BrowserRouter, Route, Switch } from 'react-router-dom';

...

ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById('root')
);
```

Now, instead of rendering **all** routes that match the current URL, it will
only render the **first** route that matches. Currently, we'll always be
rendering the `Home` component. We can fix this by moving the route for `/` to
the bottom of our `Switch` component:

```jsx
ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById("root")
);
```

Try it out again! Go to `/about` and you'll **only** see the `About` component
being displayed.

There's one other prop we can use on our routes to give more control over
whether that route will match the given url: `exact`. First, to demonstrate the
issue, try visiting a URL that isn't covered by any of our routes, like `/wat`.
We'll still see our `Home` component being displayed, because `/` is a _partial
match_ for `/wat`.

To fix this, try adding `exact` to the Route component rendering our `Home`
component:

```jsx
<Route exact path="/">
  <Home />
</Route>
```

Now, `Home` will only display when the URL is **exactly** `/`.

> The `exact` prop looks a bit different from our other props — where's
> the `=`? This syntax is short for `exact={true}`! You'll see the same syntax
> used in HTML for boolean attributes: if the attribute is present, it's `true`,
> if it's absent, it's `false`.

### Recap

- We imported the `BrowserRouter` and the `Route` components from the
  `react-router-dom` package into our `index.js` file

- We wrapped `BrowserRouter` around the top level component in our React
  application

- We defined three possible routes, each of which is doing the following:
  - defining what URLs to match on
  - defining what component should be rendered, should a match return true
  - for our `/` route, setting a prop of `exact`, which ensures that you will
    only see the component if you go to the exact path.

We have made great progress so far!

Now that we have the tools to enable routing, let's look into how we can enable
users to trigger our `Route`s without requiring a manual change of the address
bar.

### Links and NavLinks

What good are routes if users don't know how to find them or what they are?

React Router provides two components that enable us to trigger our routing:
`Link` and `NavLink`. They both have the same base level functionality:

- They render an `<a>` tag to the DOM
- When the `<a>` tag is clicked, they change the URL and tell React Router to
  re-render our routes, displaying the component that matches the new URL

`NavLink` acts as a superset of `Link`, adding **styling attributes** to a
rendered element **when it matches the current URL**. `NavLink` works well for
creating a navigation bar, since it allows us to add styling to indicate which
link is currently selected. `Link` is a good option for creating standard
hyperlinks. For this example, we will be using `NavLink`; we will see examples
of using `Link` in later lessons.

Let's work on adding in the `NavLink` component to our application:

```jsx
import React from "react";
import ReactDOM from "react-dom";
/* Add NavLink to import */
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

/* Add basic styling for NavLinks */
const linkStyles = {
  width: "100px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

/* define the Navbar component */
function Navbar() {
  return (
    <div>
      <NavLink
        to="/"
        /* set exact so it knows to only set activeStyle when route is deeply equal to link */
        exact
        /* add styling to Navlink */
        style={linkStyles}
        /* add prop for activeStyle */
        activeStyle={{
          background: "darkblue",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Login
      </NavLink>
    </div>
  );
}

function Home() {
  return <h1>Home!</h1>;
}

function About() {
  return <h1>This is my about component!</h1>;
}

function Login() {
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

/* add the NavBar component to our render method */
ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById("root")
);
```

Load up the browser again and you should see beautiful blue NavLinks that load
up the desired component. For more practice, implement `/signup` and `/messages`
routes, NavLinks and components.

### Refactoring

In anticipation of a growing codebase, let's refactor by removing the components
we defined in `index.js` and placing them in their own files in
`src/components`. You can also see the completed version of this code in the
solution branch.

```jsx
// src/components/Home.js
import React from "react";

function Home() {
  return <h1>Home!</h1>;
}

export default Home;
```

```jsx
// src/components/About.js
import React from "react";

function About() {
  return <h1>This is my about component!</h1>;
}

export default About;
```

```jsx
// src/components/Login.js
import React from "react";

function Login() {
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

export default Login;
```

```jsx
// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  width: "100px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

function Navbar() {
  return (
    <div>
      <NavLink
        to="/"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        About
      </NavLink>
      <NavLink
        to="/login"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Login
      </NavLink>
    </div>
  );
}

export default Navbar;
```

```jsx
// src/components/App.js
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Navbar from "./Navbar";

function App() {
  return (
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
  );
}

export default App;
```

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

## Conclusion

You've now seen all the core functionality of React Router required for
client-side routing! We've met the requirements so that our app can:

- Conditionally render a different component based on the URL (using the `<Route>` and `<Switch>` components)
- Change the URL using JavaScript, without making a GET request and reloading
  the HTML document (using the `<Link>` or `<NavLink>` components)

In the coming lessons, we'll explore more of the advanced functionality provided
by React Router. You are also strongly encouraged to look at the
[React Router docs][react router docs], and in particular at the examples
section, to get more ideas on how to use React Router to build common features
in your own applications.

## Resources

- [React Router docs][react router docs]

[react router docs]: https://reactrouter.com/web/guides/quick-start
[soils]: https://en.wikipedia.org/wiki/Soil_type
