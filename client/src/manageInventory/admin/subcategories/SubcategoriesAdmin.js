import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateNewSubcategory from './CreateNewSubcategory'
import SubcategoryList from './SubcategoriesList'


const SubcategoriesAdmin = () => {

    const[ isShowingList, setIsShowingList ] = useState(false)

    const toggleListView = () => {
        setIsShowingList(!isShowingList)
    }

    
    return (
        <div className='add-inventory-container'>
            <div className='create-inventory-wrapper'>
                <h3 className='create-inventory-header'> Subcategory Management: </h3>

                <CreateNewSubcategory  />
                
                <div className='admin-link-wrapper'>
                    <span className='navigate-to-create-link' onClick={toggleListView}>
                        { isShowingList ? 'Hide Subcategories' : 'Manage Subcategories' }
                    </span>
                    <Link to='manage-inventory' className='link'>
                        <span className='navigate-to-create-link'>
                            Back To Inventory
                        </span>
                    </Link>
                </div>

                { isShowingList && <SubcategoryList />  }
            </div>
        </div>
    );
}

export default SubcategoriesAdmin