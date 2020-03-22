import React from 'react';
// import { Link } from 'react-router-dom';
import { withAdmin } from '../../context/AdminProvider'
import { withInventory } from '../../context/InventoryProvider'
import CreateNewCategory from './categories/CreateNewCategory'
import CreateNewSubcategory from './subcategories/CreateNewSubcategory'
import CategoryList from './categories/CategoriesList'
import SubcategoryList from './subcategories/SubcategoriesList'
import CreateNewInventoryItem from './items/CreateNewInventoryItem'


const AdminPortalHome = ({ handleAdminChange, addCategoryName, addSubcategoryName, handleAddNewCategory, handleAddNewSubcategory, inventoryCategories, status }) => {

    const categoryOptions = inventoryCategories.map( (category , i) => {
        return(
            <option value={category.id} key={i}> {category.name} </option>
        )
    })

    return (
        <div >
            <h2> Admin Portal Home </h2>

            <CreateNewInventoryItem />

            <CreateNewCategory />
            <CategoryList />

            <CreateNewSubcategory categoryOptions={categoryOptions} />
            <SubcategoryList />
            
        </div>
    );
}

export default withAdmin(withInventory(AdminPortalHome))