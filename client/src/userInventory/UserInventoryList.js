import React, { useEffect } from 'react';
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
                name={item.name}
                key={i}
                id={item.id}
            />
        )
    })

    return (
        <div >
            <h3> User Inventory List </h3>
            {mappedUserItems}
        </div>
    );
}

export default withInventory(withAuth(UserInventoryHome))