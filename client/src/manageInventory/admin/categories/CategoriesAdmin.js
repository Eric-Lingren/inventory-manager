import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import CreateNewCategory from './CreateNewCategory'
import CategoryList from './CategoriesList'



const CategoriesAdmin = ({ handleGetCategories }) => {

    const[ isShowingList, setIsShowingList ] = useState(false)

    const toggleListView = () => {
        setIsShowingList(!isShowingList)
        handleGetCategories()
    }

    
    return (
        <div className='add-inventory-container'>
            <div className='create-inventory-wrapper'>
                <h3 className='create-inventory-header'> Category Management: </h3>

                <CreateNewCategory  />
                
                <div className='admin-link-wrapper'>
                    <span className='navigate-to-create-link' onClick={toggleListView}>
                        { isShowingList ? 'Hide Categories' : 'Manage Cubcategories' }
                    </span>
                    <Link to='manage-inventory' className='link'>
                        <span className='navigate-to-create-link'>
                            Back To Inventory
                        </span>
                    </Link>
                </div>

                { isShowingList && <CategoryList />  }
            </div>
        </div>
    );
}

export default withInventory(CategoriesAdmin)