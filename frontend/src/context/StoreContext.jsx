import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const StoreContext = createContext(null)

const StoreContextProvider = props => {
    const [route, setRoute] = useState('Home')
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState('')
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [food_list, setFoodList] = useState([])
    const [discount, setDiscount] = useState(0)
    const url = "https://food-del-backend-olcs.onrender.com"
    const deliveryFee = 30

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    }

    const loadCartData = async token => {
        const response = await axios.post(`${url}/api/cart/get`, {}, {headers: {token}})
        if (response.data.cartData)
            setCartItems(response.data.cartData)
        else
            toast.error('Failed to fetch cart items')
        
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData()
    }, [])

    const addToCart = async itemId => {
        if (!cartItems[itemId])
            setCartItems(prev => ({...prev, [itemId]: 1}))
        else
            setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
        if (token)
            await axios.post(`${url}/api/cart/add`, {itemId}, {headers: {token}})
    }

    const removeFromCart = async itemId => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}))
        if (token)
            await axios.post(`${url}/api/cart/remove`, {itemId}, {headers: {token}})
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems)
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(product => product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        return totalAmount
    }

    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        deliveryFee,
        url,
        token,
        setToken,
        route,
        setRoute,
        discount,
        setDiscount,
        email,
        setEmail
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
