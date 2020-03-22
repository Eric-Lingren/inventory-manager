import React from 'react';
import { withAdmin } from '../../context/AdminProvider'
import { withInventory } from '../../context/InventoryProvider'
import CreateNewInventoryItem from './items/CreateNewInventoryItem'
import CategoriesAdmin from './categories/CategoriesAdmin'
import SubcategoriesAdmin from './subcategories/SubcategoriesAdmin'
import ListsAdmin from './lists/ListsAdmin'


const AdminPortalHome = ({ inventoryCategories }) => {



    return (
        <div >
            <h2> Admin Portal </h2>

            <CreateNewInventoryItem />
            <CategoriesAdmin  />
            <SubcategoriesAdmin inventoryCategories={inventoryCategories} />
            <ListsAdmin />
            
        </div>
    );
}

export default withAdmin(withInventory(AdminPortalHome))