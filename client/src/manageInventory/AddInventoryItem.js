import React from 'react';
import { withInventory } from '../context/InventoryProvider'
import CategoriesOptionSelect from '../global/CategoriesOptionSelect'
import SubcategoryOptionSelect from '../global/SubcategoriesOptionSelect'
import ItemsOptionsSelects from '../global/ItemsOptionSelect'

const AddInventoryItem = ({ addToPersonalInventory, handleInventoryChange, expirationDate, itemAddedToUserList}) => {

    const today = new Date()
    
    return (
        <div >
            <h3> Add Item To My Inventory </h3>
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

                <button> Add to my Inventory </button>
            </form>
            { itemAddedToUserList && <span> Added </span> }
            { itemAddedToUserList === false && <span> Try Again </span> }
        </div>
    );
}

export default withInventory(AddInventoryItem)