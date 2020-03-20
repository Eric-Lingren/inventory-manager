import React, { useEffect } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'


const SubcategoriesOptionSelect = ({ inventorySubcategories, handleInventoryChange, handleGetItems, selectedCategoryId, selectedSubcategoryId }) => {

    useEffect(() => {
        handleGetItems(selectedSubcategoryId)
    }, [ handleGetItems, selectedSubcategoryId ])

    const subcategoryOptions = inventorySubcategories.map( (subcategory , i) => {
        return(
            <option value={subcategory.id} key={i}> {subcategory.name} </option>
        )
    })

    
    return (
        <select name='selectedSubcategoryId' className='option-select' onChange={handleInventoryChange} required={true} >
            <option value="" defaultValue> - Select Subcategory - </option>
            { selectedCategoryId && 
                <>
                {subcategoryOptions}
                </>
            }
            
        </select>
    );
}

export default withInventory(SubcategoriesOptionSelect)