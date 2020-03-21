import React from 'react';
import './manageInventory.css'
import AddInventoryItem from './AddInventoryItem'
import UserInventoryHome from '../userInventory/UserInventoryHome'


const ManageInventoryHome = () => {

    
    return (
        <div>
            <div className='input-container-wrapper'>
                <AddInventoryItem />
            </div>
            <UserInventoryHome />
        </div>
    );
}

export default ManageInventoryHome