import React from 'react';
import { withAdmin } from '../../context/AdminProvider'
import { withInventory } from '../../context/InventoryProvider'
import CreateNewCategory from './categories/CreateNewCategory'
import CategoryList from './categories/CategoriesList'
import CreateNewInventoryItem from './items/CreateNewInventoryItem'
import CategoriesAdmin from './categories/CategoriesAdmin'
import SubcategoriesAdmin from './subcategories/SubcategoriesAdmin'


const AdminPortalHome = ({ handleAdminChange, addCategoryName, addSubcategoryName, handleAddNewCategory, handleAddNewSubcategory, inventoryCategories, status }) => {



    return (
        <div >
            <h2> Admin Portal Home </h2>

            <CreateNewInventoryItem />

            {/* <CreateNewCategory />
            <CategoryList /> */}

            <CategoriesAdmin  />
            <SubcategoriesAdmin inventoryCategories={inventoryCategories} />
            
            
        </div>
    );
}

export default withAdmin(withInventory(AdminPortalHome))