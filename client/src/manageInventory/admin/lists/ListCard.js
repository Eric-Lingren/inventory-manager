import React, { useState } from 'react';
import { withAdmin } from '../../../context/AdminProvider'
import { withInventory } from '../../../context/InventoryProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheckSquare } from '@fortawesome/free-solid-svg-icons'


const ListCard = ({ name, id, handleEditList, handleDeleteList, getLists }) => {

    const [listName, setListName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)

    const handleListNameChange = (e) => {
        const {value} = e.target
        setListName(value)
    }

    const saveChanges = () => {
        setIsEditing(false)
        handleEditList(listName, id)
        getLists()
    }

    return (
        <div className='list-card-wrapper'>
            <div className='list-card-text-wrapper'>
            { !isEditing ?
                <p> List: <span className='name'> {name} </span>  </p>
                :
                <p> List: 
                    <input
                        className='text-input edit-name'
                        type='text'
                        value={listName}
                        onChange={handleListNameChange}
                    />
                </p>
            }
            </div>
            <div className='button-wrapper'>
                { !isEditing ?
                    <button className='button-edit' onClick={() => setIsEditing(true)} > 
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    :
                    <button className='button-plus' onClick={saveChanges} > 
                        <FontAwesomeIcon icon={faCheckSquare} />
                    </button>
                }
                <button className='button-delete' onClick={() => handleDeleteList(id)}> 
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
            </div>
    )
}

export default withAdmin(withInventory(ListCard))