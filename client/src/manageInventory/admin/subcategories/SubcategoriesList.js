import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import SubcategoryCard from './SubcategoryCard'


const SubcategoriesList = ({ handleGetSubcategories, inventorySubcategories, updatedAdmin }) => {

    useEffect(() => {
        handleGetSubcategories()
    }, [ handleGetSubcategories, updatedAdmin ])


    const mappedSubcategories = inventorySubcategories.map( ( card, i ) => {
        return (
            <SubcategoryCard 
                name={card.name}
                key={i}
                id={card.id}
            />
        )
    })

    
    return (
        <div >
            {mappedSubcategories}
        </div>
    );
}

export default withInventory(withAdmin(SubcategoriesList))