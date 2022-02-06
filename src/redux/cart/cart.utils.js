export const addItemToCart = (cartItems, newCartItem) => {
    const existingCartItem = cartItems.find(cartItem => (cartItem.id === newCartItem.id));

    if (existingCartItem) {
        return cartItems.map(cartItem => (
            cartItem.id === newCartItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ))
    }

    return [...cartItems, { ...newCartItem, quantity: 1}];
}

export const removeItemFromCart = (cartItems, oldCartItem) => {
    const existingCartItem = cartItems.find(cartItem => (cartItem.id === oldCartItem.id));

    if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
            return cartItems.map(cartItem => (
                cartItem.id === oldCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ))
        }
        return cartItems.filter(cartItem => (
            cartItem.id != oldCartItem.id
        ))
    }

    return [...cartItems];
}

export const clearItemFromCart = (cartItems, clearedCartItem) => {
    return cartItems.filter(cartItem => (
        cartItem.id != clearedCartItem.id
    ))
}