import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import './userInventory.css'
import '../App.css'
import '../modal.css'
import { withInventory } from '../context/InventoryProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import ListsOptionSelect from '../global/ListsOptionSelect'


const EditUserItemModal= ({ isEditingInventoryCard, handleToggleEditItemModal, editingItem }) => {
    let editingExpires;
    // useEffect(() => {
        if(editingItem.expirationDate) editingExpires = editingItem.expirationDate.slice(0,10)
    // }, [ ])

    const today = new Date()
    // let editingExpires = editingItem.expirationDate.slice(0,10)

    // console.log(editingItem)
    // console.log(editingExpires)
	return (
        <Modal
            isOpen={isEditingInventoryCard}
            contentLabel='Edit Item'
            modalStyle='modalStyle'
            className='main-modal'
            overlayClassName='main-modal-overlay'
            ariaHideApp={false}

        >
            
            <div className='main-modal-body'>
                <div className='close-icon-wrapper' onClick={() => handleToggleEditItemModal({})}>
                    <FontAwesomeIcon icon={faTimesCircle} className='close-icon'  />
                </div>
                <h3>Editing List Item:  </h3>
                <form onSubmit={null}>

                    <div className='add-inventory-input-wrapper'>
                        <label> Quantity: </label>
                        <input 
                            className='text-input number-input'
                            type="number" 
                            name='quantity' 
                            onChange={null}
                            value={editingItem.quantity}
                            label='Quantity'
                        />
                    </div>
                    <div className='add-inventory-input-wrapper'>
                        <label > Size: </label>
                        <input 
                            className='text-input edit-size' 
                            type="number" 
                            name='size' 
                            onChange={null}
                            value={editingItem.size}
                            label='size'
                        />
                    </div>
                    <div className='add-inventory-input-wrapper'>
                        <select name='volumeType' className='option-select' onChange={null} >
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
                    </div>
                    
                    <div className='add-inventory-input-wrapper'>
                        <label> Expires: </label>
                        <input 
                            className='text-input date-input'
                            type="date" 
                            min={today} 
                            name='expirationDate' 
                            onChange={null}
                            value={editingExpires}
                            label='Expiration Date'
                        />
                    </div>
                    <ListsOptionSelect />
                    <button className='default-button'> Save Edits </button>

            </form>
            </div>
        </Modal>
	)
}

export default withInventory(EditUserItemModal)