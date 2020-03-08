import React, { Component } from 'react'
import axios from 'axios'
// import validator from 'validator'
import sanitizeData from '../HelperFunctions/SanitizeData'
import decode from 'jwt-decode';
import { CP1251_BULGARIAN_CI } from 'mysql2/lib/constants/charsets';


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
            itemName: '',
            itemAddedSuccessfully: null,
            expirationDate: '',
            itemAddedToUserList: null,
            quantity: 1,
            size: '',
            volumeType: ''
        }
    }

    //  State data handler for form input
    handleInventoryChange = (e) => {
        const {name, value } = e.target
        this.setState({ [name]: sanitizeData(value) })
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

    getUserInventory = () => {
        let token = localStorage.getItem("inventoryManagement")
        let decodedJwt = decode(token)
        let userId = decodedJwt.user.id
 
        authAxios.get(`${baseURL}/items/user-items?userId=${userId}`)
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


    render(){
        return (
            <InventoryContext.Provider 
                value={{
                    ...this.state,
                    handleInventoryChange: this.handleInventoryChange,
                    handleGetCategories: this.handleGetCategories,
                    handleGetSubcategories: this.handleGetSubcategories,
                    handleGetItems: this.handleGetItems,
                    handleSaveNewItem: this.handleSaveNewItem,
                    addToPersonalInventory: this.addToPersonalInventory,
                    getUserInventory: this.getUserInventory,
                    handleDeleteUserInventoryItem: this.handleDeleteUserInventoryItem,
                    markItemUsed: this.markItemUsed,
                    markItemAdded: this.markItemAdded,
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

