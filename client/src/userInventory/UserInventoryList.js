import React, { useEffect } from 'react';
import './userInventory.css'
// import { Link } from 'react-router-dom';
import { withInventory } from '../context/InventoryProvider'
import { withAuth } from '../context/AuthProvider'
import UserInventoryCard from './UserInventoryCard'


const UserInventoryHome = ({ getUserFromToken, user, getUserInventory, userInventoryItems }) => {

    useEffect(() => {
        getUserFromToken()
    }, [ getUserFromToken ])

    useEffect(() => {
        getUserInventory(user.id)
    }, [ getUserInventory, user ])

    

    const mappedUserItems = userInventoryItems.map( ( item, i ) => {
        return (
            <UserInventoryCard 
                key={i}
                id={item.id}
                name={item.Item.name}
                category={item.Item.Subcategory.Category.name}
                subcategory={item.Item.Subcategory.name}
                expiration={item.expirationDate}
                size={item.size}
                volumeType={item.volumeType}
                quantity={item.quantity}
            />
        )
    })

    return (
        <div >
            <h2> My Inventory: </h2>
            <div className='user-inventory-list-table-heading'>
                <h4 className='inventory-header' > Category </h4>
                <h4 className='inventory-header'> Subcategory </h4>
                <h4 className='inventory-header'> Item </h4>
                <h4 className='inventory-header'> Expiration </h4>
                <h4 className='inventory-header'> Size </h4>
                <h4 className='inventory-header'> Quantity </h4>
                <h4 className='inventory-header'> Actions </h4>
            </div>
            {mappedUserItems}
        </div>
    );
}

export default withInventory(withAuth(UserInventoryHome))