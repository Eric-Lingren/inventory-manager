import React, { useEffect, useState } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'


const CreateNewList= ({ handleInventoryChange, createListName, createList, createdListSuccess }) => {
   

    
    return (
        <div className='new-list-wrapper'>
            <form onSubmit={createList}>
            
            <div >
                <label className='new-list-label'> New List: </label>
                <input 
                    className='text-input add-name'
                    type='text'
                    name='createListName'
                    required={true}
                    value={createListName}
                    onChange={handleInventoryChange}
                />
            
            <button className='default-button'> Create </button>
            </div>
            </form>
           
            {createdListSuccess === true && <span> Created Successfully </span> }
            {createdListSuccess === false && <span> Try Again </span> }
        </div>
    );
}

export default withInventory(CreateNewList)