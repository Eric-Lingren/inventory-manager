import React from 'react';
import './userInventory.css'
import '../App.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const UserInventoryCard = ({ id, category, subcategory, name, quantity, size, volumeType, expiration, handleDeleteSubcategory }) => {

    let expires = moment(expiration).format('MMMM Do YYYY')
    expires === 'Invalid date' ? expires = 'None Selected' : expires = expires

    
    return (
        <div className='user-inventory-item-card'>
            <p> {category} </p>
            <p> {subcategory} </p>
            <p> {name} </p>
            <p> {expires} </p>
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