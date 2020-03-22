import React, { Component } from 'react'
import axios from 'axios'
import decode from 'jwt-decode';
import sanitizeData from '../HelperFunctions/SanitizeData'

const baseURL = 'api/admin'
const authAxios = axios.create()
authAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("inventoryManagement");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}); 

const AdminContext = React.createContext()

class AdminProvider extends Component {
    constructor(){
        super()
        this.state = {
            addCategoryName: '',
            addSubcategoryName: '',
            categoryId: '',
            updatedAdmin: false,
            status: '',
            categoryCreatedSuccessfully: null,
        }
    }

    //  State data handler for form input
    handleAdminChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: sanitizeData(value) })
    }

    handleAddNewCategory = (e) => {
        e.preventDefault()

        let token = localStorage.getItem("inventoryManagement")
        let decodedJwt = decode(token)
        let userId = decodedJwt.user.id
        const newCategory = { name: this.state.addCategoryName, userId: userId }

        authAxios.post(`${baseURL}/category`, newCategory)
        .then(res => {
            this.setState({ updatedAdmin: !this.state.updatedAdmin, addCategoryName: '', categoryCreatedSuccessfully: true })
        })
        .catch(err => {
            this.setState({ categoryCreatedSuccessfully: false })
        })
    }


    handleDeleteCategory = (id) => {
        authAxios.delete(`${baseURL}/category/${id}`)
        .then(res => {
            this.setState({ updatedAdmin: !this.state.updatedAdmin })
        })
        .catch(err => err)
    }


    handleAddNewSubcategory = (e) => {
        e.preventDefault()

        let token = localStorage.getItem("inventoryManagement")
        let decodedJwt = decode(token)
        let userId = decodedJwt.user.id
        const newSubcategory = { name: this.state.addSubcategoryName, userId: userId, categoryId: this.state.categoryId }

        authAxios.post(`${baseURL}/subcategory`, newSubcategory)
        .then(res => {
            this.setState({ updatedAdmin: !this.state.updatedAdmin, addSubcategoryName: '', status: '' })
        })
        .catch(err => {
            this.setState({ status: 'That subcategory already exists.' })
        })
    }


    handleDeleteSubcategory = (id) => {
        authAxios.delete(`${baseURL}/subcategory/${id}`)
        .then(res => {
            this.setState({ updatedAdmin: !this.state.updatedAdmin })
        })
        .catch(err => err)
    }

    render(){

        return (
            <AdminContext.Provider 
                value={{
                    ...this.state,
                    handleAdminChange: this.handleAdminChange,
                    handleAddNewCategory: this.handleAddNewCategory,
                    handleDeleteCategory: this.handleDeleteCategory,
                    handleAddNewSubcategory: this.handleAddNewSubcategory,
                    handleDeleteSubcategory: this.handleDeleteSubcategory
                    
                }}>
                { this.props.children }
            </AdminContext.Provider>
        )
    }
}

export default AdminProvider

export const withAdmin = C => props => (
    <AdminContext.Consumer>
        {value => <C {...props} {...value}/>}
    </AdminContext.Consumer>
)

