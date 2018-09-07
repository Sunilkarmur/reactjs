import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
import './App.css';
import HomeContainer from './containers/HomeContainer'
import Header from './containers/HeaderContainer'
import AddProduct from './containers/AddProductContainer'


const store = createStore(rootReducer)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
                <div>
                    <BrowserRouter>
                        <React.Fragment>
                        <Header/>
                        <Route path="/" exact component={HomeContainer}/>
                        <Route path="/add" exact component={AddProduct}/>
                        </React.Fragment>
                    </BrowserRouter>
                </div>
            </Provider>
    );
  }
}

export default App;
