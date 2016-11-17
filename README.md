# Introduction to React Router
## Objectives

1. Describe React Router's approach to client-side routing
2. Explain how React Router allows building a route tree as a component
3. Describe how routes are matched in React Router

### React Router

React Router is the go to routing library for __React__. It isn't the only library, but it is the most commonly accepted and supported.

React Routers documentation states:

> React Router is a complete routing library for React.
React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.

This is what React Router does best, it abstracts away the complex logic and makes your routing declarative (like React). This opens up your ability to create more intuitive applications with React.

For this README we will be building our first Component routes as a Code Along

### Code Along

#### Step 1: Setting up our Main Route

*Note*
Make sure you clone down this repo and run `npm install`.
To Run `npm start` to run the code and open http://localhost:8080 in the browser.

Like most things in React, React Router is a component.

Just as we would load other components into our app we will do the same with __React Router__. We will then render our two components using the component tree architecture of React. The parent Component(`Router`) and the children components(`Routes`).

```JavaScript
//
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

const App = () => {
    return (
        <div><h1>First Route</h1></div>
    )
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
    </Router>
), document.getElementById('container'))
```

The above code is Rendering the main `Router` component, as well as the `Route` component. You will notice that the `Route` is taking in two props: `path` and `component`. The `path` is going to be the URL that you want this to route to be defined as and the `component` will be the component that this route loads.

Lets open up the browser and go to http://localhost:3000.

You should see an `<h1>` tag with `First Route`, but you might be wondering why you see a ugly string after the `/#/`. Well if you remember we imported the module __hashHistory__ from React Router, and injected it into a prop for history. This is a module that handles the the routing history. It stores the hash portion of the url so that it can emulate the same behavior that you get from a browser natively when you use URLs. This allows us access to a stored state of history so that if you refresh the page it takes you to the same route and not to the `'/'` every time.

#### Step 2: Adding More Routes

Since we have established a Route is a component we will need to make more components to display more routes.

Let's make two components: __Hobbies__ and __FavoriteMovies__

```JavaScript
//...
const Hobbies = () => {
    return (
        <div>
            <h1>Hobbies</h1>
            <ul>
                <li>Hiking</li>
                <li>Video Games</li>
                <li>Soccer</li>
                <li>Coding React</li>
            </ul>
        </div>
    )
}

const FavoriteMovies = () => {
    return (
        <div>
            <h1>Favorite Movies</h1>
            <ul>
                <li>War Games</li>
                <li>Finding Dory</li>
                <li>Jurassic Park</li>
                <li>Lost in the Translation</li>
            </ul>
        </div>
    )
}
```

Now we need to actually let the `Router` Component know about the two new children components it just adopted.

```JavaScript
render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        {/* our new routes */}
        <Route path="/hobbies" component={Hobbies} />
        <Route path="/favoriteMovies" component={FavoriteMovies} />
    </Router>
), document.getElementById('container'))
```

Now if you go back to the browser and type in the following URLs

* http://localhost:8080/#/hobbies
* http://localhost:8080/#/favoriteMovies

You should see your list of hobbies or favoriteMovies.

Pretty cool right?

#### Step 3: Linking our URLs

We have now successfully created 3 routes

```
/
/hobbies
/favoriteMovies
```

But how do we create links?

Well now it is time to introduce a new React Router module to our team, __Link__. __Link__ is a component that takes in a propType of `to`. This propType of `to` is where we name a route that matches what we have in our Route component. For example, if we have `<Route path="/favoriteMovies" />` then we would have a corresponding __Link__ component `<Link to="/favoriteMovies">Movies</Link>`. Lets go ahead and create a basic NavBar Component for our application.

```javascript
// src/index.js

// ...

import { Router, Route, hashHistory } from 'react-router'

//...

const App = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <NavBar />
        </div>
    )
}

const NavBar = () => {
    return (
        <div>
            <ul role="nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/favoriteMovies">Favorite Movies</Link></li>
                <li><Link to="/hobbies">Hobbies</Link></li>
            </ul>
        </div>
    )
}
```

So if we load up http://localhost:3000 we should now see our links. Click on a link and see what happens.

So we solved 1 problem (we now have links), but what happens to our NavBar? ......

#### Step 4: IndexRoute

So lets analyze this. We have 3 routesj

```
/
/hobbies
/favoriteMovies
```

but we want the NavBar to stay active while we perusing the different links. For this problem to be solved we need to import another module from React Router (`IndexRoute`).

__IndexRoute__ just takes in an argument of a component, and displays the component when we are at the `'/'` route. We do need to change the architecture of our component tree though. Lets create a new component called Main that will be our home page and then edit our routes to follow this new configuration. We will also be adding a ``{props.children}`` below our NavBar component that will render the children components of App.

```JavaScript
// src/index.js

import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router'

const App = (props) => {
    return (
        <div>
            <NavBar />
            {/* render the components of our routes below*/}
            {props.children}
        </div>
    )
}

// ...

const Main = () => {
    return (
        <div>
            <h1>Main Page</h1>
        </div>
    )
}

// ...

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            {/* add our new Index Route and original Routes below as children of our '/' route*/}
            <IndexRoute component={Main} />
            {/* our original routes */}
            <Route path="/hobbies" component={Hobbies} />
            <Route path="/favoriteMovies" component={FavoriteMovies} />
        </Route>
    </Router>
), document.getElementById('container'))
```

Now if we return to http://localhost:3000 we should have an static NavBar.


## Resources

* [React Router Tutorial](https://github.com/reactjs/react-router-tutorial)
