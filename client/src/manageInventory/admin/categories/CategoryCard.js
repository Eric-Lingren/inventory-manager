import React, { useState } from 'react';
import { withAdmin } from '../../../context/AdminProvider'
import { withInventory } from '../../../context/InventoryProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheckSquare } from '@fortawesome/free-solid-svg-icons'


const CategoryCard = ({ name, id, handleDeleteCategory, handleEditCategory, handleGetCategories }) => {

    const [categoryName, setCategoryName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)

    const handleNameChange = (e) => {
        const {value} = e.target
        setCategoryName(value)
    }

    const saveChanges = (e) => {
        e.preventDefault()
        setIsEditing(false)
        handleEditCategory(categoryName, id)
        handleGetCategories()
    }


    return (
        <div className='admin-card-category'>
            { !isEditing ?
                <p> Category: <span className='name'> {name} </span>  </p>
                :
                <p> Category: 
                    <input
                        className='text-input edit-name'
                        type='text'
                        value={categoryName}
                        onChange={handleNameChange}
                    />
                </p>
            }
            <div>
                { !isEditing ?
                    <button className='button-edit' onClick={() => setIsEditing(true)} > 
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    :
                    <button className='button-plus' onClick={saveChanges} > 
                        <FontAwesomeIcon icon={faCheckSquare} />
                    </button>
                }
                <button className='button-delete' onClick={() => handleDeleteCategory(id)} > 
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            </div>
    )
}

export default withAdmin(withInventory(CategoryCard))