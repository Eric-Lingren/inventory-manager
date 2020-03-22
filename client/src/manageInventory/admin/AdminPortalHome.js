import React from 'react';
import { withAdmin } from '../../context/AdminProvider'
import { withInventory } from '../../context/InventoryProvider'
import ItemAdmin from './items/ItemAdmin'
import CategoriesAdmin from './categories/CategoriesAdmin'
import SubcategoriesAdmin from './subcategories/SubcategoriesAdmin'
import ListsAdmin from './lists/ListsAdmin'


const AdminPortalHome = ({ inventoryCategories }) => {



    return (
        <div >
            <h2> Admin Portal </h2>

            <ItemAdmin />
            <CategoriesAdmin  />
            <SubcategoriesAdmin inventoryCategories={inventoryCategories} />
            <ListsAdmin />
            
        </div>
    );
}

export default withAdmin(withInventory(AdminPortalHome))