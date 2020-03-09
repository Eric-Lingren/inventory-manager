import React from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'


const ItemsOptionSelect = ({ inventoryItems, handleInventoryChange }) => {

    const itemOptions = inventoryItems.map( (item , i) => {
        return(
            <option value={item.id} key={i} > {item.name} </option>
        )
    })
    
    return (
        <select name='selectedItemId' className='option-select' onChange={handleInventoryChange} required={true} >
                <option value="" defaultValue> - Select Item - </option>
                {itemOptions}
        </select>
    );
}

export default withInventory(ItemsOptionSelect)