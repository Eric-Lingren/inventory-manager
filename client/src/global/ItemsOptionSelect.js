import React from 'react';
import { withInventory } from '../context/InventoryProvider'


const ItemsOptionSelect = ({ inventoryItems, handleInventoryChange }) => {

    const itemOptions = inventoryItems.map( (item , i) => {
        return(
            <option value={item.id} key={i} > {item.name} </option>
        )
    })
    
    return (
        <select name='selectedItemId' onChange={handleInventoryChange} required={true} >
                <option value="" defaultValue> - Select Subcategory Before Item - </option>
                {itemOptions}
        </select>
    );
}

export default withInventory(ItemsOptionSelect)