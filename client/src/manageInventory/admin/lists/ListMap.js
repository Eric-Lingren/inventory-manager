import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withInventory } from '../../../context/InventoryProvider'
import { withAdmin } from '../../../context/AdminProvider'
import ListCard from './ListCard'


const ListMap = ({ getLists, userLists, updatedAdmin, clearOptionSelects }) => {

    useEffect(() => {
        getLists()
    }, [ getLists ])



    const mappedLists = userLists.map( ( list, i ) => {
        return (
            <ListCard 
                name={list.name}
                key={i}
                id={list.id}
            />
        )
    })

    return (
        <div >
            {mappedLists}
        </div>
    );
}

export default withInventory(withAdmin(ListMap))