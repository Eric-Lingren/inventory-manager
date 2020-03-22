import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateNewItem from './CreateNewItem'
import ItemList from './ItemList'


const ItemAdmin = () => {

    const[ isShowingList, setIsShowingList ] = useState(false)

    const toggleListView = () => {
        setIsShowingList(!isShowingList)
    }

    
    return (
        <div className='add-inventory-container'>
            <div className='create-inventory-wrapper'>
                <h3 className='create-inventory-header'> Item Management: </h3>

                <CreateNewItem />
                
                <div className='admin-link-wrapper'>
                    <span className='navigate-to-create-link' onClick={toggleListView}>
                        { isShowingList ? 'Hide Items' : 'Manage Items' }
                    </span>
                    <Link to='manage-inventory' className='link'>
                        <span className='navigate-to-create-link'>
                            Back To Inventory
                        </span>
                    </Link>
                </div>

                { isShowingList && <ItemList />  }
            </div>
        </div>
    );
}

export default ItemAdmin