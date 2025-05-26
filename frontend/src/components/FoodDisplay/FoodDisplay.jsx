import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category, search, setSearch}) => {

    const {food_list} = useContext(StoreContext)

    const filterFood = food_list.filter((x) => 
        x.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='food-display' id='food-display'>
        <div className='search'>
            <h2>Top dishes near you</h2>
            <input 
                type='text' 
                className='' 
                placeholder='Search Foods....' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div className='food-display-list'>
            {
                search === "" ? 
                food_list.map((item, index) => {
                    if(category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })
                : filterFood.map((item, index) => {
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                })
            }
        </div>
        {/* <hr /> */}
    </div>
  )
}

export default FoodDisplay