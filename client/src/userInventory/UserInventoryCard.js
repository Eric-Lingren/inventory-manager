import React from 'react';
import './userInventory.css'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const UserInventoryCard = ({ id, name, quantity, size, volumeType, handleDeleteSubcategory }) => {

    
    return (
        <div className='user-inventory-item-card'>
            <p> Category </p>
            <p> {name} </p>
            <p> {size} {volumeType} </p>
            <p> {quantity} </p>
            <button className='button-delete'
            // onClick={ () => handleDeleteSubcategory(id) }
            > 
                <FontAwesomeIcon icon={faTrash} />
             </button>
            <button className='button-minus'> 
                 <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className='button-plus'> 
            <FontAwesomeIcon icon={faPlus} />
            </button>
            
        </div>
    );
}

export default UserInventoryCard