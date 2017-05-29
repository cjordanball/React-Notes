# React Cheatsheet
[toc]

## Introduction
### Introduction to React

1. React is a framework for generating HTML content to the browser using javascript.

2. Later in this outline, we will cover in some detail the setup of the development environment. However, for now, we note that we will be using two apps in particular that will take our code and convert it into a usable form. **Babel** will take our **JSX** and **ES6** code and transpile it into plain Javascript that most every browser will recognize.  **Webpack** is an app that will take our source code, as well as our dependencies, and bundle them up into a single Javascript file. In addition, Webpack will direct the tasks of Babel and any other preprocessors to convert our code into a usable format.

3. In "traditional" React, the three basic ("Goodbye Cruel World") steps of creating a React component consisted of:

    a. creation of a React class, using React.createClass({}). This is basically the equivalent of creating a constructor function in javascript.

    b. creation of an instance of the class, using React.createElement().

    c. placement of a created instance into the DOM, using React.render().

4. These notes, however, will use a more modern (ES6) syntax and approach.

5. Braces {} are used in React to denote items that will be evaluated. For example, if an HTML element contained {this.props.num}, it would contain the value of the num key of the props object.

## JSX

### Introduction

1. The **key thing to remember** about **JSX** is that it is an extension of the Javascript language. It is **not** HTML, but allows us to write code that looks like HTML and allow very easy creation of HTML elements. that allows incorporation of html code into javascript.

2. Code can be written directly into the html file using the following tag:
    ```html
    <script type="text/jsx"> </script>
    ```

3. Note that JSX is not necessary to use React. React can be written all in native Javascript (and is transpiled into native javascript before going to the browser); however, it makes the writing less complex, particularly when elements are nested. Here is an example:
    ```javascript
    //in jsx
    const App = function() {
        return <div>Goodbye, Cruel World!</div>
    }
    //compiles to .js as
    App = function App() {
        return React.createElement('div', null, 'Goodbye, Cruel World!')
    }
    ```

### Things to Remember

1. In JSX, we can add classes to our components, but we must access them by the keyword **"className".** "Class" is used for referrg to the React classes.

2. In jsx, it is necessary to close all tags, so all tags must have a final \</tagname>, or self-close.

3. **Comments** can be interpolated into JSX as follows:
    ```javascript
    //Note the braces
    {/* this is a comment */}
    ```	
4. JSX does not support "if" statements very well, so ternary expressions are more frequently used.

5.  For styling, it is unnecessary to add "px" for pixel units.  If the number is given by itself, JSX will assume the px.

6. Babel has a command-line-interface tool, which can be installed by:
    ```
    sudo npm install babel-cli -g
    ```
    Once installed, a command such as the following will tell it what to do and where to send the resulting dist.js file:
    ```
    babel --presets react src.js -o dist.js --watch
    ```
    This will compile JSX into JavaScript, but leave ES6 alone.

