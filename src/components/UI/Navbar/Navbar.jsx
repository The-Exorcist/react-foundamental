import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const logout = event => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>Log out</MyButton>
            <div className="navber__links">
                <Link to="/About">About</Link>
                <Link to="/Posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;