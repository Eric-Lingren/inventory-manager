import React from 'react';
import '../../../App.css'
import { Link } from 'react-router-dom';
import { withAdmin } from '../../../context/AdminProvider'


const CreateNewCategory = ({ handleAddNewCategory, addCategoryName, handleAdminChange, categoryCreatedSuccessfully }) => {


    
    return (
        <div >
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
            {categoryCreatedSuccessfully === true && <span> Successfully created new Category </span> }
            {categoryCreatedSuccessfully === false && <span> Try Again.  Something broke or that category already exists. </span> }
        </div>
    );
}

export default withAdmin(CreateNewCategory)