## Starting With React
1. As noted, the job of React is to render HTML objects to the DOM. So, the place to start in constructing a React-based application is the file **index.html**, contained on our root directory. This will be a very bare-bones HTML page, but with two required pieces:

    a. a **\<script> tag** in the body pointing to the output webpack file (for example "\<script src="/bundle.js">\</script>.
    
    b. a \<div> tag that will serve as our **insertion point** for our components. We will have to identify this tag, so it is a good idea to give it an **id**, although a class can work just as well (even the tag type, if it is the only one).

2. Next, create a directory, **[project root]/src**. This will be where we place all of our written code.

3. Next, create a directory within the *src* directory named **coponents**. This will be where we keep all of our JSX components.

4. In the *src* directory, create a file named something along the lines of *app.js* or *index.js*. This will be our "entry" component, the one that is actually placed into our *index.html* page. All the other components in our project will get into the *index.html* page as components nested into this component.

## Components
1. A **component** is a collection of Javascript code that is used to produce some HTML. As discussed above, the JSX language is merely "syntactic sugar" covering up some laborious traditional javascript code that creates a component class, creates an instace of that class, and then places that instance into the DOM.

2. Beginning with React version 0.14.0, React components have been divided into **functional (stateless) components** and **class based components**.  Most components will be functional. The key in deciding which type of component to use is **whether the component will need access to state or lifecycle methods**. Note that even functional, "dummy" components have access to information passed into them through **props**, and will rerender every time its parent's state changes.

### Traditional Creation of React Components
#### React.createClass({ })

1. This takes a single parameter, a template object. This object must include a **render()** method, which must return a React component. For example:
    ```javascript
    var GCW = React.createClass({
        render: function() {
            return <div><h1>Goodbye, Cruel World!</hl></div>
        }
    });
    ```
    **NOTE**: Although this is more traditional javascript, it is still using JSX.


 
#### React.createElement()
1. Takes multiple parameters. The first is the name of the class from which the element is to be created (i.e., the value returned by the React.createClass({}) method); the second is an options object to hold props; after that come children components.

2. The options object contains values that can go into the new instance. For example, a button class may have a name value on the button, and a class name giving it a color. We would then pass in an options object along the lines of:
    ```javascript
    var options = {
        title: 'Alerts',
        class: 'red'
    }
    ```

3. The following creates and returns an instance of the class. A basic example would be:
    ```javascript
    var element = React.createElement(GCW, options);
    ```

4. The returned instance will have a props object as part of it, which will contain the properties passed in through the options. For example, we can refer to this.props.title in this case and it will have a value of "Alerts".

5. Of course, creating the instance of the class can be done much more simply by using the JSX tag:
    ```javascrupt
    <Element />
    ```

### Creating a Functional Component
1. The following is an example of a **functional component** in React.
    ```javascript
    import React from 'react';
    
    const App = (props) => (
        <div>
            <div>Goodbye, Cruel World!</div>
            <div>And goodbye to you, { props.name }</div>
        </div>
    );
    ```
    **NOTE**: Although we do not have any visible calls to React in the component, we still must import React. **The JSX \<div> tags are Javascript, not HTML**, and make no sense to the interpreter without React.  Essentially, the React dependency is being called upon behind the screen.
    
    **NOTE**: As will be discussed later, the function can take a single argument, the **props** object, which allows us to pass in information to the component.


### Creating a Class-Based Component
1. The following is a **class-based** component. The only requirement of such a component is that it have a **render()** method that returns some JSX, and that is all this bare-bones component is going to show below.  However, we should note that the whole point of a class-based component is to access the **state object**, so do not think this is a typical example; indeed, this component should be written as a functional component:
    ```javascript
    import React { Component } from 'react';
    
    class App extends Component {
        render() {
            return (
                <div>
                    <div>Goodbye, Cruel World</div>
                    <div>And goodbye to you, { this.props.name }</div>
                </div>
            );
        }
    }
    ```

### Rendering the Component
1. Now that we have created a component, it is time to insert, or render, it into our *index.html* page. Since React version 0.14.0, React has split away the functionality of inserting into the DOM into a separate package, **react-dom**. So, to get our component into the DOM, we will need to import this package with npm install, and then run its **render()** method, as follows:
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    //create our App component
    
    ReactDOM.render(<App />, document.querySelector('#root'));
    ```
    **NOTE**: There is some important sleight of hand going on here in the render method. The App component is our **class**.  Wrapping it into the \< /> tags is JSX for creating an instance of the class, so by putting App into the tags and placing it in the render method, we are creating *an instance* of the class, and then placing that instance in the element with the id "root".

2. This method takes two parameters. The first is the name of the element to be placed into the DOM, *i.e.*, the variable holding the value returned by the React.createElement() method. The second is the location of where to place the element.

### Nesting - Component Composition
1. Nesting is the application of the idea that one React component can be included as part (or child) of another React component. To do this, the child element is simply included in the parent element as a JSX tag. For example, imagine that there is a form, and inside the form there is a button, as shown below:
    ```javascript
    //in file src/components/app.js
    import React, { Component } from 'react';
    import Button from './button';
		
    class App extends Component {
        render(){
            return <Button />
        }
    };

    //in src/components/button.js
    const Button = () => (
        <button>Press</button>
    )
    
    export default Button
    ```
    a. an instance of the Button is created by the \<Button /> in the App *render()* method.

    b. properties of the button can be passed in to the \<Button /> as properties, or **props**. For example, we can pass in the button's text as follows:
    ```javascript
    import React from 'react';

    class App extends React.Component {
        render(){
            return <Button title='Press' />
        }
    };
    
    //in our button.js file
    const Button = (props) => (
        <button>
            {this.props.title}
        </button>
    )
    ```

### Properties, or Props
1. As noted elsewhere, the rule-of-thumb in React is that data flows downward, from parent components to children components. The means by which this is implemented is through the addition of **properties** or **props** to the child coponent when it is called by the parent component.

2. As an example, assume our parent component made an AJAX request to get a list of movies from an API, which is in the form of an array of movie objects. Within this parent component, we wish to render a list of individual movie components.

3. The parent component is holding the list of movies on its **state** object. In order to get the array of movies down to our \<List /> component, the parent will call the \<List /> as follows:
    ```javascript
    <List movies={this.state.movies} />
    ```
4. Now, in our \<List /> component, (indeed, in every class component), we have an associated **this.props** object, which is holding the data placed there as a property when the element was created with the JSX tag. So, our child component can access the list of movies as:
    ```javascript
    let movies = this.props.movies
    ```
    It can also pass its props on down to its children as their props.

5. If the child component is a *functional component*, the function returning the component will take the props object as an argument, as so:
    ```javascript
    const MovieList = (props) => {
        const movies = props.movies;
        return  {
            . . .
        }
    }
    ```

6. In addition to data, the *props* object has its own properties, including **this.props.children**, which will contain the child nodes, or text, of the instaace. As an example, let's make a button tag, which will not be self-closing, but will have its label as a text node.  if \<Butt> is not self closing, but has child nodes or text inside, such as:
    ```javascript
    import React from 'react';

    class App extends React.Component {
       render(){
            return <Button>Help</Button>
        }
    };

    //now, our button component
    
    const Button = () => (
        <button>{this.props.children}</button>
    };
    ```
    This makes available to the Button component the child text node of the component when it was created (by being placed in tags, per JSX).
    
7. **EXAMPLE: Passing Function To Child Component**: In the *InitialProject* app in the ReactRedux course, we have an excellent example of the passing of a callback function down from a parent element to a grandchild.  In that case, there was a parent component keeping track in *state* of the selected item of an array of items.  It had a list component, and that list component had a number of listItem components. When one clicked on one of the listItems, it was supposed to result in the update of the *state.selectedItem*. However, this requires, in a sense, passing information up from a child to grandparent, against the normal flow of data in React.

    The solution was to pass the following as a prop:
    ```javascript
    <ItemList
        onItemSelect={selectedItem => this.setState({ selectedValue })}.
    />
    ```
    This allowed the *setState()* method of the parent component to be passed down to the lower level component, where it could be run and passed as an argument the clicked-upon item.

### Rendering a List of Components
1. **Rendering an Array of Elements**: One thing React is able to do very well is render an array of elements (such as an array of list items). We merely need to include them into our component ("{listItems}") and React will be able to render the array elements.

2. In order to create a list of components in React, we will need to do two things:

    a. create a \<List /> component to handle the creation of the list, and
    
    b. create an \<Item /> componetn to render each item in the list.
    
3. As an example, we can imagine that we have an array of movie objects, and we want to create an index-card style summary of each movie, containing the title of the movie, the stars, and an image of the movie.

4. First, we can make our list component. When we do this, we will take the array of movies off of the *props* object and then create an array of video components by using the **map()** method to return an array.

5. After we have created an array of components, we will return a list of items. The code may look like this:
    ```javascript
    const MovieList = (props) => {
        const movies = props.movies;
        const movieItems = movies.map(movie => (
            <MovieListItem movie={movie} key={movie.etag} />
        ));

        return (
            <ul className="col-md-4 list-group">
                {movieItems}
            </ul>
        );
    };

    export default MovieList;
    ```
    Note the **key** property attached to each MovieListItem. This must have a unique value, which will be used by React to keep track of the list.
    
6. Finally, we need to make our MovieListItem component, which will receive the props of each movie item.

7. **SYNTAX:** In the map function, we can pass in the values associated with the item individually, rater than as one big object, by using the following syntax:
    ```javascript
    class MovieList extends Component{
        render() {
            let list = this.props.movies.map(val => {
                return <MovieListItem {...val} key={ind} />
            });
            return <div> {list} </div>
       }
    });
    ```
    The {...val} syntax allows us to pass in the entire data object as a property, rather than individually passing in each property, as follows:


### Component Lifecyle
1. React has several methods built-in that address the different parts of the component life-cycle. Actions specified in these methods will fire only one time, at the appropriate point in the life-cycle. These points are stated in terms of **mounting** or **unmounting** of components.  A component is *mounted* when it is added to the DOM, and *unmounted* when it is removed from the DOM.  Stage methods include:

    a. **componentWillMoun**t: runs just before the component is mounted,
    
    b. **componentDidMoun**t: runs just after the component is mounted,
    
    c. **componentWillUnmount**: runs just before the component is unmounted

2. **componentWillMount**: At this stage, the component is about to go into the DOM.  We do not have access to the DOM, but we do have access to *state* and *props*.

3. **componentDidMount**: At this stage, the component has been placed into the DOM, and we have access to the component in the DOM. So, for example, the following would show the actual HTML node object in the DOM:
    ```javascript
    componentDidMount() {
        console.log(ReactDOM.findDOMNode(this));
    }
    ```

4. **componentWillUnmount** is where we can clean up any processes that were set up on the component. For example, if we ran *addChangeListener* in the earlier stages, then we should run *removeChangeListener*.
		
5. ReactDOM has a method *unmountComponentAtNode()*, which is the inverse of the ReactDOM.render() method. It takes a single parameter, the node where the component is mounted. For example:
    ```javascript
    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('app'))
    }
    ```

6.	The following are some commonly used methods relating to the lifecycle of a component:

    a. **defaultProps** sets values that the props for the component will have on its initial rendering:
    ```javascript
    class App extends React.Component {
    . . .
    }
			
    App.defaultProps = {
        age: 20,
        name: 'Jordan'
    }
    ```

    b. **componentWillReceiveProps(nextProps)** takes the *nextProps* parameter, which are the props that will be when the component renders next. Examine the following:
    ```javascript
    componentWillReceiveProps(nextProps){
        this.setState({
            increasing: nextProps.val > this.props.val
        })
    }
    ```
    The above code tells React to wait until the component is about to receive new props, then compare the props.val that it will become (*i.e.*, nextProps.val) with what is there already (*i.e.*, this.props.val).
	
    c. **shouldComponentUpdate(nextProps, nextState)** allows us to examine the props and state that will be, and decide if the component should rerender, which it does if the method returns *truthy*.  For example, if we wanted to rerender a button after every fifth click, we could keep count and return true if prop % 5 === 0, for example.  **NOTE:** The state and props are still updating, they just aren't causing a rerendering.
	
	d.	**componentDidUpdate(prevProps, prevState)** allows us to examine what the immediately prior state and props were and perform any actions.




## Handling Events
1. Obviously, we need to have some way to react (pun realized, but not intended) to the actions of the user of the application, for example, when the user clicks on a button, or types text into an input box. These interactions are addressed by functions referred to as **event handlers**, which are triggered in response to an **event**.

2. A number of the most common events will be listed below, although there are many others. In order to wire up a component to respond to an event, we include the event a property on the component, and assign to it an event handler., For example:
    ```javascript
     render() {
         return <input onChange={this.onInputChange} />
    }
    ```
    **NOTE**: The **onChange** event is one that is part of the React library. They are typically the name of the corresponding HTML event, preceded by "on" and put into sad-camel-case. The **onInputChange** is simply a function that we write and make part of our component class.

3. There is one problem with the above code.  If our event handler function makes use of the **this** object, it will be expecting a context of the class in which it sits; however, if it is called as an event handler, it will be out of context and not have access to **this**. In order to provide it with context, we can use two approaches:
    ```javascript
    render () {
        return (
            <input onChange = {this.onInputChange.bind(this)} />
        )
    }
    ```
    Alternatively, instead of binding to the "this" object, we can make use of arrow function context scope:
    ```javascript
    render () {
        return (
            <input onChange = {(event) => this.onInputChange(event)} />
        )
    }
    ```
#### Mouse Events
1. **onClick**
2. **onDoubleClick**
3. **onMouseOver**
4. **onMouseLeave**
5. **onMouseMove**

#### Input Events
1. **onChange**

#### Other Events

## State

1. **State** is a property of every React class-based component that is used to record interaction with the user. For example, if a page has a toggle button, we will want to keep track of whether the button is currently in the "on" or "off" position. Otherwise, every time the page is rendered, the button would go back to its default position.

2. In older React components, the original state object is set by using the method **getInitialState()**. This method returns the initial value of this.state, for example:
    ```javascript
    module.exports = React.createClass({
        getlnitialState: function(){
            return {
                prop1: false,
                prop2: 'Bazoom',
                prop3: 2
            }
        }
    });
    ```

3. In modern (ES6) React with class syntax, the initial state is set directly within the constructor method, as follows:
    ```javascript
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                prop1: false,
                prop2: 'Bazoom',
                prop3: 2
            }
        }
    }
    ```

4. **Once set, the state object should never be altered directly**. For example, we **cannot** use:
    ```javascript
    this.state.prop1 = true;
    ```
    React is always looking for a change in state, which will cause a rerendering of the component in which state changed, and all child coponents. But the value of the object it is evaluating is the **adrress / pointer** of the object, so direct mutation will not register as a change of state.
    
5. In order to change state so that it registers with React and causes rerendering, we must usse the method **setState()**, which is on the *this* object. The setState() function can take a parameter of the object in its new condition. For example, the following will toggle the property *prop1*:
    ```javascript
    this.setState({prop1: !this.state.prop1});
    ```


## Redux
1. As our applications grow, it becomes increasingly difficult to manage state. In particular, while we are able to easily handle the transfer of information downward from a parent component to a child component with *props*, there is no easy way to pass data upward from a child component to a parent, or even to a sibling component.  **Redux** allows us to handle **application state**, which will be available throughout the application generally.

2. The defining characteristic of Redux is that it packages all the data that describes an app into a single object, referred to as the **state**. This is application-level state, it is **not** the state that is in a React component. From its own description: "Redux is a predictable state container for JavaScript applications."

2. Redux and React are not intrisically related.  Redux need not be used with React, and React need not be used with Redux.  In order to use them, we need another dependency package, **react-redux**, in addition to **react** and **redux**.		



2. One goal of Redux is to simplify our components so that very little logic is handled by them, they are more like dummy components. This is not completely true, as the component will still report events to Redux through the action creator, but most of the logic involving state will be handled by Redux.

3. One of the key features of Redux is that it keeps **all** the application state data in a single object.

4. One of the keys to using Redux is deciding how to design the model for the application state. 

5. To begin, let us define some key terms used in *redux*.

    a. **Reducer**: This is merely a function that returns some piece of appliation state. Since an app can have many different pieces of state, the app can have multiple reducers.
 
    b. **Container** is a React component that has a direct connection to the state being managed by Redux. In the documentation, containers are also referred to as **smart components**. Common practice is to differentiate between containers and "dumb" components by having a separate directory folder for containers. In general, we want the most senior component that cares about a particular piece of state to be the *container*.


    
    c. **Action Creator**: This is a Javascript function that returns an *action*.
    
    d. **Action**: This is a plain javascript object that tells the reducer how to modify its data. The only requirement is that it have a **type** property,
    
    e. **State**: The application data managed by Redux.
    
    f. **Store**: A javascript object that holds references to the *reducer* and *state*.

### Basic Setup of Redux
1. Create our basic seed project as before.

2. With npm install, install the following: **react-redux** and **redux**.

3. In our *app.js* (or *index.js*, *i.e.*, the root file) file, make the following additional imports:
    ```javascript
    import { Provider } from 'react-redux';
    import { createStore, applyMiddleware } from 'redux';
    import reducers from [path to reducers]
    ```
    The **Provider** method wraps around the **Store** (which holds all our pieces of **State** information, and makes it available to our React application. The Provider is the key connection between React and Redux.
    
4. In our *app.js* file, after creating the App component, run the **applyMiddleware** method from Redux on the **createStore** function from Redux, and save the returned function (below, we will name "makeStore"). Then wrap our \<App /> tag in a \<Provider> tag as follows:
    ```javascript
    ReactDOM.render (
        <Provider store={makeStore(reducers)}>
            <App />
        </Provider>, document.getElementById('root')
    };
    ```
5. In our *src* folder, create a new folder called **reducers**, and create a file therein named **index.js** (to aggregate multiple reducers (one per file) in our reducers directory.



### Reducers
1. One core concept in Redux is the **reducer**. **A reducer is just a function that returns a piece of the application's state.**

2. Because we can have lots of pieces of state, we can also have lots of redecers, each one concerned with its own piece of the state object. Each reducer should be contained in its wn Javascript file in the *./reducers* directory. In that directory, we will also have an **index.js** file in which all the reducers will be aggregated into a combined reducer. To do this, we will import the redeceer files, as well as the **combineReducers** method from Redux. We then assign to each state property the reducer for that property. The the file may look like something along these lines:
    ```javascript
    import { combineReducers } from 'redux';
    import BooksReducer from './reducer_books';
    import SelectedBookReducer from './selected_book';

    const rootReducer = combineReducers({
        books: BooksReducer,
        selectedBook: SelectedBookReducer
        });

    export default rootReducer;	
    ```
    **NOTE**: The imported reducers must actually be reducers, *i.e.*, each must be a **function** that returns a piece of state. Make sure the export from each reducers file is the function.	

3. Every reducer is listening for all actions generated by the action creators.  The reducer typically contains a **switch** statement, with a case for each type of action it is meant to handle, and a default of "do nothing" (*i.e.*, return the state unchanged) for all other actions.

4. The reducer will normally have two parameters: the **state** and the **action**. The *action* is what gets sent by the dispatcher.  The *state* is not the application state, but only the piece of state that for which the reducer is responsible. (However, we could have a reducer that does not use these arguments, but simply returns a set piece of state, on initialization).
		
### Connecting the State to a Component - Making a Container

1. Assume we have a component, and we want to make it a **container**.  By doing so, we wire it up so that **its props are updated every time the state is updated**. The first thing we need to do is import a single method from the react-redux module:
    ```javascript
    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    ```

2. The **connect** method is what we will use to connect the container to the state. The code to do so (in our case, to connect our component, *BookList*, to the application state, which contains an array of book titles) will look like:
    ```javascript
    class BookList extends Component {
            //set up the class
    }

    function mapStateToProps(state) {
        //whatever is returned will show up as props inside of BookList
        return {
            books: state.books
        };
    }
    
    export default connect(mapStateToProps)(BookList);
    ```
    **Note:** The function name **mapStateToProps** is descriptive, but is not required - it could be "taco" or "burrito"; it only need be the same as the name passed into the connect method as the first parameter (other pararmeters are discussed later).

    **Note:** The *state* parameter passed into the mapStateToProps() method is the Redux application state object, which allows us to pair the pieces of state with props of the component.

    **Note:** We then export out of our module *not the component*, but a *container*.  The *connect* method returns a function, which it then runs with the component as an argument, to return the container.

    **Note:** The **crucial point** is that the props object is now directly connected to the Redux application state object, so that if one adds a new book to the list correctly (as discussed below), the props object will be updated and immediately re-rendered.

3. This mapStateToProps method takes two arguments: state, being the application state, and what we can call **ownProps**, being the props that were passed to the component being wrapped by the connect method. So, we can perform some logic in this method, using the information. For example, if we touch on a screen section and get the identity of the section in the state, we can compare if that section matches each components id, and if it does, assign a value of true to a new prop (perhaps, "expand").

4. This method is run every time the state changes, so that props can be updated, and the page rerendered accordingly.
    
### General Flow in Redux
1. Things start rolling when a user, either directly (*e.g*., a mouse click), or indirectly (*e.g*., on page load), causes an event to occur.  This sets off the **action creator**, which is simply a function that returns an action object.

2. The action object must have a *type* property and may have one or more other properites for data. **The magic occurs when the action is automatically sent to all *reducers***.

3. Each reducer is a function that returns a piece of application state.  The reducer will typically contain a switch statement based on *action.type*. If a matching *action.type* value is hit, then the reducer may do something to create a new state object. Once that is done, the container component, and all its children, will re-render, with the content updated to incorporate the user's action.

### Actions and Action Creators
#### Creating the Action Creator

1. In the above discussion, we do not have anything particularly useful, because the application state is completely static. In order to update the state, we will use **action creators** to provide **actions** that are transmitted to **reducers**.

2. An **action creator** is simply a method that returns an action object. It will be called by something happening, e.g., a user interaction such as a mouse click or text input, return of an AJAX request, *etc*.

3. The **action** is an object that must contain a **type** property, and other properties as needed. Every action is automatically dispatched to each and every reducer in the application.

4. Depending on what the action is, the reducer can replace the piece of state implicated by the action.

5. **To Create the Action Creator:** In the *index.js* file located in the *src/actions folder*, create a function such as:
    ```javascript
    export function selectBook(book) {
        console.log('A book has been selected: ', book.title)
        return {
            type: select_book,
            payload: book
        }
    }
    ```
    Obviously, the *console.log* line of the above is just a test.
    

#### Connecting the Action Creator to the Component
1. First, import all the action creators, as follows:
    ```javascript
    import * as actions from '../actions';
    ```
    **NOTE**: it will be more efficient to select our action creators from the total list, as follows:
    ```javascrtipt
    import { selectBook, selectFriend } from '../actions';
    ```
2. Next, import the **connect** method from react-redux, if not already present:
    ```javascript
    import { connect } from 'react-redux';
    ```
3. The connect method takes as its first argument our **mapStateToProps** method. If we do not have that method in the module in which we are connecting our action creator, then we must pass in **null** as the first argument.  The second argument will be the entire *actions* object (or the parts we want to peel off), as follows:
    ```javascript
    export default connect(null, actions)(ListItem);
    //or
    export default connect(null, { selectBook, selectFriend })(BookList);
    ``` 
4. By virtue of the **connect** method, we now have access to the action creator as a prop. So, if we have wired up a component list, we can give each component an event handler, along these lines:
    ```javascript
    renderList() {
        return this.props.books.map((book) => {
            return (
                <li
                    onClick={() => this.props.selectBook(book)}
                    key={book.title}
               >{book.title}</li>
            );
        });
    }
    ```
### Best Practice - "Types" File
1. In order to protect against hard-to-find typos in creating our action types in the action creator and referring to them in the reducer (for example, setting the action.type as "email_change" in the action creator and "email_changed" in the Reducer, a best practice is to create a **types.js** file that exports an object of type names mapped to the given name. The point is that if there is a typo, then an error will be thrown noting the unknown variable.  To set this up, take the following steps:

    a. In the *actions* folder, creeate a new file, **types.js**;
    
    b. Export from the *types.js* file a constant that is an object of action names, such as:
    ```javascript
    export const ActionTypes = {
        SELECT_BOOK: 'SELECT_BOOK',
        PASSWORD_CHANGED: 'PASSWORD_CHANGED',
        LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
        LOGIN_USER_FAIL: 'LOGIN_USER_FAIL',
        LOGIN_USER: 'LOGIN_USER'
    };
    ```
    
    c. In the actions *index.js* file, import in thet *ActionTypes* object, and use it to refer to the action type:
    ```javascript
    import { ActionTypes } from './types';
    
    export const emailChanged = (text) => {
        return {
            type: ActionTypes.EMAIL_CHANGED,
            payload: text
        };
    };
    ```
    d. In our reducer file, import the ActionTypes object, and use it as the name in our switch/case statement:
    ```javascript
    switch(action.type) {
        case ActionTypes.EMAIL_CHANGED:
            return some state;
        default:
            return state;
    }
    ```

### Reducers, Expanded
1. The reducer is a **function** that returns some application state data. This function has two parameters, **state** and **action**. The *state* will be the state that was returned the last time the reducer ran, and *action* will be the action that has been dispatched.

2. The reducer function body will use a **switch** statement to provide the proper response based on the action that has been received. So, a typical reducer will look something like:
    ```javascript
    import { ActionTypes } from '../actions/types';

    const INITIAL_STATE = {
        title: '',
    };

    export default (state = INITIAL_STATE, action) => {
        switch(action.type) {
            case ActionTypes.SELECT_BOOK:
                return { ...state, title: action.payload.title;
            default:
                return state;
        }
    };
    ```
    **NOTE**: The reducers will run on start up, oftentimes before anything has given any values to application state. We must provide a default value for 'state', as React will throw an error if undefined is returned for state value, so we need to provide an initial, start-up value for state.
    
3. When the Reducer is called by the Action, it must take the old state at that time, create a **new state** (actually, only the portion of state that the particular reducer is addressing). It should **not** change the old state object. When it returns the new state object, Redux compares that with the old state object, and if there are no changes, it does not update; but if there are changes, it does update. **BUT**, **if the old state is modified, then the returned object is still the same object, so Redux will not update!**

4. To return a new state object, we can use the following, which is from a reducer case where the item has been clicked upon by the user:
    ```javascript
    return { ...state, selected: action.payload };
    ```
    In the above snippet, the "..." brings in all the state object properties, and the designation of the email will either add the email property to the state, or replace the email property already in the state. The **important part** is that we are returning a new object, not a reference to the old state object.
    
### Redux - Middleware

1. **Middleware** in Redux are functions that take an *action* and do something with it (which might be doing nothing) before it is passed onto the *reducer*. It might be logging, manipulation, terminating in certain cases, *etc*.

2. We can have many different middlewares set up between the action and the reducer.

3. One particular use of a middleware is to make AJAX requests and then, when the request has been completed, send the response to the reducer. As an example, we will use a middleware package called **redux-promise**.

4. To incorporate middleware into our application, in our *index.js* root file, import the middleware, then include it as an argument to the **applyMiddleware** method, as follows:
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import ReduxPromise from 'redux-promise';
    import { Provider } from 'react-redux';
    import { createStore, applyMiddleware } from 'redux';
    import App from './components/app';
    import reducers from './reducers';

    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App />
        </Provider>
        , document.querySelector('.container')
    );
    ```
5. Now that the *redux-promise* middleware has been installed, we can focus on making our AJAX request inside an action creator.

#### Middleware: Redux-Promise
1. The data that we fetch will be held in the Redux application state.  So, we will make the AJAX request from the *action creator*.  We write the action creator in the actions/index.js file.

2. The following is a simple action creator that fetches weather data:
    ```javascript
    import axios from 'axios';
    import ActionTypes from './types';

    const API_KEY = '88eb2a1acefe1cd19130e08ce26c1a48';
    const BASE_URL `http://api.openweathermap.org/data/2.5/forecast/APPID=${API_KEY}`;

    export function fetchWeather(city) {
        const url = `${BASE_URL}$q=${city},us`;
        const resPromise = axios.get(url);
        return {
            type: ActionTypes.FETCH_WEATHER,
            payload: resPromise,
        };
    }
    ```
    **Note:** We use an npm package called **axios** to perform the GET request. We build the url from the ROOT_URL, and then run the *axios.get(url)* method.
	
    **Note:** Axios is a promise-based http client, so the *resPromise* returned as the payload is a promise.
	
3. As a middleware, *redux-promise* sits around waiting for an action to be created, and if it has a promise, it holds things up until the promise is fulfilled, then sends it on its way to the reducer, without the data continuing to be wrapped in the promise. **NOTE**: *redux-promise* is looking for promises on the **payload** property, so be sure to name the propeerty as such.

#### Middleware: Redux-Thunk
1. An alternative approach to the automatic treatment of asynchronous calls in the action creator offered by *redux-promise* is that os **redux-thunk**.

2. **The Key** to *redux-thunk* is that it allows action creators to **return a function**, rather than an action object. The returned function is then called automatically with the **dispatch()** method.

3. One key to understanding redux-thunk is to understand that *redux* is, behind the curtain, calling a **dispatch()** method, which sends all the actions created by the action creator to each and every reducer. *Redux Thunk** allows access to this *dispatch()* method.

3. To begin, install with npm:
    ```
    npm install --save redux-thunk
    ```
4. Next, in the *app.js* file, import *redux-thunk*, and the *applyMiddleware()* method from redux:
    ```javascript
    import { createStore, applyMiddleware } from 'redux';
    import ReduxThunk from 'redux-thunk';
    ```
5. In our **store** creation, in the *render* method of the App component, place the following code:
    ```javascript
    render() {
        const = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        
        return (
            <Provider store={store}>
                <Component />
            </Provider>
        );
    }
    ```
    Note: the second argument takes any initial state we want to pass into Redux.

6. As an example, let's imagine a very simple app that will make a request to a database for a list of users and email addresses, then list them on the page. Our action creator might look like:
    ```javascript
    import axios from 'axios'
    
    export function fetchUsers() {
        const resPromise = axios.get('http://somewebaddress.com/users');
        
        //return an action, which is an object
    ```
7. With *redux-thunk* as a middleware, we can return a function instead of an object, as follows. Note that the first argument must be the *dispatch* method:
    ```javascript
    import axios from 'axios'

    export function fetchUsers() {
        const resPromise = axios.get('http://somewebaddress.com/users');
        
        return (dispatch) => {
            resPromise.then(({ data }) => {
                dispatch(
                    {
                        type: FETCH_USERS,
                        payload: data
                    }
                )
            });
        };
    }
    ```
    **NOTE**: In the above example, we are merely allowing the promise time to get fulfilled, then manually calling dispatch to send our action out to all the reducers.

:::danger

:::

   


### Asynchronous Action Creators



7. Next, in our action creator, we wrap our asynchronous call in a function, passing in the parameter **dispatch**. What happens is that redux, unpon noting that our action creator is returning a function, allows the inner function to run, and then send out the object to the reducers by manually calling the **dispatch** method.



## React Router
1. **Introductory Note**: These notes have been updated for **react-router-dom** version 4.0. Previously, there was just a single *react-router* flavor; now it is split up into a *DOM* version, and other platform versions, such as *React Native*.

2. **Background**: A "traditional: approach to using the web involved the user seeing a page, then clicking on a link.  This would send a request to a server, and the server would put together a whole new page, which would then be sent as a response to the client. The purpose of modules such as react-router is to completely circumvent this process; instead of requesting a new page from the server, we simply get the page from the client (where it is rendered with React). We only connect with the server to get outside information (such as weather data, or a list of movie data, etc.).

3. This approach is what's known as **single page applications (SPAs)**. This is a little deceptive - to the user, it appears that there are lots of pages; however, if a page is defined as something loaded from the server, it is only a single page.

4. **react-router** intercepts requests, inspects the url and, if it recognizes the url, handles it appropriately without sending any http requests.

5. React router also installs a package called **history**, which runs behind-the scenes.

### Initial Example
1. As a bare-bones, stripped-down example, let's make the following import and create two components in our index.js file, as follows:
    ```javascript
    import { BrowserRouter, Route } from 'react-router-dom';
    
    const Hello = () => (
        <h1>Hello!</h1>
    );

    const Goodbye = () => (
        <h1>Goodbye!</h1>
    );
    ```

2. Next, where we previously had our single **<App />** insertion tag, replace it with the **\<BrowserRouter>\</BrowserRouter>** tag. This becomes the insertion point for the components delivered by our router. *BrowserRouter* is what interacts with the *history* library, and decides what to do if there is a change in the url.

3. Inside the \<BrowerRouter> tag, place what we want to deliver to the page. Remember that the \<BrowserRouter> can only contain a single top-level component, so multiple components must be wrapped in a \<div> or other wrapping component. We can insert plain components into the \<BrowserRouter>.  **In addition**, we can insert **\<Route>\</Route>** tags, which must contain two properties, **path**, and **route**:
    ```javascript
    <BrowserRouter>
        <div>
            <Header />
            <Route path="/hello" component={Hello} />
            <Route path="/goodbye" component={Goodbye} />
        </div>
    </BrowserRouter>
    ```
    **NOTE**: The **\<Route>** tag basically acts as a boolean show/not show test. React Router checks the URL path from the **history** module. If it matches the **path** property of the tag, then the component is rendered. If not, then the component designated in the **component** prop is ignored. In the above example, the \<Header /> will always show, because there is no Route applicable to it.
    
    
### Use of Switch
1. As we saw in the initial example, React router checks each path and, if satisfied, puts the associated component on the screen. While this sometimes might be handy, it could lead to unexpected results. In particular, react-router uses *greedy matching*, which will count as a match anything where the target contains the needle. For example, "/" will match to "/users/:id", "/index", *i.e.*, anything that contains a "/".

2. To restrict our routing to just returning a single component, we use the **\<Switch>** tag to enclose our routes. **Only the first match** (if any) of the included routes will be selected. As an example:
    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import { createStore, applyMiddleware } from 'redux';
    import { BrowserRouter, Route, Switch } from 'react-router-dom';
    import comps from './components';
    import reducers from './reducers';

    const createStoreWithMiddleware = applyMiddleware()(createStore);

    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/users" component={comps.UsersIndex} />
                        <Route path="/" component={comps.PostsIndex} />   
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
	, document.querySelector('.container'));
    ```
    **NOTE**: The order of the routes withing the \<Switch> tag is important. Only the first match will get displayed, so the most specific path should be listed first.
    
### Following a Link
1. In React or other SPAs, we do not use \<a> tags to navigate, because they cause a change in HTML page. Instead, we want to stay on the same page, but merely dictate a new group of components to render. To do this, we use the **Link** object from *react-router-dom*.

 2. In the component where we wish to place our link, import with the following statement:
     ```javascript
     import { Link } form 'react-router-dom';
     ```    
3. Then, simply use the \<Link> tag to create react-router links.  Use the "to" property to provide the path for the link.  For example:
    ```javascript
    <div>
        <Link to='/cart' className='btn'>
            Go to Your Cart
        </Link>
    </div>
    ```
### Programatic Navigation
1. When using a \<Link>, we are depending on the user clicking on something to make us follow a specified route. In contrast, **programatic navigation** involves the route changing in connection with non-user events, such as a form being successfully submitted.

2. When a component is being rendered by a Route, React places in a number of items into that component's props object.

3. One of the useful items on the props object is the **history.push()** method, which allows us to designate a route.

## Forms, With Redux Form
### Introduction
1. **Redux Form** is a library for woring with forms connected to the Redux component state. It can handle validation, and many other tasks.

2. Naturally, the first step is to install as an npm package:
    ```javascript
    npm install --save redux-form
    ```
3. Next, go to the *reducers/index.js* file, where we will import s reducer from the redux-form library and make it part of our RootReducer with combineReducers.
    ```javascript
    import { combineReducers } from 'redux';
    import { reducer as formReducer } from 'redux-form';
    import PostsReducer from './reducer_posts';

    const rootReducer = combineReducers({
        posts: PostsReducer,
        form: formReducer
    });

    export default rootReducer;
    ```
    **NOTE**: It is important that the formReducer is assigned to the property **form**. When we hook up a form, it will be assuming that there is such a property existing on application state.

4. In the component where we wish to place a form, import the **Field** component, and the **reduxForm** function form **redux-form**, as follows:
    ```javascript
    import { Field, reduxForm } from 'redux-form';
    ```
    **reduxForm** is similar to the **connect** function in 'react-redux', in that it creates the conection with the form.

5. In our component, wire up the form as follows, using **reduxForm**:
    ```javascript
    export default reduxForm({
        form: 'NewPostForm'
    })(NewPost)
    ```
    The object is a configuration object, with "form" being essentially the name of the form. The string given as a value must be unique to that form, or else the state of differing forms could get overlapped.

    Note that we might be also adding an action creator to our component, so we might need code along these lines:
    ```javascript
    export default reduxForm(
        {
            form: 'NewPostForm',
            validate,
        },
    )(connect(null, { createPost })(NewPost));
    ```

6. Finally, we can set up our form in our component. We use the normal \<form> tag, but set up the fields using the "Field" property, with various properties assigned to it, such as:

    a. **name**: how we identify that particular field
    
    b. **component**: The \<Field> component only knows how to interect with redux; it **does not** know how to render itself. The *component* property tells the component how to render itself. We add in a function that returns the JSX necessary to show the component.
    
7. Our component function will take a single parameter, denoted **field** by convention, which has a number of event handlers and other items to place on the input. We can use the following shorthand to get them onto the component:
    ```javascript
     renderTitleField(field) {
        return (
            <div>
                <input
                    type="text"
                    {...field.input}
                />
            </div>
        );
    }
    ```
8. Form submission is the same as with a normal HTML form - have a button with type="submit".

### Validation
1. Validation with redux forms is performed by a **validation** function that is passed into the **reduxForm** configuration object on the key **validate**, as follows:
    ```javascript
    function validate(values) {
    //validation code
    }

    export default reduxForm(
        {
            form: 'NewPostForm',
            validate,
        },
    )(NewPost);
    ```
2. The validate function is passed a single argument (by convention, referred to as "values"), and is called any time the form is submitted. **Values** is an object containing all the values in the form. The **keys** would be the names of the form fields, the **values** would be the entered values.

3. The validate function must return an object, called **errors**. So, at the beginning of the validate function, we create an empty errors object, then add to it as necessary as we go through the validation code. Then, we return the (hopefully still empty) *errore* object.

4. If we return an empty object, redux assumes there is nothing wrong with the form input. If there are any properties on the errors object, then the form will not be submitted.

5. **Example**: Assume we have a form with a "Title" field. It is a required input field, so we might have the following:
    ```javascript
    function validate(values) {
        const errors = {};
        
        if (!values.title) {
            errors.title = "Enter a title."
        }
        
        return errors;
    }
    ```
6. Up to this point, we have done nothing to display our error messages in the form. The form won't be submitted if there are validation errors, but we need to communicate to the user. For that, we must go back up to our **renderField(field)** method and access the errors as the **field.meta.error** property, which is added automatically to the field property when there is an error. So, our code might look like:
    ```javascript
    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.error}
            </div>
        );
    }
    ```
    **IMPORTANT NOTE**: For the errors to be available on the *field.meta.error* property, the *errors* object must have saved the error with a key name equal to the name of the field. So, if in the example above, if we had saved the error as "errors.noTitle", then there would be no error available on the *field.meta.error* property of the Field named "title".
    
7. To have a decent user experience, we do not want constant validation of the form fields; for example, we do not want the form to show validation errors as soon as it is rendered and the user hasn't had a chance to do anything yet. To handle this correctly, we need to use a few properties assigned to the field, as follows:

    a. **pristine**: Every field has this state by default. Means it has not been selected by the user, and has not been altered in any way.
    
    b. **touched**: Means the user has placed the focus on the field, and moved the focus off the field.
    
    c. **invalid**: The content of the field fails the validation requirements.
    
8. These properties are placed on the **field.meta** object, so if we wanted to show an error message only if the field has been touched, we can do the following in our *renderField* method.
    ```javascript
    {field.meta.touched ? field.meta.error : ''}
    ```

### Form Submission
1. As noted above, there is nothing unique to redux-forms as far as placing a submit button goes, and using the submit button. However, redux-form is only keeping track of the state of the form; anything we want to do with the data in state is up to us.

2. One thing that is handled by redux-form when submitted is validation.

3. When we wire up redux-form to our form, we use the **reduxForm** method. This adds some properties to our component. One of these is a propeerty called **handleSubmit**, which is a function that is used to pass a **values** object to our own *onSubmit* method when the form is submitted. Review the following:
    ```javascript
    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit((values) => this.onSubmit(values))}>
            . . .
    ```
## Testing

### First Test
1. In our project (which, for now, is assumed to have the testing setup completed), let us create a folder under the root, *test*, which will contain a directory *components*. Inside that directory, create a file called *app_test.js*, which will be used to test our basic *app.js* file. For reference, this is the content of the *app.js* file:
    ```javascript
    import React, { Component } from 'react';

    export default class App extends Component {
        render() {
            return (
                <div>React simple starter</div>
            );
        }
    }
    ```
2. In this example, we are going to test a single thing - does our component output the text "React simple starter". Note that we could change the \<div> to a \<span> and it will pass, or we can change to a functional component and it will pass, but if we misspell "simple", it will not pass.

3. We will need to import our *App* component. We will also need to import two helper methods from our setup file, *test/test_helper.js*. More about this later.

4. We can start by considering **three essential methods**:

    a. **describe** is used to group together similar tests. It takes two arguments, a string which is only used in reporting to describe the group of tests, and a callback function, the body of which contains the *it()* method. **Describe() blocks can be nested.** 
    
    b. **it()** is used to describe a particular test. "It" takes two arguments as well, a string which is used only in reporting to describe the test, and a callback function, the body of which contains the *expect()* method.
    
    c. **expect()** is used to make an assertion about our target. It will have a syntax consisting of the word "expect", followed by the thing we want to make an assertion about, followed by **matchers**, followed by the expected value. For example:
    ```javascript
    expect(component).to.have.class('comment-box');
    ```
    **Note**: *expect* is a method, and it returns an object, which allows us to chain on these various matchers. We pass in the thing we want to test, and returns the component wrapped in the testing object.

    **Note**: the main action, in testing, is primarily in use of the matchers.
    
    **Note**: in this setup, we are using the **chai** assertions library, and for many of the matchers, there should be no parens() and no arguments. For example, the **to.exist** matcher does not take any parens.
    
5. The purpose of wrapping all our tests within the callbacks is that the test application can run the each test without affecting the running of the other tests - an error in one test merely results in a failed test, not a crashed app.

6. Finally, in order to have a component to test, we must create it. In order to create this component, we use the **renderComponent** method that we imported, and assign the returned component to a variable. So, our entire testing code is as follows:
    ```javascript
    import { renderComponent, expect } from '../test_helper';
    import App from '../../src/components/app';

    // Use describe to group together tests
    describe('App Component', () => {

        // use it to test a single attribute
        it('shows the correct text', () => {

            // create an instance of App
            const component = renderComponent(App);

            // use expect to make an assertion about the target
            expect(component).to.contain('React simple starter');
        });
    });
    ```
    **Note**: A test (an "it") can take *multiple expectations*, and will pass only if it passes each expectation.
    
7. Finally, we can run our tests. The following samples are scripts contained in the *package.json* file for a mocha testing call:
    ```json
    "test": "mocha --compilers js:babel-core/register
        --require ./test/test_helper.js --recursive ./test",
    "test:watch": "npm run test -- --watch"
    ```
    **Note**: The *test:watch* command keeps the tester running and retesting every time we save a file.
    
### Test Driven Development
1. **Test Driven Development (TDD)** is an approach to writing code in which we create our tests first, then write code that will pass the test, and no more. To do correctly, it is important that we have a good idea in advance of how we wish to structure our application, and are able to list exactly what it is important for it to do.

### Testing Generally
1. We can prevent a test from running by placing an x directly in front of the *it* statement. This tells mocha/jasmine to omit running the test.

2. We can specify a test to be the **only** test run by using the "only()" method on a test instance, as follows:
    ```javascript
    it.only('does the stuff it is supposed to do', () => { });
    ```

### Testing Environment Setup
1. **Chai vs. Mocha**: A **testing suite** requires something that will run our tests, as well as something that will allow us to write our tests, with assertions, *etc*. This first portion, running the tests, is handled by a library such as **Mocha**. In constrast, **chai** and **chaiJquery** are libraries to handle writing of tests.

2. We have very little interaction with **Mocha**.  It places the *describe*, *beforeEach*, and *it* variables on the global scope so they are available, but most everything else takes place behind the scenes. It loads the tests, runs them, and cleans up after them.

3. In contrast, a library such as *chai* provides helpers for making assertions.

4. Note that some libraries, such as *chaiJQuery*, may redefine matchers for their own purposes, but be based on the underlying library such as *chai*. For example, *chai* has an *exist* method that asserts that the target is neither null nor undefined. *ChaiJQuery's* *exist* method is similar, but applies to jQuery objects.

5. In our *test* directory, we include a file, *test-helper.js*. The remainder of this section will go through the steps involved in setting up that file.  It will have four main tasks, each discussed below:

#### Set up environment to run like a browser in the command line
1. Our code (the bundle.js file in webpack) is written to run in a browser environment, with lots of support provided therein; for example, it provides a window object, the DOM, *etc.*.

2. This is an obvious problem in testing, where we are running our code in the terminal, without the browser environment. So, we need to set up things so that JQuery, etc., will be able to function. For example, we use a library called **jsdom** to simulate the DOM and HTML in a *nodeJS* environment.

3. We begin by importing *jsdom* and then creating a document on the *global* object:
    ```javascript
    import jsdom from 'jsdom';

    // Set up testing environment to run like a browser in the command line
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');

    // build 'renderComponent' helper that should render a given react className

    // buile helper for simulating events

    // set up chaiJquery
    ```
    This will allow, for example, JQuery to refer to "document" and have it be defined.
    
4. We then set up JQuery, but have to attach it to our *fake* DOM. We do this by importing jQuery to an intermediate variable, and then assign to the "$" sign, as follows:
    ```javascript
    import jsdom from 'jsdom';
    import _$ from 'jquery';
    // Set up testing environment to run like a browser in the command line
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = global.document.defaultView;
    const $ = _$(global.window);
    ```
    Note that the "\_$" variable could be any name.
#### build 'renderComponent' helper to provide react class instances
1. The purpose of this portion is to be able to take any react class that we have written, and output the resulting DOM node, wrapped in a JQuery object. So, we will start by importing as follows:
    ```javascript
    import TestUtils from 'react-addons-test-utils';
    import ReactDOM from 'react-dom';
    ```
2. The react test utilities has a method **renderIntoDocument()** that renders the react element into a detached DOM node. Then, we can use the **findDOMNode** method of ReactDOM to get a reference to the actual HTML, then wrap that with JQuery, as follows:
    ```javascript
    import Reach from 'react'
    import jsdom from 'jsdom';
    import _$ from 'jquery';
    import TestUtils from 'react-addons-test-utils';
    import ReactDOM from 'react-dom';

    // Set up testing environment to run like a browser in the command line
    global.document = jsdom.jsdom('<!doctype html><html><bo dy></body></html>');
    global.window = global.document.defaultView;
    const $ = _$(global.window);

    // build 'renderComponent' helper that should render a given react className
    function renderComponent(ComponentClass) {
        const componentInstance = TestUtils
        .renderIntoDocument(<ComponentClass />);
	return $(ReactDOM.findDOMNode(componentInstance));
    }
    
    export { renderComponent, expect }
    ```
    The purpose of making it a jQuery object is so we have access to the chai-jQuery matchers.

3. Finally, for any tests that involve containers, we will need our components to be hooked up to redux, by being wrapped by \<Provider> and having access to a store. Do it as follows (for more detail in what it all means, see the section on Higher Order Components):
    ```javascript
<<<<<<< Updated upstream
    import React from 'react';
    import jsdom from 'jsdom';
    import _$ from 'jquery';
    import TestUtils from 'react-addons-test-utils';
    import ReactDOM from 'react-dom';
    import { expect } from 'chai';
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';
    import reducers from '../src/reducers';

    // Set up testing environment to run like a browser in the command line
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = global.document.defaultView;
    const $ = _$(global.window);

    // build 'renderComponent' helper that should render a given react className
    function renderComponent(ComponentClass, props = null, appState = {}) {
        const componentInstance = TestUtils.renderIntoDocument(
            <Provider store={createStore(reducers, appState)}>
                <ComponentClass {...props} />
            </Provider>
        );

        return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
    }
    ```
 
#### Build a helper for simulating event
1. We want to have a method that we can chain onto any jQuery object and pass in two parameters: the name of the Javascript event and a new value for the element, if applicable.

2. We can add methods to jQuery by adding them onto the **$.fn** object. So, we would start with something like:
    ```javascript
    $.fn.simulate = function(eventName, value) {
    
    }
    ```
3. After that, we go to the React website and check out the **Simulate** method from *react-addons-test-utils*, to end up with the following:
    ```javascript
    // build helper for simulating events
    $.fn.simulate = function(eventName, value) {
        if (value) {
            // val is a jQuery method that assigns a value to an element
            this.val(value);
        }
            // 'this' will refer to the jQuery element
        TestUtils.Simulate[eventName](this[0]);
    };
    ```
=======
    
    ```

    
#### Build a helper for simulating events
>>>>>>> Stashed changes

#### Set up chai-jquery
1. Finally, import the 'chai-jquery' library and set up as follows:
    ```javascript
    import chaiJquery from 'chai-jquery';
    // set up chaiJquery
    chaiJquery(chai, chai.util, $);
    ```
    


### Tests to Find Elements in a Component
1. Note that it is possible (as we will see later) to write matchers and assertions from scratch. However, there are also a number of matcher libraries that provide large number of pre-written assertions / matchers.

2. In this section, we will examine the use of an assertion library, **chai-jquery**. This library provides matchers that allow us to determine many various properties of html elements we are creating. It allows us to use jquery methods to identify components work with them, and includes a large number of assertions. In our example, we use the **.to.exist** and **to.have.class** assertions, as follows:
    ```javascript
    import { renderComponent, expect } from '../test_helper';
    import CommentBox from '../../src/components/comment_box';

    describe('CommentBox', () => {
        it('has the correct class', () => {
            const component = renderComponent(CommentBox);
            expect(component).to.have.class('comment-box');
        });
        it('has a text area', () => {
            const component = renderComponent(CommentBox);
            expect(component.find('textarea')).to.exist;
        });
        it('has a button', () => {
            const component = renderComponent(CommentBox);
            expect(component.find('button')).to.exist;
        });
    });
    ``` 

### Before Each
1. Notice that each test abover requires a copy of the same line of code to create our component

2. In this simple case, we could create the component a single time at the top of the describe block, and then run our tests. However, a test could cause the component to be modified in some way, that could affect other tests.

3. In order to clean up our code, **but still create a separate element for each test**, we will use the **beforeEach()** method to specify actions that should be taken prior to each test; in this case, creating the component. Our describe function will now look like:
    ```javascript
    describe('CommentBox', () => {
        let component;
        beforeEach(() => {
            component = renderComponent(CommentBox);
        });
        it('has the correct class', () => {
            expect(component).to.have.class('comment-box');
        });
        it('has a text area', () => {
            expect(component.find('textarea')).to.exist;
        });
        it('has a button', () => {
            expect(component.find('button')).to.exist;
        });
    });
    ```
4. *BeforeEach* statement can add on to one another. For example, if there is a *describe()* method nested in another *describe()*, any *beforeEach()* of the outer *describe()* would run prior to each *it()* of the interior *descrbe()*.

### Checking for Existence of a Child
1. We often may want to check that a nested component exists on the parent component. The easiest way may be to create the component, then search for the child component using the jquery *.find()* method, and then using the *to.have.class()* matcher. If we assign to each component a class name that matches its component name, then this will allow us to locate it. So, if we have:
    ```javascript
    import React from 'react';
    import CommentBox from './comment_box';

    const App = () => (
        <div>
            <CommentBox />
        </div>
    );

    export default App;
    ```
    We can run the following test:
    ```javascript
    describe('App Component', () => {
        let component;
        beforeEach(() => {
            component = renderComponent(App);
        });

        it('shows the comment-box component', () => {
            expect(component.find('.comment-box')).to
            .exist;
        });
    });
    ```
### Simulating User Events
1. In order to test how our app is functioning, we need to be able to simulate events. We can do this with the **simulate** method, which takes the event as its first argument and the value coming from that event is the second argument. For example, we type into a textbox, creating a *change* event. We can simulate as follows:
    ```javascript
    beforeEach(() => {
        component.find('textarea')
        .simulate('change', 'new comment');
    });
    ```

### Adding Props to Our Test Component
1. We can add properties (the props object) to a test component by adding a third parameter to the *renderComponent* method. So, for example, if we have a component that is supposed to take in text strings in an array with a key of "comments", we can create the following:
    ```javascript
    component = renderComponent(
        CommentList,
        null,
        {
            comments: ['Test Comment 1', 'Test Comment 2']
        }
    )
    ```

### Redux - Testing Action Creators
1. Testing the action creators is pretty straightforward.  The following is the *test/actions/actions.test.js* file for a simple, one action app:
    ```javascript
    import { expect } from '../test_helper';
    import { SAVE_COMMENT } from '../../src/actions/types';
    // note that brackets may be incorrect depending 
    // on type of export 
    import { saveComment } from '../../src/actions';

    describe('actions', () => {
        describe('saveComment', () => {
            it('has the correct type', () => {
                const action = saveComment();
                expect(action.type).to.equal(SAVE_COMMENT)
            });
            it('has the correct payload', () => {
                const action = saveComment('new comment');
                expect(action.payload).to.equal('new comment');
            });
        });
    });
    ```
2. As a style matter, note the pattern of making a *describe* for all actions, then a separate, nested describe for each individual action creator. Then, for each action creator, there are going to be two fundamental questions: does the action creator have the correct type, and does it have the correct payload.


### Redux - Testing Reducers
1. First, we create a **reducers** direectory in our test directory, and create a file within that for each reducer.

2. Next, we will want to create a test for our default case by including an action that is not in the reducer. We also test each different action type.

3. The following is a sample set of tests for a simpe reducer:
    ```javascript
    import { expect } from '../test_helper';
    import commentReducer from '../../src/reducers/comments';
    import actions from '../../src/actions/types';

    describe('Comments Reducer', () => {
        it('handles action with unknown type', () => {
            const output = commentReducer(['old comment'],
            { type: 'Bazoom', payload: 'this is fake data' });
            expect(output).to.eql(['old comment']);
        });

        it('handles action of type SAVE_COMMENT', () => {
            const action = { type: actions.SAVE_COMMENT, payload: 'new comment' };
            const output = commentReducer([], action);
            expect(output).to.eql(['new comment']);
        });
    });
    ```




## Webpack Setup


## The End



::: danger
Any information below this line is draft and has not been reviewed
:::




::: info
Note: Note: React.PropTypes is deprecated as of React v15.5. Please use the prop-types library instead.  See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
:::
	
        
6.	When creating a class, we can set propTypes for the class, to indicate what kind of props we are expecting. This would go right under the class declaration:

		App.propTypes = {
			txt: React.PropTypes.string.isRequired,
			cat: React.PropTypes.number,
			type: React.PropTypes.oneOf(['number', 'range'])
		}

	a.	On each PropType, we can add on ".isRequired", which will make that prop a mandatory one.
	
	b.	PropTypes can be numbers, strings, functions('func').
	
	c.	Props can be required by adding '.isRequired' to the declaration.
	
	d.	Multiple possible values for PropType can be designated by using '.oneOf', followed by an array of accepted types/values.  For example, in the above, the type prop must take a value of "number", or "range."
	
	e.	Another interesting propType is array, and arrayOf
	
	
	
7.	Also, we can set defaults for the props, values that will obtain unless overridden:

		App.defaultProps = {
			txt: 'made glorious summer',
			cat: 4
		}

6.  The following is a full sample page of a component set up with propTypes and defaultProps:

		"use strict";

		import React from 'react';
		import ReactDOM from 'react-dom';

		class App extends React.Component {
    		constructor() {
        		super();
        		this.state = {
            		red: 0,
            		blue: 0,
            		green: 0
        		};
        		this.update = this.update.bind(this);
    		}
    		update(e) {
        		this.setState({
            		red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
            		blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value,
            		green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value
        		})
    		}
    		render() {
        		return (
            		<div>
                		<NumInput
                   			ref='red'
                    		val={parseFloat(this.state.red, 10)}
                    		label='Red'
                    		update={this.update} />
                		<NumInput
                   	 		ref='blue'
                    		val={parseFloat(this.state.blue, 10)}
                    		label='Blue'
                    		update={this.update} />
                		<NumInput
                    		ref='green'
                    		val={parseFloat(this.state.green, 10)}
                    		label='Green'
                    		update={this.update} />
            		</div>
        		);
    		}
		}

		class NumInput extends React.Component {
    		render() {
        		let label = this.props.label !== '' ?
            		<label>{this.props.label} - {this.props.val}</label> : '';
        		return (
            		<div>
                		<input ref='inp'
                   			type={this.props.type}
                    		min={this.props.min}
                    		max={this.props.max}
                    		step={this.props.step}
                    		defaultValue={this.props.val}
                    		onChange={this.props.update} />
                    	<br/>
                    	{label}
            		</div>
        		)
    		}
		}

		NumInput.propTypes = {
    		min: React.PropTypes.number,
    		max: React.PropTypes.number,
    		step: React.PropTypes.number,
    		val: React.PropTypes.number,
    		label: React.PropTypes.string,
    		update: React.PropTypes.func.isRequired,
    		type: React.PropTypes.oneOf(['number', 'range'])
		}

		NumInput.defaultProps = {
    		min: 0,
    		max: 255,
    		step: 0.01,
    		val: 0,
    		label: '',
    		type: 'range'
		}

		export default App






	
### Higher Order Components (formerly Mixins)

1.	These have taken over the place of mixins in ES6 class components.

2.	It is a way to package functionality in one place, then distribute it to multiple components.	

3.	Examine the following sample:

		"use strict";
		import React from 'react';

		let Mixin = (InnerComponent) => class extends React.Component {
    		constructor() {
        		super();
        		this.update = this.update.bind(this);
        		this.state = {
            		val: 0,
            		name: 'Jordan'
        		}
    		}
    		update() {
        		this.setState({val: this.state.val + 1})
    		}
    		render() {
        		return <InnerComponent
        			update={this.update}
        			{...this.state}
        			{...this.props} />
    		}
		}

		const Button = (props) => {
    		return <button onClick={props.update}>{props.txt} - {props.val}</button>
		}

		const Label = (props) => <label onMouseMove={props.update}>{props.txt} - {props.val}</label>

		let ButtonMixed = Mixin(Button);
		let LabelMixed = Mixin(Label);

		class App extends React.Component {
    		render() {
        		return (
            		<div>
                		<ButtonMixed txt='Button1' />
                		<LabelMixed txt='Label' />
            		</div>
        		);
    		}
		}

		export default App

4.	In the above sample, we have basic functionality that we want to use in both the button and the label; *i.e.*, when an event occurs (click or mouseMove), the state increases by one and the component rerenders.  This common functionality is put into the designated class "Mixin", which takes a single parameter, "InnerComponent".

5.	**Tricky Point** Note that when Mixin renders, it includes all state and all props properties as props of the returned InnerComponent.

6.	Note that we declare two static components, Button and Label.  They take props as parameters, and return a button or label element.

7.  We then create two instances of the Mixin class, using Button and Label, which are assigned to the variables "ButtonMixed" and "LabelMixed".

8.  **For an excellent example of the use of Higher-Order Components, see the React Shopping Cart App.**

		


### Refs

1.	**Refs** are a way to reference an instance of a component from inside the React application.  For example, if we have three components that are all tied to the same state property, then all three will change in tandem.  If we only wanted one of them to change, we can use refs.

2.	Refs **will not work** with stateless function components.

3.	A "ref" value can be assigned to a DOM component generated in the render method.  For example, we can generate the following group of sliders:

		render() {
			return (
				<div>
					<Slider ref='red' update={this.update} />
					<Slider ref='blue' update={this.update} />
					<Slider ref='green' update={this.update} />
				</div>
			)
		}
	This gives three sliders, each of which is hooked up to an update method.  In the class declaration for Slider, an 'onChange' property is passed, so that when the slider value is changed, the update method will run setState() on three values, as such:
	
		update(e) {
			this.setState({
				red: ReactDOM.findDOMNode(this.refs.red).value,
				green: ReactDOM.findDOMNode(this.refs.green).value,
				blue: ReacDOM.findDOMNode(this.refs.blue).value
			})
		}
		
	The important goings-on here is the findDOMNode method that comes with ReactDOM, and which takes a parameter consisting of the target slider.
	
4.	Note that the above works if Slider is just a single DOM element component.  It would not work, for example, if our *input* component was wrapped inside a \<div>.  In that case, the component we want to get at should have a ref value, and the three references above could refer to it as follows:

		update(e) {
			this.setState({
				red: ReactDOM.findDOMNode(this.refs.red.refs.input).value,
				green: ReactDOM.findDOMNode(this.refs.green.refs.input).value,
				blue: ReacDOM.findDOMNode(this.refs.blue.refs.input).value
			})
		}
		
		
		class Slider extends React.Component {
			render() {
				return (
					<div>
						<input ref='input' type='range' min='0' max='255'
							onChange={this.props.update} />
					</div>
				);
			}
		}



	



		a.	onKeyPress

### Dealing With Form Elements in React

1.	In React, we must define the form element with which we want to work. Form elements are referred to as being either **controlled** or **uncontrolled**:

	a.	**controlled**: the value of the input is set by *this.state*, rather than its value setting the state. This is implemented by including the attribute in the input tag as follows:

			<input value={this.state.[propertyname]}

		
	If the input is controlled, then we can access it through the *this.state.data* property. So, for example, we can run an event handler on the input to listen for any change, and then do what we want with the input.

	**Example**: Often, there might not be a visible difference.  However, we could include in our *onInputChange* method a *toUpperCase()* method to set the state to the input, but all placed in uppercase.  In that case, even though the user types in lower case letters, it all appears in the input field not as what he typed, but as uppercase letters.
	
	b.	**uncontrolled**: the value of the input is what it is, and shows in the input field as the user typed it.




### Flux
#### General Overview

1.	Flux is an approach to handling data in React components. It divides things into four parts:

	a.	**Action:**	The Action will often be triggered by the View, such as a change in an input box, for example.

	b.	**Dispatcher:**	The Dispatcher maintains a registry of Stores and which events each Store is listening for. When that event occurs, the Dispatcher notifies the appropriate Stores and sends the payload to those Stores. The Dispatcher maintains a queue of all the Actions, and sends them out one at a time (FIFO).

	c.	**Store:** This is where all the functionality usually is kept, where all the work is done, and the store manages all the state in the application. Once the Store is notified by the Dispatcher that an event has occured. As part of its work, the Store may, or may not, update the View. The Store registers with the Dispatcher the events it is waiting for.

	d.	**View:**	The View is simply a React component. A view can trigger an Action, starting the process going again. The view can register to listen for events to cause something to happen. The view can register to listen for events to cause something to happen.

#### Dispatcher

1.	The open-source Flux component consists solely of the Dispatcher portion of the components described above. Install with:

		npm install --save flux

2.	If we go into flux/lib/Dispatcher.js, we can see the various methods added to the Dispatcher object. Important ones include:

	a.	**register():** Registers a callback to be invoked with every dispatched payload. It returns a token that can be used with the waitFor() method.
	
	b.	**dispatch():** Sends the callbacks and payloads out to the registered stores.  Its primary purpose is to prvent race conditions, *i.e.*, to make sure each dispatch or callback is executed in the order in which it is received.
	
	c.	**waitFor():** Waits for specified callbacks to be invoked before continuing execution of the current callback. This method should only be used by a callback in response to dispatched payload.

3.	In our js directory, we should have the following subdirectories (or similar): actions, components (the 'view' part), constants, dispatchers, and stores.

4.	To start, create a *dispatcher.js* file in the dispatchers folder, and require in *('flux').Dispatcher* (the constructor function for a dispatcher). We should also require in a React helper method, **assign**, which allows us to pass additional properties into an existing object. For example, the sample begins our app-dispatcher as follows:

		var Dispatcher = require('flux').Dispatcher;
		var assign = require('react/lib/Object.assign');
		
		var AppDispatcher = assign(new Dispatcher(), {
			handleViewAction: function(action) {
				this.dispatch({
					source: 'VIEW_ACTION',
					action: action
				})
			}
		});

	In the above, we are creating a new dispatcher called AppDispatcher, and using the assign method to add the properties contained in the second parameter object to the new dispatcher.

5.  From the egghead flux class in es6, the following code is used to create the dispatcher:

		//in src/js/dispatchers
		
		import { Dispatcher } from 'flux';
		
		const flux = new Dispatcher();
		
		export function register(callback) {
			return flux.register(callback);
		}
		
		export function dispatch(actionType, action) {
			flux.dispatch(actionType, action);
		}

#### Actions

1.	The first step in dealing with actions is to create a list of actions in a *constants.js* file. This is a very simple object that is exported out.  It assigns to each key(the action), the action as a string.  For example:

		export default {
			ADD_ITEM: 'ADD_ITEM',
			REMOVE_ITEM: 'REMOVE_ITEM'
		}

2.	The actions.js file will need to require in the constants file and the Dispatcher file, as follows(in es6):

		import AppConstants from '../constants/app-constants';
		import {dispatch, register} from '../dispatchers/app-dispatcher';

3.	The app-actions.js file will export out all the various actions. These methods typically call a method passed in from the dispatcher. For example:

		export default {
			addItem(item){
				dispatch({
					actionType: AppConstants.ADD_ITEM,
					item: item
				})
			}
			. . .
		}


#### Store

1.	All the functionality of the application usually exists in the Store, which is where all the work gets done. The Store registers with the Dispatcher the events it is listening for. When those events occur, the Dispatcher sends the payload to the registered Stores.

2.	Start by requiring in the Dispatcher (*dispatch* and *register*) and Constants, as well as the React assign method ('react/lib/Object.assign' **note**: not necessry in ES6, which has an assign method), and EventEmitter from node.js ('events' module). Also, designate a CHANGE_EVENT variable to hold the value to be broadcast whenever something changes in the application (= 'change').

3.	Store must make a call to the **register** method of the Dispatcher in order to register with the Dispatcher the various actions to take. For example, the following is a register method in the shopping cart app:

		AppDispatcher.register(function(payload) {
			var action = payload.action;
			switch(action.actionType) {
				case AppConstants.ADD_ITEM:
					_addItem(action.item);
					break;
					
				case AppConstants.REMOVE_ITEM:
					_removeItem(action.index);
					break;
					
				case AppConstants.INCREASE_ITEM:
					_increaseItem(action.index);
					break;

				case AppConstants.DECREASE_ITEM:
					_decreaseItem(action.index);
					break;
			}
				AppStore.emitChange()
		})

4.	Note how the store, by being registered to the dispatcher, gets the payload 
dispatcher whenever anything happens in the dispatcher. There is no emitter at that point, it simply happens through the registration.


5.	Note that the Actions pass an object parameter into the Dispatcher's method, which then sends it on to the Store file in the register method.

6.	Once the payload is received from the dispatcher, the store does something with it. Note the use of the switch statement to handle the various cases that could arise. At the end, the emit() method is called, sending out the signal that something has been done to the Components that have a listener.

7.	The Store will also use the *assign()* method to add methods to the EventEmitter.prototype, such as the **addChangeListener**, which takes a callback as a parameter.

#### View (Components)

1.	If a view is subject to being updated, then it should have an event listener waiting to be told when to update. For example, in the shopping cart app, the catalogue component does not change. It has an "add item" button which, if pressed, will affect the content of the Cart component, but the Catalog component never changes appearance, so it does not need a listener. The Catalog component does need 
response to a variety of events, including events from the Catalog component (the Add To Cart button) and from the Cart component (the x, -, and + buttons).

2.	The listener is added using the componentWillMount method, which runs a single time when the component is fist set up. So, we have a statement such as the following:

		componentWillMount: function() {
			AppStore.addChangeListener(this._onChange);
		},
		
		_onChange: function() {
			this.setState(cartltems());
		}



## Setting Up the Work Environment

### Node.js, Browserify, and Gulp

In production code, we do not want to dump huge amounts of javascript and .jsx into our .html page. Instead, we will separate our code into small sections (a separate page for each class definition). Then, using the require and module.exports features of Node.js, Browserify will package up all the needed javascript code (including transpiled .jsx code) into a single file, which will be included in the index.html page as a single script tag. This process is set out in a gulpfile.js,
which is run to create the program.

1.	Create a separate file for each class, named after the class. Also, have an app.jsx (main.jsx, etc.) file for bootstrapping - it should include the options object and the React.createElement() method call and the React.render() call.

2.	These files should go into a source code directory ('src/').


#### Gulp

1.	Gulp is a node-based tool that is used to automate the build process.

2.	It is installed as an npm package. If gulp-cli (-g) has been installed, then it is available from the command line. This allows the build process to be started simply by getting into the correct directory and entering "gulp".

3.	When gulp runs, it looks in the directory for a file called 'gulpfile.js'. In the gulpfile.js, it looks for a task named 'default' to begin running.

4.	In addition to gulp, we may also need to install helper packages to handle particular tasks. With react, it is necessary to also install 'gulp-react', which converts .jsx to javascript, and 'gulp-concat, which concatenates files.

		npm install --save gulp gulp-react gulp-concat


#### Gulpfile

1.	First, the gulpfile will require in the components it needs, for example:

		var gulp = require('gulp');
		var react = require('gulp-react');
		var concat = require('gulp-concat');

2.	Second, include a gulp.task() method, which will include the procedures for gulp to follow in building the app.
	a. task() takes two parameters, the name of the task, and a callback that returns a stream of files. The task named 'default' is run first. Example:
	
			gulp.task('default', function() {
				return gulp.src('src/**') 		//load the files found in src/
					.pipe(react()) 				//convert .jsx to javascript
					.pipe(concat('application.j'1)) //combine them all into the given file
					.pipe(gulp.dest'./')) 		//place the file in the cwd.
			});

	b.	the gulp.src() method loads the files included in the parameter. So, in the example above, we load all the files in the 'src/' directory.

	c.	the various procedures employed by gulp in its build are combined with the .pipe command.

	d.	Note that the build process contained above will likely not produce viable code, as it will simply concat the files by alphabetical order, without regard for when functions are declared or called, for example. To get them into proper order, we use Browserify, which uses the npm require/modules concepts to guide it.

	e.	Quick point: When we switch to using Browserify, we will be requiring the react npm module into each file. This will handle conversion of each file from .jsx to .js, so we will no longer need gulp-react.

3.	A neat feature to include in the gulpfile is **livereload**. This feature updates the browser content as changes are made to the code, without the need to reload the page manually. It is enabled with code along the following lines:

		gulp.task('serve', function(done) {
			gulp.src('')
				.pipe(server({
					livereload: {
						enable: true,
						filter: function(filePath, cb) {
							cb( /main.js/.test(filePath))
						}
					},
					open: true
		});

		
#### Browserify

1.	This outline assumes familiarity with node and its syntax for making one file's contents available to another file through the require command and the module.exports object. Without this, each file is completely isolated. If not familiar with this notation, start with that.

2.	The first step in using Browserify (aside from installing it with npm), is to go through the source files and make certain that all dependencies are properly required.

3.	In addition to Browserify, the following dependencies may be necessary:

	a.	**reactify**: works in conjunction with Browserify to convert .jsx files to .js,

	b.	**vinyl-source-stream**: this module is for using conventional text streams at the start of gulp or vinyl pipelines,

	c.	**watchify**: this module watches for changes in the source files and, whenever any are saved, re-runs the gulp process,

	d.	**gulp-util**: this module logs to the console information regarding the build process.  Helps with debugging,

	e. **react**: the React file.

4.	After requiring dependencies, the following is a sample gulpfile:

		gulp.task('default', function() { 		//default task starts things off
			var bundler = watchify(browserify({ //see note on bundler object
				entries: ['./src/app.jsx'],
				transform: [reactify],
				extensions: ['.jsx'],
				debug: true,
				cache: {},
				packageCache: {},
				fullPaths: true
			}));

			function build(file) {
				if (file) gutil.log('Recompiling ' + file);
				return bundler
					.bundle()
					.on('error', gutil.log.bind(gutil, 'Browserify Error'))
					.pipe(source('main.js'))
					.pipe(gulp.dest('./'));
			};
			build();
			bundler.on('update', build);
		});

5.	A bundler is the item responsible for running Browserify on our code. Note the object passed in to Browserify, which contains the following configuration options:

	a.	*entries*: an array of starting points of the application (*i.e.*, the start of the require breadcrumb trail),

	b.	*transform*: an array of modules used to compile - in our case of .jsx to .js, we use reactify,

	c.	*extensions*: an array of the types of files to examine in the build process,

	d.	*debug*, *cache*, *packageCache* and *fullPaths* are described as "boilerplate", but we should take a look at what they are.

6.	The actual work occurs when the build function is called. Bundle is a Browserify method that returns a readable stream of the javascript file contents. Note that "source" is the variable holding the vinyl-source-stream. Using the .pipe command, we place it in the main.js file (which is very large - it is holding the React code).


## Setting up Environment with WebPack

1.	Run npm init to set up the project and create a *package.json* file.

2.	Install react and react-dom:

		npm install react react-dom flux react-router --save

3.	Install babel to allow use of ECMA 6 in JavaScript:

		npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save-dev

		
4.  The following should already be installed (globally):

		sudo npm install -g babel-cli webpack webpack-dev-server
		
5.	Set up the following files in the app folder:

		touch index.html App.js main.js webpack.config.js 
		
	i)	*index.html* is the webpage,
	ii)	*App.js* is the initial react component,
	iii)	*main.js* is the entry into the application,
	iv)	*webpack.config.js* is the configuration file to set up web pack.
	
#### Setting up webpack.config.js
1.	In the *webpack.config.js* file, set up an object as follows:

		module.exports = {
    		entry: './main.js',
    		devtool: 'source-map',   //errors marked to original file, not output file
    		output: {
        		path: './',
        		filename: 'index.js'
        		publicPath: '/'    //tells webpack how to generate urls
    		},
    		devServer: {
        		inline: true,  	        //allows it to reload on the fly (like nodemon)
        		port: 3000		        //assign the localhost port (default is 8080)
        		contentBase: './dist'  //tells the pack-dev-server where to go for files
    		},
    		module: {
        		loaders: [
            		{
                		test: /\.js$/,   //look for .js files
                		exclude: /node_modules/,  //exclude these files
                		loader: 'babel',
                		query: {
                   			presets: ['es2015', 'react'] //babel pre-loaders
                		}
            		}
        		]
    		}
		}

2.	Next, go into the package.json file and in the scripts object, add the following:

		"start": "webpack-dev-server"

3.	The above is the file that transpires our .jsx into javascript.

4.	The index.html file will have a script tag pointing to the *index.js* file, which is the output of the webpack config.

5.	Employing the new ES6 language for importing and exporting modules, we can set up App.js as follows:

		import React from 'react';
		class App extends React.Component {
			render() {
				return <div>Goodbye, Cruel World!</div>
			}
		}
		
		export default

6.	Also, we set up our *main.js* file, which incorporates our App component:

		import React from 'react';
		import ReactDom from 'react-dom'  //necessary to place the react into DOM
		import App from './App';
		ReactDOM.render(<App />, document.getElementById('app'));
		
7.	Finally, to try it out, type npm start on the command line to start the webpack server, and go to the localhost in the browser.
