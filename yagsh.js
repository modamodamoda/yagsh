/* 

Copyright (c) 2018 Jack Penny

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

class yagsh {
  
  handlers = [];
  
  store = {};
  
  mount(handler) {
    this.handlers.push(handler);
    handler._stateID = this.handlers.length - 1;
    if(handler.componentWillUnmount !== undefined) handler.__yagsh_componentWillUnmount = handler.componentWillUnmount;
    var _self = this;
    handler.componentWillUnmount = function() {
      _self.unmount(this);
      if(this.__yagsh_componentWillUnmount !== undefined) this.__yagsh_componentWillUnmount();
    }
    handler.setState(this.store);
  }
  
  unmount(handler) {
    this.handlers.splice(handler._stateID, 1);
  }
  
  setState(data) {
    Object.assign(this.store, data);
    for(let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].setState(data);
    }
  }
  
  each(callback) {
    for(let i = 0; i < this.handlers.length; i++) {
      callback(this.handlers[i]);
    }    
  }
  
}

export default yagsh;
