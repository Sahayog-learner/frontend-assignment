import {  Route,Routes,Navigate} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './App.css';

import Homepage from './pages/homepage.components/homepage/homepage.component';
import ShopPage from './pages/homepage.components/shop/shop.component';
import Header from './components/menu-item/header component/header.component';
import SignInAndSignUpPage from './pages/homepage.components/sign-in-and-sign-up/sign-in-and-sign-up';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/homepage.components/checkout/checkout.component';

class App extends React.Component {

  unsubscibeFromAuth = null;

  componentDidMount(){

    const {setCurrentUser} = this.props;
    this.unsubscibeFromAuth=auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
         setCurrentUser({
                id : snapShot.id,
              ...snapShot.data()})
            
          });
       
      }
      setCurrentUser(userAuth);
       
    });
  }

  componentWillUnmount(){
    this.unsubscibeFromAuth();
  }


  render (){
    return (
      <div>
        <Header/>
          
            <Routes>
              <Route exact path = '/' element={<Homepage/>} />
             
              <Route path ='/shop' element={<ShopPage/>} /> 
              <Route exact path ='/checkout' element={<CheckoutPage/>}></Route>
              <Route exact path='/signin' element={this.props.currentUser ? <Navigate to='/'/> : <SignInAndSignUpPage/>} />
            
          
        </Routes>
          
      </div>
    
    );
  }
  
}
const mapStateToProps = createStructuredSelector ({
  currentUser:selectCurrentUser
})
 


const mapDispatchToProps = dispatch => ( {
  setCurrentUser: user => dispatch(setCurrentUser(user))

})

export default connect(mapStateToProps,mapDispatchToProps) (App);



