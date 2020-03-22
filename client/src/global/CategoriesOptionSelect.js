import React, { useEffect } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'
import { withAdmin } from '../context/AdminProvider'


const CategoriesOptionSelect = ({ handleGetCategories, inventoryCategories, handleInventoryChange, handleSetSelectedCategory, selectedCategoryId, handleGetSubcategories, clearSelectedOptions, clearOptionSelects, isEditingSubcategory, isEditingItem, clearSelectedSubcategoryId }) => {

    useEffect(() => {
        handleGetCategories()
    }, [ handleGetCategories ])

    
    useEffect(() => {
        return () => clearSelectedOptions()
    }, [ clearSelectedOptions ])


    useEffect(() => {
        return () => clearOptionSelects()
    }, [ clearOptionSelects ])


    useEffect(() => {
        handleGetSubcategories(selectedCategoryId)
    }, [ handleGetSubcategories, selectedCategoryId ])


    const handleChange = (e) => {
        clearSelectedSubcategoryId()
        if(isEditingSubcategory){
            handleSetSelectedCategory(e.target.value)
        }else if(isEditingItem){
            handleInventoryChange(e)
        }else{
            handleInventoryChange(e)
        } 
    }
    


    const categoryOptions = inventoryCategories.map( (category , i) => {
        return(
            <option value={category.id} key={i}> {category.name} </option>
        )
    })

    
    return (
        <select name='selectedCategoryId' className='option-select' onChange={(e) => handleChange(e)} required={true} >
                <option value={selectedCategoryId}>- Select Category -</option>
                {categoryOptions}
        </select>
    );
}

export default withInventory(withAdmin(CategoriesOptionSelect))