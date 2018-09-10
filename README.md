Yet Another Global State Handler
=================================

The problem: modifying multiple components' states at once is a bitch. Especially when using something like stack navigation.

The solution: a class where you can add components ("handlers") and modify all of their states easily, whilst also tracking which components are mounted.

(1) The handler is added to the class, listening for state changes
(2) The handler's unmount event is reassigned and a new one is created which makes sure it unmounts from the class, and also calls the existing one
(3) The class has a setState function which modifies the state of all components.

Perhaps this is not how Facebook would want to deal with this problem, favouring something like Redux. But alas, in many cases, this is much simpler
for me, as an old school programmer. 

A decent use of this is extending a class with this yagsh, so it has the handler functions and can talk to the handlers. 

Functions
=========

mount(handler) - run this when your component mounts, simply with "this"

unmount(handler) - you don't need to run this, but if you want to unsubscribe your component from the class, run with "this"

each(callback) - you can iterate through each handler listening to the class with "each," it will simply call the callback with each handler.

Example usage
=============

import yagsh from 'yagsh';

var myStateHandler = new yagsh();

class MyComponent extends Component {

  componentWillMount() {
    myStateHandler.mount(this); // nothing more needed
  }
  
  doSomething() {
    myStateHandler.setState( { test: 'test' } ); // both mycomponent2 and mycomponent's state will be set
  }
  
  ...
  
}

class MyComponent2 extends Component {

  componentWillMount() {
    myStateHandler.mount(this); // nothing more needed
  }
  
  doSomething() {
    myStateHandler.each( function(handler) {
      handler._something = 'hi'; // both mycomponent2 and mycomponent will be affected.
    } );
  }
  
  ...

}