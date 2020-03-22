import React from 'react';
// import { Link } from 'react-router-dom';
import { withAdmin } from '../../../context/AdminProvider'


const CategoryCard = ({ name, id, handleDeleteCategory}) => {

    
    return (
        <div >
            <p> {name} </p>
            <button onClick={() => handleDeleteCategory(id)}> Delete </button>
            
        </div>
    );
}

export default withAdmin(CategoryCard)