import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Posts from "../pages/Posts";
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';


const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader />
    }
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map((route) => {
                    return <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                })}
                {publicRoutes.map((route) => {
                    return <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                })}
                <Route path="*" element={<Posts />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route, index) => {
                    return <Route
                        path={route.path}
                        element={route.element}
                        key={index}
                    />
                })}
                <Route path="*" element={<Login />} />
            </Routes>
    );
};

export default AppRouter;