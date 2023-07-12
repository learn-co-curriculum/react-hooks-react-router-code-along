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
code along with. We'll be making a _very_ simple social media app - let's dive
into it!

## Code Along

### Setting up our Main Route

To get started, clone down this repo and run `npm install`.

If you open up `src/index.js`, you will see that we are currently rendering our
`Home` component, which will serve as the homepage of our application. `Home` is
rendering a list of user cards displaying existing site users. The data for
users is being imported from our `data.js` file.

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
};

export default NavBar;
```

You can then place your NavBar component in each of your page components to
enable easy navigation between different pages in your application!

(Does this seem inefficient? Not very DRY? Don't worry - we'll look at a more
efficient way to include a NavBar throughout your app in future lessons!)

Load up the browser again and you should see beautiful blue NavLinks that load
up the desired components.

### Dynamic Routes and URL Params

Nice! We're making good progress! But in our social media app, we'll probably
want to see our user profiles. Let's create a new file in `pages` called
`UserProfile.js`. We'll be importing user data from our `data.js` file directly
into that component.

Here's a basic setup for that component:

```jsx
// UserProfile.js
import users from "../data.js";
import NavBar from "../components/Navbar";

function UserProfile() {
  return(
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>User Profile</h1>
      </main>
    </>
  );
};

export default UserProfile;
```

We can then add this new component to our router:

```jsx
// index.js
// ...other import statements
import UserProfile from "./pages/UserProfile";

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
  },
  {
    path: "/profile",
    element: <UserProfile />
  }
])

// ...render statements
```

Ideally, we want to navigate people to this page when they click on one of our
user cards displaying on our homepage.

Let's update our `UserCard` component to use a `Link` from `react-router-dom`:

```jsx
// UserCard.js
import {Link} from "react-router-dom"

function UserCard({id, name}) {
  return (
    <article>
        <h2>{name}</h2>
        <Link to="/profile">View profile</Link>
    </article>
  )
}

export default UserCard
```

Let's test it out! You should be able to click on one of those links and be
taken to our User Profile page.

Hang on - we're navigating successfully, but we're not showing any information
about a particular user. That won't work!

We still want to use our User Profile page to display information about a user.
But we want the _user information_ we're displaying to change.

This is where **Dynamic Routes** and **URL Parameters** come in - we can
actually use URL routes to pass data!

Let's go back and update our routes to start using dynamic routing and URL
parameters:

```jsx
// index.js
// ...import statements

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
  },
  {
    path: "/profile/:id",
    element: <UserProfile />
  }
])

// ...render statements
```

Notice that we added `:id` to the end of our `path` for our `UserProfile` route.
This notation creates a `URL parameter` - a segment of our URL that can change
and contains data that we'll want to use in our component.

By including a URL parameter (or multiple parameters) in a route, we make that
route _dynamic_ - this single route can actually have many different URLs! For
example, the `/profile/1`, `/profile/2`, and `/profile/3` URLs will all lead to
the same page. That page will just display different information depending on
which URL is used!

Let's update our `UserCard` component to start making use of our dynamic route:

```jsx
// UserCard.js
import {Link} from "react-router-dom"

function UserCard({id, name}) {
  return (
    <article>
        <h2>{name}</h2>
        <p>
          <Link to={`/profile/${id}`}>View profile</Link>
        </p>
    </article>
  )
}

export default UserCard
```

We've used string interpolation to update the `to` prop of our `Link` component
from `react-router-dom` to include the `id` of a user being rendered by a
particular `UserCard` component. Now, when we click on one of these links, it
will take us to the URL `/profile/<some-user-id>`, which will correspond with
the `/profile/:id` route we set up in our router.

Try it out! You should still see the `UserProfile` component being rendered as
it was before, but the URl should show the `id` of whichever user you clicked
on.

Great! But our `UserProfile` component still isn't displaying specific user
information.

That's where the last piece of the puzzle comes into play - the `useParams`
hook.

Let's start by importing that into the top of our `UserProfile` component:
`import { useParams } from 'react-router-dom'`.

From there, we can invoke the hook to access the parameters we included in our
URL route: `const params = useParams()`.

If we `console.log` our new `params` variable, we'll see that it's an object.
The keys in the object will be the parameters we defined in our route, and the
values will be whatever we actually entered into our URL.

If we click on `George Orwell's` card for example, our `params` object should
look like this:

```JavaScript
{
  id: "1"
}
```

We can now use the data contained in our params object to access the specific
piece of data we want to display!

```JavaScript
const user = users.find(user => user.id === parseInt(params.id))
```

(Note that we're using `parseInt` in this example - all data passed via URL
params will be a string!)

In applications where you're data will be contained in a `db.json` file or
database, you'll likely want to run a `fetch` request to grab the specific piece
of data you want from your database.

Now that we have a way to access the user we want, let's updated our UserProfile
component to display information about that user!

```jsx
// UserProfile.js
import users from "../data.js";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";

function UserProfile() {
  const params = useParams();

  const user = users.find(user => user.id === parseInt(params.id))

  return(
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>{user.name}</h1>
      </main>
    </>
  );
};

export default UserProfile;
```

With our component updated, we should now see the correct user displaying when
we navigate to a specific user's profile page! Nice!

>**Note**: You'll want to make sure you set up dynamic routes to work when
>somebody shares a URL to a dynamic endpoint,. There are a variety of ways to
>handle this to make sure your app doesn't break when somebody initially loads
>your app on a dynamic endpoint, rather than navigating to it internally. One
>way is to use `fetch` within the component to fetch all requisite data, as
>mentioned previously, but you might find other ways to handle it. Just remember
>that your solution should be legible, performant, and easy to maintain!

### Error Handling

Ok great, we've got most of the basic functionality for client-side routing
down! But what if somebody enters a route that doesn't exist? Try entering
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
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
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
>the React Error Overlay over your browser page, even with the errorElement
>included. You can see the errorElement by closing the Error Overlay.

### Separation of Concerns

By this point, everything should be functional (if it's not, try carefully
reviewing any errors you're receiving and double checking your code against the
example code). But, we could make some _organizational_ improvement. 

Take a look at our `index.js` file. It's getting pretty long and messy! Instead
of including all of this routing logic within our index.js file, let's
extrapolate some of it out into a separate file, `routes.js`. This file has
already been created for you, but you can create it yourself in future projects. 

Let's move our array of route objects into this `routes.js` file, and save it in
a variable called `routes`. We can then make our `routes` variable the default
export for the file. Don't forget to bring along all of this component import
statements as well!

```jsx
// routes.js
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import ErrorPage from "./pages/ErrorPage";

const routes = [
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
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
    errorElement: <ErrorPage />
  }
];

export default routes;
```

Now we just need to make sure we import our `routes` variable back into our
`index.js` file:

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.js";

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />)

```

There! Much cleaner! This will also make it easier to run tests on your routes,
as your routing configuration has been separated from the rendering logic of
your app. This is one of many reasons that separation of concerns is so widely
used and so helpful!

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
