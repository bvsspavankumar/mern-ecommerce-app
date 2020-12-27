import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

import {updateSub, getSub} from '../../../functions/sub'
import {getCategories} from '../../../functions/category'
import AdminNav from '../../../components/nav/AdminNav'
import SubForm from '../../../components/forms/SubForm'

const SubUpdate = ({history, match}) => {
    const {user} = useSelector(state=>({...state}))

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadSub()
    }, [])

    const loadSub = () => {
        getSub(match.params.slug)
            .then(c=>{
                setName(c.data.name)
                setCategory(c.data.parent)
            })
            .catch(err=>toast.error(`Error: ${err.message}`))
        getCategories().then(c=>setCategories(c.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateSub(match.params.slug, {name, parent: category}, user.token)
            .then(res=>{
                setLoading(false)
                setName('')
                toast.success(`${res.data.name} is updated`)
                history.push('/admin/sub')
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
                {loading?<h4>Loading...</h4>:<h4>Update Sub</h4>}
                <SubForm 
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                />
                <hr />
            </div>
        </div>
    )
}

export default SubUpdate