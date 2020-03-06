import React from 'react';
// import { Link } from 'react-router-dom';
import CreateInventoryItem from './CreateInventoryItem'
import AddInventoryItem from './AddInventoryItem'
import UserInventoryHome from '../userInventory/UserInventoryHome'


const ManageInventoryHome = () => {

    
    return (
        <div >
            <h2> Manage Inventory Home </h2>
            <CreateInventoryItem />
            <AddInventoryItem />
            <UserInventoryHome />
            
        </div>
    );
}

export default ManageInventoryHome