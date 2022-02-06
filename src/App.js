import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-up/sign-in-and-up.component';

import './App.css';
import { snapshotEqual } from 'firebase/firestore';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        await createUserProfileDocument(userAuth, {}, 
            snapShot => {
              setCurrentUser({
                currentUser: {
                  id: snapShot.id,
                  ...snapShot.data()
                }
              })
            }
          );
      } else {
        setCurrentUser(userAuth);
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
          <Header />
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
