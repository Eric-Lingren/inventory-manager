import React, { useState } from 'react';
import '../admin.css'
import { withAdmin } from '../../../context/AdminProvider'
import { withInventory } from '../../../context/InventoryProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import EditItemModal from './EditItemModal'


const ItemCard = ({ name,  id, item, category, subcategory, handleDeleteItem, handleSetEditingObject }) => {


    const [isShowingItemModal, setIsShowingItemModal] = useState(false)

    const toggleEditItemModal = () => {
        handleSetEditingObject(item)
        setIsShowingItemModal(!isShowingItemModal)
    }

    return (
        <div className='admin-card-item'>
            <p> Item: <span className='name'> {name} </span> </p>
            <p> Subcategory: <span className='name'> {subcategory} </span>  </p>
            <p> Category: <span className='name'> {category} </span>  </p>
            <div>
                <button className='button-edit' onClick={toggleEditItemModal} > 
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className='button-delete' onClick={ () => handleDeleteItem(id) } > 
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <EditItemModal isShowingItemModal={isShowingItemModal} 
            toggleEditItemModal={toggleEditItemModal} 
            item={item} />
        </div>
    );
}

export default withAdmin(withInventory(ItemCard))