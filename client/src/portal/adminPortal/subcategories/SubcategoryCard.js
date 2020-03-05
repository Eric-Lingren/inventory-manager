import React from 'react';
// import { Link } from 'react-router-dom';
// import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'


const SubcategoryCard = ({ name, id, handleDeleteSubcategory }) => {

    
    return (
        <div >
            <p> {name} </p>
            <button onClick={ () => handleDeleteSubcategory(id) }> Delete </button>
            
        </div>
    );
}

export default withAdmin(SubcategoryCard)