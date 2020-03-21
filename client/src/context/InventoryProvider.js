import React, { Component } from 'react'
import axios from 'axios'
// import validator from 'validator'
import sanitizeData from '../HelperFunctions/SanitizeData'
import decode from 'jwt-decode';


const baseURL = 'api/inventory'
const authAxios = axios.create()
authAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("inventoryManagement");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}); 


const InventoryContext = React.createContext()

class InventoryProvider extends Component {
    constructor(){
        super()
        this.state = {
            inventoryCategories: [],
            inventorySubcategories: [],
            inventoryItems: [],
            userInventoryItems: [],
            selectedCategoryId: '',
            selectedSubcategoryId: '',
            selectedItemId: '',
            selectedListId: '',
            itemName: '',
            itemAddedSuccessfully: null,
            expirationDate: '',
            itemAddedToUserList: null,
            quantity: 1,
            size: '',
            volumeType: '',
            userLists : [ ],
            masterList: { name: 'Master Inventory', id: '' },
            selectedUserList: { name: 'Master Inventory' },
            createListName: '',
            createdListSuccess: null,
            editingItem: {},
            updateMessage: ''
        }
    }


    handleInventoryChange = (e) => {
        const {name, value } = e.target
        this.setState({ [name]: sanitizeData(value) })
    }


    handleEditingItem = (e) => {
        let {name , value} = e.target
        if(name === 'selectedListId') name = 'listId'
        this.setState(prevState => ({ editingItem: { ...prevState.editingItem, [name]: value } }))
    }


    handleSetSelectedList = ( selectedList ) => {
        this.setState({ selectedUserList: selectedList })
    }


    handleGetCategories = () => {
        authAxios.get(`${baseURL}/categories`)
        .then(res => {
            this.setState({ inventoryCategories: res.data})
        })
        .catch(err => err)
    }


    handleGetSubcategories = (selectedCategoryId) => {
        let url = `${baseURL}/subcategories`
        if(selectedCategoryId) url = `${baseURL}/subcategories?categoryId=${selectedCategoryId}`
        authAxios.get(`${url}`)
        .then(res => {
            this.setState({ inventorySubcategories: res.data})
        })
        .catch(err => err)
    }

    handleGetItems = ( selectedSubcategoryId) => {
        let url = `${baseURL}/items`
        if(selectedSubcategoryId) url = `${baseURL}/items?subcategoryId=${selectedSubcategoryId}`
        authAxios.get(`${url}`)
        .then(res => {
            this.setState({ inventoryItems: res.data})
        })
        .catch(err => err)
    }


    handleSaveNewItem = (e) => {
        e.preventDefault()
        let decodedJwt;
        let token = localStorage.getItem("inventoryManagement")
        if(token) decodedJwt = decode(token)

        const newItem = {   categoryId: this.state.selectedCategoryId, 
                            subcategoryId: this.state.selectedSubcategoryId, 
                            name: this.state.itemName,
                            userId: decodedJwt.user.id
                        }

        authAxios.post(`${baseURL}/items`, newItem)
        .then(res => {
            this.setState({ itemAddedSuccessfully: true })
        })
        .catch(err => {
            this.setState({ itemAddedSuccessfully: false })
        })
    }

    addToPersonalInventory = (e) => {
        e.preventDefault()

        let decodedJwt;
        let token = localStorage.getItem("inventoryManagement")
        if(token) decodedJwt = decode(token)

        let expires;
        this.state.expirationDate.length ? expires = this.state.expirationDate : expires = null

        const myItem = {
            subcategoryId: this.state.selectedSubcategoryId,
            itemId: this.state.selectedItemId,
            userId: decodedJwt.user.id,
            listId: this.state.selectedListId,
            expirationDate: expires,
            quantity: this.state.quantity,
            size: this.state.size,
            volumeType: this.state.volumeType
        }

        authAxios.post(`${baseURL}/items/user-items`, myItem)
        .then(res => {
            this.setState({ itemAddedToUserList: true })
            this.getUserInventory()
        })
        .catch(err => {
            this.setState({ itemAddedToUserList: false })
        })
    }

    getUserInventory = (listId) => {
        let token = localStorage.getItem("inventoryManagement")
        let decodedJwt = decode(token)
        let userId = decodedJwt.user.id
        let query;
        if(!listId){
            query = `?userId=${userId}`
        } else{
            query = `?userId=${userId}&&listId=${listId}`
        }

        authAxios.get(`${baseURL}/items/user-items${query}`)
        .then(res => {
            this.setState({ userInventoryItems: res.data })
        })
        .catch(err => {
        })
    }


    handleDeleteUserInventoryItem = (id) => {
        authAxios.delete(`${baseURL}/items/user-items/${id}`)
        .then(res => {
            this.getUserInventory()
        })
        .catch(err => err)
    }


    handleEditUserInventoryItem = (e) => {
        e.preventDefault()

        const id = this.state.editingItem.id
        const editedItem = this.state.editingItem

        authAxios.put(`${baseURL}/items/user-items/${id}`, editedItem)
        .then(res => {
            this.setState({updateMessage : res.data.msg})
            this.getUserInventory()
        })
        .catch(err => this.setState({ updateMessage: "Something broke while updating. Please try again." }))
    }


    markItemUsed = (id, item) => {
        let updates = { quantity : item.quantity -= 1 }
        
        let usedItem ={
              subcategoryId: item.subcategoryId,
              itemId: item.itemId,
              userId: item.userId,
              size: item.size,
              volumeType: item.volumeType,
        }
        
        if(item.quantity >= 1) {
            authAxios.put(`${baseURL}/items/user-items/${id}`, updates)
            .then(res => {
                this.getUserInventory()
                this.addItemToUserFinished(usedItem)
            })
            .catch(err => err)
        } else {
            this.handleDeleteUserInventoryItem(id)
            this.addItemToUserFinished(usedItem)
        } 
    }

