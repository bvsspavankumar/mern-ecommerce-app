import React, {useState} from 'react'
import { Menu } from 'antd';
import { 
    AppstoreOutlined, 
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')
    const {user} = useSelector(state=>({...state}))

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to='/'>Home</Link>
            </Item>
            
            {!user && (<>
            <Item key="register" icon={<UserAddOutlined />} className='float-right'>
                <Link to='/register'>Register</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} className='float-right'>
                <Link to='/login'>Login</Link>
            </Item></>)}
           
            {user &&
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email.split('@')[0]} className='float-right'>
                {user && user.role === "subscriber" && (
                    <Item>
                        <Link to="/user/history">Dashboard</Link>
                    </Item>
                )}
                {user && user.role === "admin" && (
                    <Item>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Item>
                )}
                <Item key='logout' icon={<UserOutlined />}>
                    <Link to='/logout'>Logout</Link>
                </Item>
            </SubMenu>}
        </Menu>
    );
}

export default Header