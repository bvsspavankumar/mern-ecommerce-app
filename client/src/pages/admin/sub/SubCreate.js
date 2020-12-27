import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

import {createSub, getSubs, removeSub} from '../../../functions/sub'
import { getCategories } from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import SubForm from '../../../components/forms/SubForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
    const {user} = useSelector(state=>({...state}))
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [subs, setSubs] = useState([])
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        loadSubs()
    }, [])

    const loadSubs = () => {
        getSubs().then(c=>setSubs(c.data))
        getCategories().then(c=>setCategories(c.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createSub({name, parent: category}, user.token)
            .then(res=>{
                setLoading(false)
                setName('')
                setCategory('')
                toast.success(`${res.data.name} is created`)
                loadSubs()
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
            removeSub(slug, user.token)
            .then(res=>{
                setLoading(false)
                toast.info(`Removed ${slug}`)
                loadSubs()
            })
        }

    }
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
    const renderSubs = () => subs.filter(searched(keyword)).map((c)=>(
        <div className='alert alert-secondary' key={c._id}>
            {c.name} 
            <span 
                onClick={()=>handleRemove(c.slug)}
                className="btn btn-sm float-right"
            >
                <DeleteOutlined className='text-danger' />
            </span> 
            <Link to={`/admin/sub/${c.slug}`}>
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
                {loading?<h4>Loading...</h4>:<h4>Create Sub</h4>}
                <SubForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                />
                <hr />
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                {renderSubs()}
            </div>
        </div>
    )
}

export default SubCreate