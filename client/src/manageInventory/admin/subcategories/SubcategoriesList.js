import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import SubcategoryCard from './SubcategoryCard'


const SubcategoriesList = ({ handleGetSubcategories, inventorySubcategories, updatedAdmin, clearOptionSelects }) => {

    useEffect(() => {
        handleGetSubcategories()
    }, [ handleGetSubcategories, updatedAdmin ])

    useEffect(() => {
        return () => clearOptionSelects()
    }, [ clearOptionSelects ])


    const mappedSubcategories = inventorySubcategories.map( ( subcategory , i ) => {
        return (
            <SubcategoryCard 
                name={subcategory.name}
                key={i}
                id={subcategory.id}
                categoryId={subcategory.categoryId}
                category={subcategory.Category.name}
                subcategory={subcategory}
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