import React from 'react';
import '../../../App.css'

import '../admin.css'
import { Link } from 'react-router-dom';
import { withAdmin } from '../../../context/AdminProvider'
import CategoriesOptionSelect from '../../../global/CategoriesOptionSelect'


const CreateNewCategory = ({ toggleListView, handleAddNewSubcategory, addSubcategoryName, handleAdminChange, subcategoryCreatedSuccessfully, isShowingSubcategories }) => {


    
    return (
        <div>
        
            <form onSubmit={handleAddNewSubcategory}>
                <div className='add-inventory-row-wrapper'>
                    <div className='add-inventory-input-wrapper'>
                        <label> New Subcategory: </label>
                        <input
                            className='text-input add-name'
                            type='text'
                            name='addSubcategoryName'
                            required={true}
                            value={addSubcategoryName}
                            onChange={handleAdminChange}
                        />
                        <span> in </span>
                        <CategoriesOptionSelect />
                    </div>
                    <button className='default-button create-button'> Create </button>
                </div>
            </form>
            {subcategoryCreatedSuccessfully === true && <span> Successfully created new Subcategory </span> }
            {subcategoryCreatedSuccessfully === false && <span> Try Again.  Something broke or that category already exists. </span> }
            
            <div className='admin-link-wrapper'>
                <span className='navigate-to-create-link' onClick={toggleListView}>
                    { isShowingSubcategories ? 'Hide Subcategories' : 'Manage Subcategories' }
                </span>
                <Link to='manage-inventory' className='link'>
                    <span className='navigate-to-create-link'>
                        Back To Inventory
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default withAdmin(CreateNewCategory)