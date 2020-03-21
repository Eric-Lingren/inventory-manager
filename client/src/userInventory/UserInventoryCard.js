import React, { useState } from 'react';
import './userInventory.css'
import '../App.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { withInventory } from '../context/InventoryProvider'
import EditUserItemModal from './EditUserItemModal'

const UserInventoryCard = ({ id, category, subcategory, name, itemQuantity, itemSize, itemVolumeType, itemExpiration, handleDeleteUserInventoryItem, handleSetEditingItem, markItemUsed, item, markItemAdded }) => {

    const [isShowingModal, setIsShowingModal] = useState(false)

    const toggleModal = () => {
        handleSetEditingItem(item)
        setIsShowingModal(!isShowingModal)
    }

    let expires;
    itemExpiration === null ? expires = 'None Selected' : expires = moment(itemExpiration).format('MMM Do YYYY')


    return (
        <div className='user-inventory-item-card'>
            <div className='card-row-1'>
                <p className='row-main-text'> {category} </p>
                <p className='row-main-text'> {subcategory} </p>
                <p className='row-main-text'> {name} </p>
            </div>
            <div className='card-row-2'>
                <div className='quantity-container'> <span className='span-label'>Expires: </span> <p> {expires} </p> </div>
                <div className='quantity-container'> <span className='span-label'>Quantity: </span> <p> {itemQuantity} </p> </div>
                <div className='quantity-container'> <span className='span-label'>Size: </span> <p> {itemSize} {itemVolumeType} </p> </div>
            </div>
            <div className='card-row buttons-row'>
                <button className='button-edit' onClick={() => toggleModal()} > 
                    <FontAwesomeIcon icon={faEdit} />
                </button>
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
            <EditUserItemModal isShowingModal={isShowingModal} toggleModal={toggleModal} item={item} />
        </div>
    )
}

export default withInventory(UserInventoryCard)