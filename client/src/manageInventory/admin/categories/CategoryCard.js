import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { withAdmin } from '../../../context/AdminProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


const CategoryCard = ({ name, id, handleDeleteCategory}) => {
    const [categoryName, setCategoryName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)
    
    return (
        <div className='admin-card-category'>
            <p> Category: <span className='name'> {name} </span>  </p>
            <div>
                <button className='button-edit' onClick={() => setIsEditing(!isEditing)} > 
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className='button-delete' onClick={ () => handleDeleteCategory(id) } > 
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            {/* <EditSubcategoryModal isShowingSubcategoryModal={isShowingSubcategoryModal} toggleEditSubcategoryModal={toggleEditSubcategoryModal} subcategory={subcategory} /> */}
        </div>
    )
}

export default withAdmin(CategoryCard)