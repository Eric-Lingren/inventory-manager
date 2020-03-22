import React, { useState } from 'react';

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
            <CreateNewSubcategory toggleListView={toggleListView} isShowingSubcategories={isShowingList} />
            { isShowingList && <SubcategoryList />  }
        </div>
        </div>
    );
}

export default SubcategoriesAdmin