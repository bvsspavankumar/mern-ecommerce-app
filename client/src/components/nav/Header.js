import React, {useState} from 'react'
import { Menu } from 'antd';
import { 
    MailOutlined, 
    AppstoreOutlined, 
    SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Header = () => {
    const [state, setState] = useState('')

    const handleClick = () => {}

    return (
        <Menu mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
                Home
            </Menu.Item>
           
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Register">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Login</Menu.Item>
                    <Menu.Item key="setting:2">Register</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
    );
}

export default Header