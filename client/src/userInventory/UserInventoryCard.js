import React from 'react';
import './userInventory.css'
import '../App.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { withInventory } from '../context/InventoryProvider'

const UserInventoryCard = ({ id, category, subcategory, name, itemQuantity, itemSize, itemVolumeType, itemExpiration, handleDeleteUserInventoryItem, markItemUsed, item, markItemAdded }) => {

    let expires;
    expires === 'Invalid date' ? expires = 'None Selected' : expires = moment(itemExpiration).format('MMMM Do YYYY')

    
    return (
        <div className='user-inventory-item-card'>
            <p> {category} </p>
            <p> {subcategory} </p>
            <p> {name} </p>
            <p> {expires} </p>
            <p> {itemSize} {itemVolumeType} </p>
            <p> {itemQuantity} </p>
            <button className='button-delete' onClick={ () => handleDeleteUserInventoryItem(id) } > 
                <FontAwesomeIcon icon={faTrash} />
             </button>
            <button className='button-minus' onClick={ () => markItemUsed(id, item) }> 
                 <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className='button-plus' onClick={ () => markItemAdded(id, item) }> 
            <FontAwesomeIcon icon={faPlus} />
            </button>
            
        </div>
    );
}

export default withInventory(UserInventoryCard)