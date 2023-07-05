import React from "react";
import { connect } from "react-redux";

import './cart-dropdown.css';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
   
//import CheckoutPage from "../../../pages/homepage.components/checkout/checkout.component";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect"; 

import { toggleCartHidden } from "../../../redux/cart/cart.actions";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }




const CartDropDown =({cartItems,dispatch}) => {
    
    const navigate = useNavigate();
    return(<div className="cart-dropdown">
        <div className="cart-items">
            
            { 
             cartItems.length ?
             (
            cartItems.map(cartItem => 
            <CartItem key ={cartItem.id} item= {cartItem}/>))
                :
                (<span className="empty-message">Your Cart is empty</span>)
        }    
        </div>
        <CustomButton onClick = {() => {navigate("/checkout");dispatch(toggleCartHidden())}} >GO CHECKOUT</CustomButton>

    </div>)
 };

 const mapStateToProps = createStructuredSelector ({
    cartItems : selectCartItems
 });

 

 export default withRouter(connect(mapStateToProps) (CartDropDown));
