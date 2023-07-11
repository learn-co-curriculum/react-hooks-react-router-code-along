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
soils view with a URL at `www.loveforsoils.com/favorites`. Enter **React
Router**: a routing library for **React** that allows us to link to specific
URLs and conditionally render components depending on which URL is displayed.

React Router is a collection of navigational components and custom hooks that
are implemented using declarative programming and [compose with][composition]
the components in your application. Whether you want to have bookmark-able URLs
for your web app, or a composable way to navigate in React Native, React Router
works wherever React is rendering — so take your pick!

[composition]: https://reactjs.org/docs/composition-vs-inheritance.html

To demonstrate some of the key features of React Router, we have an exercise to
code along with, so let's get going!

## Code Along

### Setting up our Main Route

To get started, clone down this repo and run `npm install`.

If you open up `src/index.js`, you will see that currently we are currently
rendering our `Home` component, which will serve as the homepage of our
application.

```jsx
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />)
```

To start using React Router, we need to install `react-router-dom`:

```console
$ npm install react-router-dom@6
```

> **Note**: make sure to include `@6` at the end of the install command. This
> walkthrough is designed for version 6 - other versions may have different
> syntax.

To start implementing routes, we first need to import `createBrowserRouter` and
`RouterProvider` from `react-router-dom`:

```jsx
// .src/index.js

import React from "react";
import ReactDOM from "react-dom";
// Step 1. Import react-router functions
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />)
```

In the code above, there are two pieces of functionality that we're importing
from **React Router**. We use them in turn:

1. The `createBrowserRouter` is used to create the router for our application.
   We'll pass it an array of route objects as its argument. Each route object
   will have a routing path and a corresponding element that will be rendered on
   that path.
2. The `RouterProvider` provides the router created by `createBrowserRouter` to
   our application, so it can use React-Router's client-side routing.

Let's try it! Copy the code below into `src/index.js` and run `npm start` to
boot up the application. Once it is running, point your URL to
`http://localhost:3000/`. It should render `Home!`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />)
```

### Adding Additional Routes

In the last two steps, we learned how to set up our router using
`createBrowserRouter` and `RouterProvider` and add our very first route.

Next, we want to set up routing for an `About` and `Login` page.

First, we'll make two new components within our `pages` directory.

About.js:

```jsx
function About() {
  return (
    <>
      <main>
        <h1>This is my about component!</h1>
      </main>
    </>
  );
};

export default About;
```

Login.js:

```jsx
function Login() {
  return (
    <>
      <main>
        <h1>Login</h1>
        <form>
          <div>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </main>
    </>
  );
};

export default Login;
```

Next, we'll import our new pages into our `index.js` file, and add them as
routes within `createBrowserRouter`:

```jsx
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, 
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/login",
    element: <Login />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />)

```

If you go back to the browser you will see that it looks the same — our `Home`
component is displaying as before. Now try manually typing in the URL locations
for `/`, `/about`, and `/login`. You should see these new components rendering!

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

Let's create a new `NavBar` component in the `components` folder to add these
`NavLink`s to our application.

NavBar.js:

```jsx
import React from "react";
import ReactDOM from "react-dom";
/* Add NavLink to import */
import { NavLink} from "react-router-dom";

/* Add basic styling for NavLinks */
const linkStyles = {
  display: "inline-block",
  width: "50px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

/* define the NavBar component */
function NavBar() {
  return (
    <nav>
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
    </nav>
  );
}

export default NavBar;
```

You can then place your NavBar component in each of your page components to
enable easy navigation between different pages in your application!

(Does this seem inefficient? Not very DRY? Don't worry - we'll look at a more
efficient way to include a NavBar throughout your app in future lessons!)

Load up the browser again and you should see beautiful blue NavLinks that load
up the desired component.

For more practice, implement `/signup` and `/messages` routes, NavLinks and
components.

### Error Handling

Ok great, we've got most of the basic functionality for client-side routing
down! But what if somebody enters a route that doesn't exist. Try entering
`http://localhost:3000/florp` into your browser. Yikes! That's an ugly looking
error page!

Let's create one more page in our application - ErrorPage.js.

Create this new component within our `pages` folder, then add the following
code:

```jsx
import Navbar from "../components/Navbar"
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Whoops! Something went wrong!</h1>
      </main>
    </>
  )
}

```

Note that we're importing the `useRouteError` hook in addition to our `NavBar`
component. The `useRouteError` hook allows us to interact with the error itself,
including the error status and it's message. You can read more about it
[here](https://reactrouter.com/en/main/hooks/use-route-error).

Now that we have that, we can add this ErrorPage to each of our routes using the
`errorElement` field within our route objects:

```jsx
// index.js
// ... other import statements
import ErrorPage from "./pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }, 
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  }
])

// ...render statements

```

The `errorElement` can handle more than just bad urls - it will redirect your
app toward the provided Error component should any error occur within your main
UI component! For that reason, we'll want to make sure each of our routes has an
appropriate `errorElement`.

>**Note** If your page generates an Error during development, you will still see
>the React Error Overlay over your page, even with the errorElement included.
>You can see the errorElement by closing the Error Overlay.

## Conclusion

You've now seen all the core functionality of React Router required for
client-side routing! We've met the requirements so that our app can:

- Conditionally render a different component based on the URL (using
  `createBrowserRouter` and `RouterProvider`)
- Change the URL using JavaScript, without making a GET request and reloading
  the HTML document (using the `<Link>` or `<NavLink>` components)

In the coming lessons, we'll explore more of the advanced functionality provided
by React Router. You are also strongly encouraged to look at the [React Router
docs][react router docs], and in particular at the examples section, to get more
ideas on how to use React Router to build common features in your own
applications.

## Resources

- [React Router docs][react router docs]

[react router docs]: https://v5.reactrouter.com/web/guides/quick-start
[soils]: https://en.wikipedia.org/wiki/Soil_type
