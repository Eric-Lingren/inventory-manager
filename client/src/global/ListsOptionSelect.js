import React, { useEffect } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'


const ListsOptionSelect = ({ getLists, userLists, handleInventoryChange, isEditing, handleEditingItem }) => {

    useEffect(() => {
        getLists()
    }, [ getLists ])

    const listOptions = userLists.map( (list , i) => {
        return(
            <option value={list.id} key={i}> {list.name} </option>
        )
    })

    const handleChange = (e) => {
        handleInventoryChange(e)
        if(isEditing) handleEditingItem(e)
    }

    
    return (
        <select name='selectedListId' className='option-select' onChange={(e) => handleChange(e)} >
                <option value="" defaultValue> - Select List - </option>
                {listOptions}
        </select>
    );
}

export default withInventory(ListsOptionSelect)