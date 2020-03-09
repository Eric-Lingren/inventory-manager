import React from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'
import CategoriesOptionSelect from '../global/CategoriesOptionSelect'
import SubcategoryOptionSelect from '../global/SubcategoriesOptionSelect'


const CreateInventoryItem = ({ handleInventoryChange, itemName, handleSaveNewItem, itemAddedSuccessfully }) => {


    
    return (
        <div className='add-inventory-container'>
        <div className='create-inventory-wrapper'>
            <h3 className='create-inventory-header'> Create Custom Item </h3>
            <form onSubmit={handleSaveNewItem}>
            <div className='add-inventory-row-wrapper'>
                <div className='create-inventory-input-wrapper'>
                    <CategoriesOptionSelect />
                </div>
                <div className='create-inventory-input-wrapper'>
                    <SubcategoryOptionSelect />
                </div>
            </div>
            <div className='add-inventory-row-wrapper'>
                <div className='add-inventory-input-wrapper'>
                    <label> Name: </label>
                    <input 
                        className='text-input add-name'
                        type='text'
                        name='itemName'
                        required={true}
                        value={itemName}
                        onChange={handleInventoryChange}
                    />
                </div>
                    <button className='default-button'> Create </button>
                </div>
            </form>
            {itemAddedSuccessfully === true && <span> Success </span> }
            {itemAddedSuccessfully === false && <span> Try Again </span> }
        </div>
        </div>
    );
}

export default withInventory(CreateInventoryItem)