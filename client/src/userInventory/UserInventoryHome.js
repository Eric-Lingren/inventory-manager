import React, { useEffect, useState } from 'react';
import '../App.css'
import { withInventory } from '../context/InventoryProvider'
import UserInventoryList from './UserInventoryList'
import CreateNewList from './CreateNewList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown, faCaretSquareUp, faFolderPlus, faFolderMinus } from '@fortawesome/free-solid-svg-icons'


const UserInventoryHome = ({ getLists, selectedUserList, userLists, handleSetSelectedList, getUserInventory, clearMesages }) => {

    const [isShowingList, setIsShowingList] = useState(false)
    const [isShowingCreateList, setIsShowingCreateList] = useState(false)

    useEffect(() => {
        getLists()
    }, [ getLists ])

    const selectList = (selectedList) => {
        setIsShowingList(!isShowingList)
        handleSetSelectedList(selectedList)
        getUserInventory(selectedList.id)
        if(!isShowingCreateList) clearMesages()
    }

    const mappedLists = userLists.map( (list, i) => {
        return <p key={i} className='lists-item' onClick={() => selectList(list)}> {list.name} </p>
    })


    return (
        <div>
            <div className='inventory-header'>
                <h2 className='inventory-h2'> { selectedUserList.name } </h2>
                <FontAwesomeIcon icon={ !isShowingList ? faCaretSquareDown : faCaretSquareUp } className='button-caret-down' onClick={() => setIsShowingList(!isShowingList)} />
                <FontAwesomeIcon icon={ isShowingCreateList ? faFolderMinus : faFolderPlus } className='button-create-list' onClick={() => setIsShowingCreateList(!isShowingCreateList)} />
            </div>
            <div className='lists-dropdown-container'>
            {
                isShowingList &&
                <div className='lists-dropdown'>
                    {mappedLists}
                </div>
            }
            </div>
            { isShowingCreateList && <CreateNewList /> }
            <UserInventoryList />
        </div>
    )
}

export default withInventory(UserInventoryHome)