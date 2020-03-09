import React, { useEffect } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'


const ListsOptionSelect = ({ getLists, userLists, handleInventoryChange }) => {

    useEffect(() => {
        getLists()
    }, [ getLists ])

    const listOptions = userLists.map( (list , i) => {
        return(
            <option value={list.id} key={i}> {list.name} </option>
        )
    })

    
    return (
        <select name='selectedListId' className='option-select' onChange={handleInventoryChange} >
                <option value="" defaultValue> - Select List - </option>
                {listOptions}
        </select>
    );
}

export default withInventory(ListsOptionSelect)