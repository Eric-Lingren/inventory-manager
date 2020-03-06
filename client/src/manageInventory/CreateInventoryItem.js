import React from 'react';
// import { Link } from 'react-router-dom';
import { withInventory } from '../context/InventoryProvider'
import CategoriesOptionSelect from '../global/CategoriesOptionSelect'
import SubcategoryOptionSelect from '../global/SubcategoriesOptionSelect'


const CreateInventoryItem = ({ handleInventoryChange, itemName, handleSaveNewItem, itemAddedSuccessfully }) => {


    
    return (
        <div >
            <h3> Create New Custom Inventory Item </h3>
            <form onSubmit={handleSaveNewItem}>
                <CategoriesOptionSelect />
                <SubcategoryOptionSelect />
                <label> Name </label>
                <input 
                    type='text'
                    name='itemName'
                    required={true}
                    value={itemName}
                    onChange={handleInventoryChange}
                />
                <button> Add Item To My Options </button>
            </form>
            {itemAddedSuccessfully === true && <span> Success </span> }
            {itemAddedSuccessfully === false && <span> Try Again </span> }
            
        </div>
    );
}

export default withInventory(CreateInventoryItem)