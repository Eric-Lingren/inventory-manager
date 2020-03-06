import React from 'react';


const UserInventoryCard = ({ name, id, handleDeleteSubcategory }) => {

    
    return (
        <div >
            <p> {name} </p>
            <button 
            // onClick={ () => handleDeleteSubcategory(id) }
            > Delete </button>
            
        </div>
    );
}

export default UserInventoryCard