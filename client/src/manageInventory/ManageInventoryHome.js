import React from 'react';
import './manageInventory.css'
import CreateInventoryItem from './CreateInventoryItem'
import AddInventoryItem from './AddInventoryItem'
import UserInventoryHome from '../userInventory/UserInventoryHome'


const ManageInventoryHome = () => {

    
    return (
        <div >
            <div className='input-container-wrapper'>
                <CreateInventoryItem />
                <AddInventoryItem />
            </div>
           
            <UserInventoryHome />
            
        </div>
    );
}

export default ManageInventoryHome