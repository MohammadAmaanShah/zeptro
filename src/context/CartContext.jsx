import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify'

export const CartContext = createContext(null);


export const CartProvider = ({ children }) => {

    const [cartItem, setCartItems] = useState([]);
    const addToCart = (product) => {
        const itemInCart = cartItem.find(item => item.id === product.id);
        if (itemInCart) {
            const updateCart = cartItem.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
            setCartItems(updateCart)
            toast.success("Quantity Increased")
        }
        else {
            setCartItems([...cartItem, { ...product, quantity: 1 }]);
            toast.success(' Product Is Added To The Cart Successfully')
        }



    }

    const deleteItem = (productId) => {
        setCartItems(cartItem.filter(item => item.id !== productId))
        toast.success(' Product is removed Successfully')
    }

    const updateQuantity = (cartItem, productId, action) => {

        setCartItems(cartItem.map((item) => {
            if (item.id == productId) {
                let newUnit = item.quantity;
                if (action == 'increase') {
                    newUnit = newUnit + 1
                } else if (action == 'decrease') {
                    newUnit = newUnit - 1;
                }

                return newUnit > 0 ? { ...item, quantity: newUnit } : null;
            }
            return item;

        }).filter(item => item != null) // remove quantity item with 0) 
        )
    }

    return <CartContext.Provider value={{ cartItem, setCartItems, addToCart, updateQuantity, deleteItem }}>
        {children}
    </CartContext.Provider>
}


export const useCart = () => useContext(CartContext);