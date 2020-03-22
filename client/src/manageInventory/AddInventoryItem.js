import React from 'react';
import './manageInventory.css'
import '../App.css'
import { Link } from 'react-router-dom';
import { withInventory } from '../context/InventoryProvider'
import CategoriesOptionSelect from '../global/CategoriesOptionSelect'
import SubcategoryOptionSelect from '../global/SubcategoriesOptionSelect'
import ItemsOptionsSelects from '../global/ItemsOptionSelect'
import ListsOptionSelect from '../global/ListsOptionSelect'

const AddInventoryItem = ({ addToPersonalInventory, handleInventoryChange, expirationDate, quantity, size, volumeType, itemAddedToUserList}) => {

    const today = new Date()
    
    return (
        <div className='add-inventory-container'>
        <div className='add-inventory-wrapper'>
            <h3 className='add-inventory-header'> Add Item: </h3>
            <form onSubmit={addToPersonalInventory}>
                <div className='add-inventory-row-wrapper'>
                    <div className='add-inventory-input-wrapper'>
                        <CategoriesOptionSelect />
                    </div>
                    <div className='add-inventory-input-wrapper'>
                        <SubcategoryOptionSelect />
                    </div>
                    <div className='add-inventory-input-wrapper'>
                        <ItemsOptionsSelects />
                    </div>
                    <div className='link-wrapper'>
                        <p className='navigate-to-create-text'>
                            Don't see what you need?
                        </p>
                        <Link to='admin-portal'>
                            <p className='navigate-to-create-link'>
                                Create Custom Options Here
                            </p>
                        </Link>
                    </div>
                </div>
                <div className='add-inventory-row-wrapper-bottom'>
                    <div className='add-inventory-input-wrapper bottom-inputs-wrapper'>
                        <label> Quantity: </label>
                        <input 
                            className='text-input number-input'
                            type="number" 
                            name='quantity' 
                            onChange={handleInventoryChange}
                            value={quantity}
                            label='Quantity'
                        />
                    </div>
                    <div className='add-inventory-input-wrapper bottom-inputs-wrapper'>
                        <label > Size: </label>
                        <input 
                            className='text-input edit-size' 
                            type="number" 
                            name='size' 
                            onChange={handleInventoryChange}
                            value={size}
                            label='size'
                        />
                    </div>
                    <div className='add-inventory-input-wrapper bottom-inputs-wrapper'>
                        <label> Measurement: </label>
                        <select name='volumeType' className='option-select' onChange={handleInventoryChange} >
                            <option value="" defaultValue> - Select Measurement - </option>
                            <option value="oz" defaultValue> Ounces </option>
                            <option value="lb" defaultValue> Pounds </option>
                            <option value="qt" defaultValue> Quarts </option>
                            <option value="gal" defaultValue> Gallons </option>
                            <option value="gr" defaultValue> Grams </option>
                            <option value="kg" defaultValue> Kilograms </option>
                            <option value="ml" defaultValue> Milliliters </option>
                            <option value="l" defaultValue> Liters </option>
                            <option value="pt" defaultValue> Pints </option>
                            <option value="ct" defaultValue> Count </option>
                        </select>
                    </div>
                
                    <div className='add-inventory-input-wrapper bottom-inputs-wrapper'>
                        <label> Expires: </label>
                        <input 
                            className='text-input date-input'
                            type="date" 
                            min={today} 
                            name='expirationDate' 
                            onChange={handleInventoryChange}
                            value={expirationDate}
                            label='Expiration Date'
                        />
                    </div>
                    <div className='add-inventory-input-wrapper bottom-inputs-wrapper'>
                        <label> List: </label>
                        <ListsOptionSelect />
                    </div>
                    <button className='default-button'> Add </button>
                </div>
            </form>
            { itemAddedToUserList && <span> Added </span> }
            { itemAddedToUserList === false && <span> Try Again </span> }
        </div>
        </div>
    );
}

export default withInventory(AddInventoryItem)