    addItemToUserFinished = (usedItem) => {
        authAxios.post(`${baseURL}/items/user-items-finished`, usedItem)
        .then(res => {
        })
        .catch(err => err)
    }


    markItemAdded = (id, item) => {
        let updates = { quantity : item.quantity += 1 }
        
        let addedItem ={
              subcategoryId: item.subcategoryId,
              itemId: item.itemId,
              userId: item.userId,
              size: item.size,
              volumeType: item.volumeType,
        }
        
        authAxios.put(`${baseURL}/items/user-items/${id}`, updates)
        .then(res => {
            this.getUserInventory()
            this.addItemToUserAdded(addedItem)
        })
        .catch(err => err)
    }


    addItemToUserAdded = (addedItem) => {
        authAxios.post(`${baseURL}/items/user-items-added`, addedItem)
        .then(res => {
        })
        .catch(err => err)
    }

    getLists = () => {
        let decodedJwt;
        let token = localStorage.getItem("inventoryManagement")
        if(token) decodedJwt = decode(token)
        authAxios.get(`api/list?userId=${decodedJwt.user.id}`)
        .then(res => {
            this.setState({ userLists: [this.state.masterList, ...res.data] })
        })
        .catch(err => err)
    }

    createList = (e) => {
        e.preventDefault()
        let decodedJwt;
        let token = localStorage.getItem("inventoryManagement")
        if(token) decodedJwt = decode(token)

        const newList = { name: this.state.createListName, userId: decodedJwt.user.id }
        authAxios.post(`api/list`, newList)
        .then(res => {
            this.setState({createdListSuccess: true})
            this.getLists()
        })
        .catch(err => {
            this.setState({createdListSuccess: false})
        })
    }

    sortByItemName = (order) => {
        const items = this.state.userInventoryItems
        if(order.asc){
            items.sort(function(a, b) {
                let textA = a.Item.name.toUpperCase();
                let textB = b.Item.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            items.sort(function(a, b) {
                let textA = a.Item.name.toUpperCase();
                let textB = b.Item.name.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
    }

    sortBySubcategoryName = (order) => {
        const items = this.state.userInventoryItems
        if(order.asc){
            items.sort(function(a, b) {
                let textA = a.Item.Subcategory.name.toUpperCase();
                let textB = b.Item.Subcategory.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            items.sort(function(a, b) {
                let textA = a.Item.Subcategory.name.toUpperCase();
                let textB = b.Item.Subcategory.name.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
    }

    sortByCategoryName = (order) => {
        const items = this.state.userInventoryItems
        if(order.asc){
            items.sort(function(a, b) {
                let textA = a.Item.Subcategory.Category.name.toUpperCase();
                let textB = b.Item.Subcategory.Category.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            items.sort(function(a, b) {
                let textA = a.Item.Subcategory.Category.name.toUpperCase();
                let textB = b.Item.Subcategory.Category.name.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
    }

    sortByExpiration = (order) => {
        const items = this.state.userInventoryItems
        if(order.asc){
            items.sort(function(a, b) {
                let textA = a.expirationDate
                let textB = b.expirationDate
                return new Date(textB) - new Date(textA);
            })
        } else {
            items.sort(function(a, b) {
                let textA = a.expirationDate
                let textB = b.expirationDate
                return new Date(textA) - new Date(textB)
            })
        }
    }

    sortByQuantity = (order) => {
        const items = this.state.userInventoryItems
        if(order.asc){
            items.sort(function(a, b) {
                let textA = a.quantity
                let textB = b.quantity
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        } else {
            items.sort(function(a, b) {
                let textA = a.quantity
                let textB = b.quantity
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
    }

    handleSetEditingItem = (item) => {
        this.setState({ editingItem: item})
    }

    clearMesages = () => {
        this.setState({updateMessage : ''})
    }


    render(){
        return (
            <InventoryContext.Provider 
                value={{
                    ...this.state,
                    handleInventoryChange: this.handleInventoryChange,
                    handleEditingItem: this.handleEditingItem,
                    handleSetSelectedList: this.handleSetSelectedList,
                    handleGetCategories: this.handleGetCategories,
                    handleGetSubcategories: this.handleGetSubcategories,
                    handleGetItems: this.handleGetItems,
                    handleSaveNewItem: this.handleSaveNewItem,
                    addToPersonalInventory: this.addToPersonalInventory,
                    getUserInventory: this.getUserInventory,
                    handleDeleteUserInventoryItem: this.handleDeleteUserInventoryItem,
                    markItemUsed: this.markItemUsed,
                    markItemAdded: this.markItemAdded,
                    getLists: this.getLists,
                    createList: this.createList,
                    sortByCategoryName: this.sortByCategoryName,
                    sortBySubcategoryName: this.sortBySubcategoryName,
                    sortByItemName: this.sortByItemName,
                    sortByExpiration: this.sortByExpiration,
                    sortByQuantity: this.sortByQuantity,
                    handleSetEditingItem: this.handleSetEditingItem,
                    handleEditUserInventoryItem: this.handleEditUserInventoryItem,
                    clearMesages: this.clearMesages
                }}>
                { this.props.children }
            </InventoryContext.Provider>
        )
    }
}

export default InventoryProvider

export const withInventory = C => props => (
    <InventoryContext.Consumer>
        {value => <C {...props} {...value}/>}
    </InventoryContext.Consumer>
)

