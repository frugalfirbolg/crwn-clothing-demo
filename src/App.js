import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-up/sign-in-and-up.component';

import './App.css';
import { snapshotEqual } from 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        await createUserProfileDocument(userAuth, {}, 
            snapShot => {
              this.setState({
                currentUser: {
                  id: snapShot.id,
                  ...snapShot.data()
                }
              })
            }
          );
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div className="App">
      <Router>
          <Header currentUser={this.state.currentUser} />
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='signin' element={<SignInAndSignUpPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
