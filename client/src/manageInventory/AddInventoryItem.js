import React from 'react';
import './manageInventory.css'
import '../App.css'
import { withInventory } from '../context/InventoryProvider'
import CategoriesOptionSelect from '../global/CategoriesOptionSelect'
import SubcategoryOptionSelect from '../global/SubcategoriesOptionSelect'
import ItemsOptionsSelects from '../global/ItemsOptionSelect'

const AddInventoryItem = ({ addToPersonalInventory, handleInventoryChange, expirationDate, quantity, size, volumeType, itemAddedToUserList}) => {

    const today = new Date()
    
    return (
        <div className='add-inventory-container'>
        <div className='add-inventory-wrapper'>
            <h3 className='add-inventory-header'> Add Item To My Inventory </h3>
            <form onSubmit={addToPersonalInventory}>
                <CategoriesOptionSelect />
                <SubcategoryOptionSelect />
                <ItemsOptionsSelects />

                <aside className="sessions-date">
                    <label> Expiration Date: </label>
                    <div className="events-filter-date-range-wrap">
                        <input 
                            className="events-filter-date sessions" 
                            type="date" 
                            min={today} 
                            name='expirationDate' 
                            onChange={handleInventoryChange}
                            value={expirationDate}
                            label='Expiration Date'
                        />
                    </div>
                </aside>

                <aside className="quantity">
                    <label> Quantity: </label>
                        <input 
                            // className="events-filter-date sessions" 
                            type="number" 
                            name='quantity' 
                            onChange={handleInventoryChange}
                            value={quantity}
                            label='Quantity'
                        />
                </aside>

                <aside className="size">
                    <label> Size: </label>
                        <input 
                            // className="events-filter-date sessions" 
                            type="number" 
                            name='size' 
                            onChange={handleInventoryChange}
                            value={size}
                            label='size'
                        />
                </aside>

                <select name='volumeType' onChange={handleInventoryChange} >
                    <option value="" defaultValue> - Select Measurement Type - </option>
                    <option value="oz" defaultValue> Ounces </option>
                    <option value="lb" defaultValue> Pounds </option>
                    <option value="qt" defaultValue> Quarts </option>
                    <option value="gal" defaultValue> Gallons </option>
                    <option value="gr" defaultValue> Grams </option>
                    <option value="kg" defaultValue> Kilograms </option>
                    <option value="ml" defaultValue> Milliliters </option>
                    <option value="l" defaultValue> Liters </option>
                    <option value="pt" defaultValue> Pints </option>
                </select>

                <button className='default-button'> Add To Inventory </button>
            </form>
            { itemAddedToUserList && <span> Added </span> }
            { itemAddedToUserList === false && <span> Try Again </span> }
        </div>
        </div>
    );
}

export default withInventory(AddInventoryItem)