import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import CategoryCard from './CategoryCard'


const CategoriesList = ({ handleGetCategories, inventoryCategories, updatedAdmin, clearOptionSelects }) => {

    useEffect(() => {
        handleGetCategories()
    }, [ handleGetCategories, updatedAdmin ])

    useEffect(() => {
        return () => clearOptionSelects()
    }, [ clearOptionSelects ])


    const mappedCategories = inventoryCategories.map( ( card, i ) => {
        return (
            <CategoryCard 
                name={card.name}
                key={i}
                id={card.id}
            />
        )
    })

    return (
        <div >
            {mappedCategories}
        </div>
    );
}

export default withInventory(withAdmin(CategoriesList))