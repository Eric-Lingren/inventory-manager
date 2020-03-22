import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import CreateNewList from './CreateNewList'
import ListMap from './ListMap'



const ListsAdmin = ({ handleGetCategories }) => {

    const[ isShowingList, setIsShowingList ] = useState(false)

    const toggleListView = () => {
        setIsShowingList(!isShowingList)
        handleGetCategories()
    }

    
    return (
        <div className='add-inventory-container'>
            <div className='create-inventory-wrapper'>
                <h3 className='create-inventory-header'> Lists Management: </h3>

                <CreateNewList  />
                
                <div className='admin-link-wrapper'>
                    <span className='navigate-to-create-link' onClick={toggleListView}>
                        { isShowingList ? 'Hide Lists' : 'Manage Lists' }
                    </span>
                    <Link to='manage-inventory' className='link'>
                        <span className='navigate-to-create-link'>
                            Back To Inventory
                        </span>
                    </Link>
                </div>

                { isShowingList && <ListMap />  }
            </div>
        </div>
    );
}

export default withInventory(ListsAdmin)