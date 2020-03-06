import React, { useEffect } from 'react';
import { withInventory } from '../context/InventoryProvider'


const CategoriesOptionSelect = ({ handleGetCategories, inventoryCategories, handleInventoryChange, selectedCategoryId, handleGetSubcategories }) => {

    useEffect(() => {
        handleGetCategories()
    }, [ handleGetCategories ])

    useEffect(() => {
        handleGetSubcategories(selectedCategoryId)
    }, [ handleGetSubcategories, selectedCategoryId ])

    const categoryOptions = inventoryCategories.map( (category , i) => {
        return(
            <option value={category.id} key={i}> {category.name} </option>
        )
    })

    
    return (
        <select name='selectedCategoryId' onChange={handleInventoryChange} required={true} >
                <option value="" defaultValue> - Select Category - </option>
                {categoryOptions}
        </select>
    );
}

export default withInventory(CategoriesOptionSelect)