import React from 'react';
import '../../../App.css'
import { withInventory } from '../../../context/InventoryProvider'


const CreateNewList = ({ createList, createListName, handleInventoryChange, createdListSuccess }) => {

    
    return (
        <div >
            <form onSubmit={createList}>
                <div className='add-inventory-row-wrapper'>
                    <div className='add-inventory-input-wrapper'>
                        <label> New List: </label>
                        <input
                            className='text-input add-name'
                            type='text'
                            name='createListName'
                            required={true}
                            value={createListName}
                            onChange={handleInventoryChange}
                        />
                    </div>
                    <button className='default-button create-button'> Create </button>
                </div>
            </form>
            {createdListSuccess === true && <span> Successfully created new list </span> }
            {createdListSuccess === false && <span> Try Again.  Something broke or that list already exists. </span> }
        </div>
    );
}

export default withInventory(CreateNewList)