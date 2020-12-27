import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

import {createCategory, getCategories, removeCategory} from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'

const CategoryCreate = () => {
    const {user} = useSelector(state=>({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => 
        getCategories().then(c=>setCategories(c.data))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({name}, user.token)
            .then(res=>{
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is created`)
                loadCategories()
            })
            .catch(err=>{
                setLoading(false)
                console.log(err)
                toast.error('Error: ',err.response.data)
            })
    }

    const handleRemove = (slug) => {
        if(window.confirm("Delete?")) {
            setLoading(true)
            removeCategory(slug, user.token)
            .then(res=>{
                setLoading(false)
                toast.info(`Removed ${slug}`)
                loadCategories()
            })
        }

    }
    const categoryForm = (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                />
                <br />
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>
    )

    const renderCategories = () => categories.map((c)=>(
        <div className='alert alert-secondary' key={c._id}>
            {c.name} 
            <span 
                onClick={()=>handleRemove(c.slug)}
                className="btn btn-sm float-right"
            >
                <DeleteOutlined className='text-danger' />
            </span> 
            <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                    <EditOutlined />
                </span> 
            </Link>
        </div>
    ))
    

    return (
        <div className="container-fluid">
            <div className="col md-2">
                <AdminNav />
            </div>
            <div className="col">
                {loading?<h4>Loading...</h4>:<h4>Create Category</h4>}
                {categoryForm}
                <hr />
                {renderCategories()}
            </div>
        </div>
    )
}

export default CategoryCreate