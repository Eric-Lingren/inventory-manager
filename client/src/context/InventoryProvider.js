import React, { Component } from 'react'
import axios from 'axios'
// import validator from 'validator'
import sanitizeData from '../HelperFunctions/SanitizeData'

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
            inventorySubcategories: []
        }
    }

    //  State data handler for form input
    handleInventoryChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: sanitizeData(value) })
    }


    handleGetCategories = () => {
        authAxios.get(`${baseURL}/categories`)
        .then(res => {
            this.setState({ inventoryCategories: res.data})
        })
        .catch(err => err)
    }


    handleGetSubcategories = () => {
        authAxios.get(`${baseURL}/subcategories`)
        .then(res => {
            this.setState({ inventorySubcategories: res.data})
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

