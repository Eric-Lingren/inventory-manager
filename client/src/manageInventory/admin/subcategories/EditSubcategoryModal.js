import React from 'react';
import Modal from 'react-modal'
import '../../../App.css'
import '../../../modal.css'
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import CategoriesOptionSelect from '../../../global/CategoriesOptionSelect'


const EditSubcategoryModal= ({ isShowingSubcategoryModal, toggleEditSubcategoryModal, handleEditingObject, subcategory, item, editingObject, handleEditSubcategory, itemUpdated, handleGetSubcategories }) => {

    const close = () => {
        toggleEditSubcategoryModal()
        handleGetSubcategories()
    }


	return (
        <Modal
            isOpen={isShowingSubcategoryModal}
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

                <h3>Editing Subcategory: {subcategory.name} </h3>

                <form >

                    <div className='edit-inventory-input-wrapper'>
                        <label> Subcategory Name: </label>
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
                        <label> In Category: </label>
                        <CategoriesOptionSelect isEditingSubcategory={true} />
                    </div>

                    <button className='default-button' onClick={handleEditSubcategory}> Save Changes </button>

                    {itemUpdated && <span> Successfully Updated </span>}
                    {itemUpdated === false && <span> Something didn't work.  Pleas try again. </span>}
                </form>
            </div>
        </Modal>
	)
}

export default withAdmin(withInventory(EditSubcategoryModal))