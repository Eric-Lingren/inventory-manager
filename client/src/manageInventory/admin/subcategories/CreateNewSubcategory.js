import React from 'react';
import '../../../App.css'
import { Link } from 'react-router-dom';
import { withAdmin } from '../../../context/AdminProvider'


const CreateNewCategory = ({ handleAddNewSubcategory, addSubcategoryName, categoryOptions, handleAdminChange, categoryCreatedSuccessfully }) => {


    
    return (
        <div className='add-inventory-container'>
        <div className='create-inventory-wrapper'>
        <h3 className='create-inventory-header'> Create New Subcategory </h3>
            <form onSubmit={handleAddNewSubcategory}>
                <div className='add-inventory-row-wrapper'>
                    <div className='add-inventory-input-wrapper'>
                        <label> Subcategory Name: </label>
                        <input
                            className='text-input add-name'
                            type='text'
                            name='addSubcategoryName'
                            required={true}
                            value={addSubcategoryName}
                            onChange={handleAdminChange}
                        />
                        <span> in </span>
                        <select name='categoryId' onChange={handleAdminChange} required={true} >
                            <option value="" defaultValue> - Select Category - </option>
                            {categoryOptions}
                        </select>
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