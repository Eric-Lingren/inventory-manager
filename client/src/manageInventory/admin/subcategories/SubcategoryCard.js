import React, { useState } from 'react';
import '../admin.css'
import { withAdmin } from '../../../context/AdminProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import EditSubcategoryModal from './EditSubcategoryModal'


const SubcategoryCard = ({ name, category, id,  subcategory, handleDeleteSubcategory, handleSetEditingObject }) => {


    const [isShowingSubcategoryModal, setIsShowingSubcategoryModal] = useState(false)

    const toggleEditSubcategoryModal = () => {
        handleSetEditingObject(subcategory)
        setIsShowingSubcategoryModal(!isShowingSubcategoryModal)
    }

    return (
        <div className='admin-card'>
            <p> Subcategory: <span className='name'> {name} </span> </p>
            <p> In Category: <span className='name'> {category} </span>  </p>
            <div>
                <button className='button-edit' 
                onClick={toggleEditSubcategoryModal}
                 > 
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className='button-delete' onClick={ () => handleDeleteSubcategory(id) } > 
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            <EditSubcategoryModal isShowingSubcategoryModal={isShowingSubcategoryModal} 
            toggleEditSubcategoryModal={toggleEditSubcategoryModal} 
            subcategory={subcategory} />
        </div>
    );
}

export default withAdmin(SubcategoryCard)