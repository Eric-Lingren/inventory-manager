import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import ItemCard from './ItemCard'


const ItemList = ({ handleGetItems, inventoryItems, updatedAdmin, clearOptionSelects }) => {

    useEffect(() => {
        handleGetItems()
    }, [ handleGetItems ])

    useEffect(() => {
        return () => clearOptionSelects()
    }, [ clearOptionSelects ])


    const mappedItems = inventoryItems.map( ( item , i ) => {
        let subcategoryName;
        let category;
        item.Subcategory ? subcategoryName = item.Subcategory.name : subcategoryName = ''
        item.Subcategory ? category = item.Subcategory.Category.name : category = ''
        return (
            <ItemCard 
                name={item.name}
                key={i}
                id={item.id}
                category={category}
                subcategory={subcategoryName}
                item={item}
            />
        )
    })

    
    return (
        <div >
            {mappedItems}
        </div>
    );
}

export default withInventory(withAdmin(ItemList))