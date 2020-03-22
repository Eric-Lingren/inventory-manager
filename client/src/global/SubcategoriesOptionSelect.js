import React, { useEffect } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'


const SubcategoriesOptionSelect = ({ inventorySubcategories, handleInventoryChange, handleGetItems, selectedCategoryId, selectedSubcategoryId, isEditingItem, getSubategoryIdCallback }) => {

    useEffect(() => {
        handleGetItems(selectedSubcategoryId)
    }, [ handleGetItems, selectedSubcategoryId ])


    const handleChange = (e) => {
        if(isEditingItem){
            getSubategoryIdCallback(e.target.value)
        }else{
            handleInventoryChange(e)
        } 
    }


    const subcategoryOptions = inventorySubcategories.map( (subcategory , i) => {
        return(
            <option value={subcategory.id} key={i}> {subcategory.name} </option>
        )
    })

    
    return (
        <select  name='selectedSubcategoryId' className='option-select' onChange={(e) => handleChange(e)} required={true} >
            <option >- Select Subcategory -</option>
            { selectedCategoryId && 
                <>
                {subcategoryOptions}
                </>
            }
            
        </select>
    );
}

export default withInventory(SubcategoriesOptionSelect)