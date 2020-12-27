import axios from 'axios'

export const getCategories = async () => {
    await axios.get(`${process.env.REACT_APP_API}/categories`)
}

export const getCategory = async (slug) => {
    await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`)
}

export const createCategory = async (category, authtoken) => {
    await axios.post(`${process.env.REACT_APP_API}/categories`, 
        { name: category },
        { headers: {authtoken} }
    )
}

export const removeCategory = async (slug, authtoken) => {
    await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`, {
        headers: { authtoken }
    })
}

export const updateCategory = async (slug) => {
    await axios.pug(`${process.env.REACT_APP_API}/categories/${slug}`, 
        { name: category },
        { headers: {authtoken} }
    )
}
