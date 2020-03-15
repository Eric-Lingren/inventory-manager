import React from 'react';
import './userInventory.css'
import '../App.css'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { withInventory } from '../context/InventoryProvider'
import EditUserItemModal from './EditUserItemModal'

const UserInventoryCard = ({ id, category, subcategory, name, itemQuantity, itemSize, itemVolumeType, itemExpiration, handleDeleteUserInventoryItem, handleToggleEditItemModal, markItemUsed, item, markItemAdded }) => {

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
                {/* { isShowingEditCard ?
                     <input 
                     className='text-input date-input'
                     type="date"
                     onChange={handleEditItemDate}
                     value={itemDate}
                    />
                : */}
                    <div className='quantity-container'> <span className='span-label'>Expires: </span> <p> {expires} </p> </div>
                {/* } */}
                <div className='quantity-container'> <span className='span-label'>Quantity: </span> <p> {itemQuantity} </p> </div>
                {/* { isShowingEditCard ?
                    <>
                     <input 
                        className='text-input number-input edit-size'
                        type="number"
                        onChange={handleEditItemSize}
                        value={itemSizeEdit}
                    />
                        <select name='volumeType' className='option-select' >
                            <option value="" defaultValue> - Select Measurement Type - </option>
                            <option value="oz" defaultValue> Ounces </option>
                            <option value="lb" defaultValue> Pounds </option>
                            <option value="qt" defaultValue> Quarts </option>
                            <option value="gal" defaultValue> Gallons </option>
                            <option value="gr" defaultValue> Grams </option>
                            <option value="kg" defaultValue> Kilograms </option>
                            <option value="ml" defaultValue> Milliliters </option>
                            <option value="l" defaultValue> Liters </option>
                            <option value="pt" defaultValue> Pints </option>
                            <option value="ct" defaultValue> Count </option>
                        </select>
                    </> */}
                {/* : */}
                    <div className='quantity-container'> <span className='span-label'>Size: </span> <p> {itemSize} {itemVolumeType} </p> </div>
                {/* } */}
                
            </div>
            <div className='card-row buttons-row'>
                <button className='button-edit' onClick={() => handleToggleEditItemModal(item)} > 
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
            <EditUserItemModal />

            {/* { isEditingInventoryCard && <EditUserItemModal /> } */}
        </div>
    )
}

export default withInventory(UserInventoryCard)