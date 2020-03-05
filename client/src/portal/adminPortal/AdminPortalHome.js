import React from 'react';
// import { Link } from 'react-router-dom';
import { withAdmin } from '../../context/AdminProvider'
import { withInventory } from '../../context/InventoryProvider'
import CategoryList from './categories/CategoriesList'
import SubcategoryList from './subcategories/SubcategoriesList'


const AdminPortalHome = ({ handleAdminChange, addCategoryName, addSubcategoryName, handleAddNewCategory, handleAddNewSubcategory, inventoryCategories, status }) => {

    const categoryOptions = inventoryCategories.map( (category , i) => {
        return(
            <option value={category.id} key={i}> {category.name} </option>
        )
    })

    return (
        <div >
            <h2> Admin Portal Home </h2>

            <h3> Categories: </h3>
            <form onSubmit={handleAddNewCategory}>
                <label> Category Name </label>
                <input
                    type='text'
                    name='addCategoryName'
                    required={true}
                    value={addCategoryName}
                    onChange={handleAdminChange}
                />
                <button> Add New Category </button>
            </form>
            { status && <p> { status } </p>}
            
            <CategoryList />


            <h3> Subcategories: </h3>
            <form onSubmit={handleAddNewSubcategory}>
                <label> Subcategory Name </label>
                <input
                    type='text'
                    name='addSubcategoryName'
                    required={true}
                    value={addSubcategoryName}
                    onChange={handleAdminChange}
                />
                <span> in </span>
                <select name='categoryId' onChange={handleAdminChange} required={true} >
                    <option value="" defaultValue> - Select Category - </option>
                    {categoryOptions}
                </select>

                <button> Add New Subcategory </button>
            </form>
            { status && <p> { status } </p>}
            <SubcategoryList />
            
        </div>
    );
}

export default withAdmin(withInventory(AdminPortalHome))