import React from 'react';
import Modal from 'react-modal'
import '../../../App.css'
import '../../../modal.css'
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import CategoriesOptionSelect from '../../../global/CategoriesOptionSelect'
import SubategoriesOptionSelect from '../../../global/SubcategoriesOptionSelect'


const EditSubcategoryModal= ({ isShowingItemModal, isShowingSubcategoryModal, toggleEditItemModal, handleEditingObject, item, editingObject, handleEditItem, itemUpdated, handleGetItems }) => {

    const close = () => {
        toggleEditItemModal()
        handleGetItems()
    }


	return (
        <Modal
            isOpen={isShowingItemModal}
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

                <h3>Editing Item: {item.name} </h3>

                <form >

                    <div className='edit-inventory-input-wrapper'>
                            <label> Item Name: </label>
                            <input 
                                className='text-input number-input edit-input'
                                type="text" 
                                name='name' 
                                onChange={handleEditingObject}
                                value={editingObject.name}
                                label='Quantity'
                            />
                    </div>

                    <div className='edit-inventory-input-wrapper'>
                        <label> Category: </label>
                        <CategoriesOptionSelect isEditingSubcategory={true} />
                    </div>

                    <div className='edit-inventory-input-wrapper'>
                        <label> Subcategory: </label>
                        <SubategoriesOptionSelect isEditingItem={true} />
                    </div>

                    <button className='default-button' onClick={handleEditItem}> Save Changes </button>

                    {itemUpdated && <span> Successfully Updated </span>}
                    {itemUpdated === false && <span> Something didn't work.  Pleas try again. </span>}
                </form>
            </div>
        </Modal>
	)
}

export default withAdmin(withInventory(EditSubcategoryModal))