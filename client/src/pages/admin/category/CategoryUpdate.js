import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

import {updateCategory, getCategory} from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({history, match}) => {
    const {user} = useSelector(state=>({...state}))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => 
        getCategory(match.params.slug)
            .then(c=>setName(c.data.name))
            .catch(err=>toast.error(`Error: ${err.message}`))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(match.params.slug, {name}, user.token)
            .then(res=>{
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is updated`)
                history.push('/admin/category')
            })
            .catch(err=>{
                setLoading(false)
                console.log(err)
                toast.error('Error: ',err.response.data)
            })
    }

    return (
        <div className="container-fluid">
            <div className="col md-2">
                <AdminNav />
            </div>
            <div className="col">
                {loading?<h4>Loading...</h4>:<h4>Update Category</h4>}
                <CategoryForm 
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                />
                <hr />
            </div>
        </div>
    )
}

export default CategoryUpdate