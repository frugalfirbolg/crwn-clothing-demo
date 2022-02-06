import React from 'react';
import { connect } from 'react-redux';
import { addCartItem, removeCartItem, clearItemFromCart } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, addCartItem, removeCartItem, clearItemFromCart }) => {
    const { name, quantity, price, imageUrl } = cartItem;

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeCartItem(cartItem)}>&#10094;</div>
                <div className='value'>{quantity}</div>
                <div className='arrow' onClick={() => addCartItem(cartItem)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
        </div>
)};

const mapDispatchToProps = dispatch => ({
    addCartItem: cartItem => dispatch(addCartItem(cartItem)),
    removeCartItem: cartItem => dispatch(removeCartItem(cartItem)),
    clearItemFromCart: cartItem => dispatch(clearItemFromCart(cartItem))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);