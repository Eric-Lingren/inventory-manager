import React from 'react';
import Modal from 'react-modal'
import './userInventory.css'
import '../App.css'
import '../modal.css'
import { withInventory } from '../context/InventoryProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import ListsOptionSelect from '../global/ListsOptionSelect'


const EditUserItemModal= ({ isShowingModal, toggleModal, handleEditingItem, item, editingItem, handleEditUserInventoryItem, updateMessage, clearMesages }) => {
    

    let editingExpire;
    if(item.expirationDate) editingExpire = item.expirationDate.slice(0,10)
    const today = new Date()

    const close = () => {
        toggleModal()
        clearMesages()
    }

    
	return (
        <Modal
            isOpen={isShowingModal}
            contentLabel='Edit Item'
            modalStyle='modalStyle'
            className='main-modal'
            overlayClassName='main-modal-overlay'
            ariaHideApp={false}
        >
            <div className='main-modal-body'>

                <div className='close-icon-wrapper' onClick={close}>
                    <FontAwesomeIcon icon={faTimesCircle} className='close-icon'  />
                </div>

                <h3>Editing: {item.Item.name} </h3>

                <form onSubmit={handleEditUserInventoryItem}>
                    <div className='edit-inventory-input-wrapper'>
                        <label> Quantity: </label>
                        <input 
                            className='text-input number-input edit-input'
                            type="number" 
                            name='quantity' 
                            onChange={handleEditingItem}
                            value={editingItem.quantity}
                            label='Quantity'
                        />
                    </div>
                    <div className='edit-inventory-input-wrapper'>
                        <label > Size: </label>
                        <input 
                            className='text-input edit-size' 
                            type="number" 
                            name='size' 
                            onChange={handleEditingItem}
                            value={editingItem.size}
                            label='size'
                        />
                    </div>
                    <div className='edit-inventory-input-wrapper'>
                        <label > Measurement: </label>
                        <select name='volumeType' className='option-select' value={editingItem.volumeType} onChange={handleEditingItem} >
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
                    <div className='edit-inventory-input-wrapper'>
                        <label> Expires: </label>
                        <input 
                            className='text-input date-input '
                            type="date" 
                            min={today} 
                            name='expirationDate' 
                            onChange={handleEditingItem}
                            value={editingExpire}
                            label='Expiration Date'
                        />
                    </div>
                    <div className='edit-inventory-input-wrapper'>
                        <label> List: </label>
                        <ListsOptionSelect isEditing={true}/>
                    </div>
                    <button className='default-button'> Save Changes </button>
                    {updateMessage.length > 1 && <span> {updateMessage} </span>}
                </form>
            </div>
        </Modal>
	)
}

export default withInventory(EditUserItemModal)