import React from 'react';
import '../../../App.css'
import '../admin.css'
import { withAdmin } from '../../../context/AdminProvider'
import CategoriesOptionSelect from '../../../global/CategoriesOptionSelect'


const CreateNewCategory = ({ handleAddNewSubcategory, addSubcategoryName, handleAdminChange, subcategoryCreatedSuccessfully }) => {


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
                        <CategoriesOptionSelect isEditingSubcategory={true} />
                    </div>
                    <button className='default-button create-button'> Create </button>
                </div>
            </form>
            {subcategoryCreatedSuccessfully === true && <span> Successfully created new Subcategory </span> }
            {subcategoryCreatedSuccessfully === false && <span> Try Again.  Something broke or that category already exists. </span> }
            
           
        </div>
    );
}

export default withAdmin(CreateNewCategory)