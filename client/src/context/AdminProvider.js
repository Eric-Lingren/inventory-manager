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
            subcategoryCreatedSuccessfully: null,
            editingObject: {},
            itemUpdated: null,
        }
    }

    //  State data handler for form input
    handleAdminChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: sanitizeData(value) })
    }

    handleSetSelectedCategory = (id) => {
        this.setState({ categoryId: id })
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
            setTimeout(this.handleSetMessageTimeout, 4000)
        })
        .catch(err => {
            this.setState({ categoryCreatedSuccessfully: false })
            setTimeout(this.handleSetMessageTimeout, 4000)
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

        console.log(this.state.selectedCategoryId)
        let token = localStorage.getItem("inventoryManagement")
        let decodedJwt = decode(token)
        let userId = decodedJwt.user.id
        const newSubcategory = { name: this.state.addSubcategoryName, userId: userId, categoryId: this.state.selectedCategoryId }

        authAxios.post(`${baseURL}/subcategory`, newSubcategory)
        .then(res => {
            this.setState({ updatedAdmin: !this.state.updatedAdmin, addSubcategoryName: '', subcategoryCreatedSuccessfully: true })
            setTimeout(this.handleSetMessageTimeout, 4000)
        })
        .catch(err => {
            this.setState({ subcategoryCreatedSuccessfully: false })
            setTimeout(this.handleSetMessageTimeout, 4000)
        })
    }


    handleSetEditingObject = (subcategory) => {
        this.setState({ editingObject: subcategory })
    }


    handleEditingObject = (e) => {
        let {name , value} = e.target
        this.setState(prevState => ({ editingObject: { ...prevState.editingObject, [name]: value } }))
    }


    handleEditSubcategory = (e) => {
        e.preventDefault()

        let newCategoryId = this.state.categoryId
        let editedSubcategory = this.state.editingObject
        if(newCategoryId !== '') editedSubcategory.categoryId = newCategoryId

        authAxios.put(`${baseURL}/subcategory/${editedSubcategory.id}`, editedSubcategory)
        .then(res => {
            this.setState({ itemUpdated:  true })
            setTimeout(this.handleSetMessageTimeout, 4000)
        })
        .catch(err => {
            this.setState({ itemUpdated: false })
            setTimeout(this.handleSetMessageTimeout, 4000)
        })
    }


    handleDeleteSubcategory = (id) => {
        authAxios.delete(`${baseURL}/subcategory/${id}`)
        .then(res => {
            this.setState({ updatedAdmin: !this.state.updatedAdmin })
        })
        .catch(err => err)
    }

    handleSetMessageTimeout = () => {
        this.setState({ categoryCreatedSuccessfully: null, subcategoryCreatedSuccessfully: null, itemUpdated: null })
    }


    render(){
        return (
            <AdminContext.Provider 
                value={{
                    ...this.state,
                    handleAdminChange: this.handleAdminChange,
                    handleSetSelectedCategory: this.handleSetSelectedCategory,
                    handleAddNewCategory: this.handleAddNewCategory,
                    handleDeleteCategory: this.handleDeleteCategory,
                    handleAddNewSubcategory: this.handleAddNewSubcategory,
                    handleDeleteSubcategory: this.handleDeleteSubcategory,
                    handleSetEditingObject: this.handleSetEditingObject,
                    handleEditSubcategory: this.handleEditSubcategory,
                    handleEditingObject: this.handleEditingObject,
                    
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

