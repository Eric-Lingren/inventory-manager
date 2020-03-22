import React from 'react';
import '../../../App.css'
import { Link } from 'react-router-dom';
import { withAdmin } from '../../../context/AdminProvider'


const CreateNewCategory = ({ handleAddNewCategory, addCategoryName, handleAdminChange, categoryCreatedSuccessfully }) => {


    
    return (
        <div className='add-inventory-container'>
        <div className='create-inventory-wrapper'>
        <h3 className='create-inventory-header'> Create New Category </h3>
            <form onSubmit={handleAddNewCategory}>
                <div className='add-inventory-row-wrapper'>
                    <div className='add-inventory-input-wrapper'>
                        <label> Category Name: </label>
                        <input
                            className='text-input add-name'
                            type='text'
                            name='addCategoryName'
                            required={true}
                            value={addCategoryName}
                            onChange={handleAdminChange}
                        />
                    </div>
                    <button className='default-button create-button'> Create </button>
                </div>
            </form>
            {categoryCreatedSuccessfully === true && <span> Success </span> }
            {categoryCreatedSuccessfully === false && <span> Try Again.  Something broke or that category already exists. </span> }
            <Link to='manage-inventory'>
                <span className='navigate-to-create-link'>
                    Back To Inventory
                </span>
            </Link>
        </div>
        </div>
    );
}

export default withAdmin(CreateNewCategory)