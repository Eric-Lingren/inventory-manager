import React, { useEffect, useState } from 'react';
import './userInventory.css'
import { withInventory } from '../context/InventoryProvider'
import { withAuth } from '../context/AuthProvider'
import UserInventoryCard from './UserInventoryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'


const UserInventoryHome = ({ getUserFromToken, getUserInventory, userInventoryItems, sortByItemName, sortBySubcategoryName, sortByCategoryName, sortByExpiration, sortByQuantity }) => {

    const [isSortingCategoryNameByAscending, setIsSortingCategoryNameByAscending] = useState(true)
    const [isSortingSubcategoryNameByAscending, setIsSortingSubcategoryNameByAscending] = useState(true)
    const [isSortingItemNameByAscending, setIsSortingItemNameByAscending] = useState(true)
    const [isSortingItemExpirationByAscending, setIsSortingItemExpirationByAscending] = useState(true)
    const [isSortingItemQuantityByAscending, setIsSortingItemQuantityByAscending] = useState(true)

    useEffect(() => {
        getUserFromToken()
    }, [ getUserFromToken ])

    useEffect(() => {
        getUserInventory()
    }, [ getUserInventory ])

    const toggleSortItemCategory = () => {
        setIsSortingCategoryNameByAscending(!isSortingCategoryNameByAscending)
        sortByCategoryName({asc: isSortingCategoryNameByAscending})
    }

    const toggleSortItemSubcategory = () => {
        setIsSortingSubcategoryNameByAscending(!isSortingSubcategoryNameByAscending)
        sortBySubcategoryName({asc: isSortingSubcategoryNameByAscending})
    }

    const toggleSortItemName = () => {
        setIsSortingItemNameByAscending(!isSortingItemNameByAscending)
        sortByItemName({asc: isSortingItemNameByAscending})
    }

    const toggleSortItemExpiration = () => {
        setIsSortingItemExpirationByAscending(!isSortingItemExpirationByAscending)
        sortByExpiration({asc: isSortingItemExpirationByAscending})
    }

    const toggleSortItemQuantity = () => {
        setIsSortingItemQuantityByAscending(!isSortingItemQuantityByAscending)
        sortByQuantity({asc: isSortingItemQuantityByAscending})
    }

    

    const mappedUserItems = userInventoryItems.map( ( item, i ) => {
        return (
            <UserInventoryCard 
                key={i}
                id={item.id}
                name={item.Item.name}
                category={item.Item.Subcategory.Category.name}
                subcategory={item.Item.Subcategory.name}
                itemExpiration={item.expirationDate}
                itemSize={item.size}
                itemVolumeType={item.volumeType}
                itemQuantity={item.quantity}
                item={item}
            />
        )
    })

    return (
        <div >
            <div className='user-inventory-list-table-heading'>
                <div className='inventory-list-header-container'>
                    <h4 className='inventory-header' > Category </h4>
                    <FontAwesomeIcon icon={faSort} className='sort-icon' onClick={toggleSortItemCategory} />
                </div>
                <div className='inventory-list-header-container'>
                    <h4 className='inventory-header'> Subcategory </h4>
                    <FontAwesomeIcon icon={faSort} className='sort-icon' onClick={toggleSortItemSubcategory} />
                </div>
                <div className='inventory-list-header-container'>
                    <h4 className='inventory-header'> Item </h4>
                    <FontAwesomeIcon icon={faSort} className='sort-icon' onClick={toggleSortItemName} />
                </div>
                <div className='inventory-list-header-container'>
                    <h4 className='inventory-header'> Expiration </h4>
                    <FontAwesomeIcon icon={faSort} className='sort-icon'  onClick={toggleSortItemExpiration} />
                </div>
                <div className='inventory-list-header-container'>
                    <h4 className='inventory-header'> Quantity </h4>
                    <FontAwesomeIcon icon={faSort} className='sort-icon' onClick={toggleSortItemQuantity} />
                </div>
                <div className='inventory-list-header-container size-header'>
                    <h4 className='inventory-header'> Size </h4>
                </div>
                <h4 className='inventory-header action-header'> Actions </h4>
            </div>
            {mappedUserItems}
        </div>
    );
}

export default withInventory(withAuth(UserInventoryHome))