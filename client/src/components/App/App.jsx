import React, {Fragment, useEffect} from "react";
import {checkIsLoggedIn} from "../../redux/action/auth";
import {useDispatch, useSelector} from "react-redux";
import {Outlet, Route, Routes} from 'react-router-dom';


import {routes} from "../../router/path";
import Navbar from "../global/Navbar/Navbar";

function App() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(checkIsLoggedIn())
    }, []);

    useEffect(() => {
        if(token && user) {
            document.body.classList.add('withSidebar')
        }
    }, [token]);

    return (
        <>
            {
                token && user ?
                    <Navbar/>
                    : null
            }
            <Routes>
                {
                    routes.map(({path, component, children}, index) => (
                        <Fragment
                            key={index}>
                            {
                                children ?
                                    <Route path={path} element={<Outlet/>}>
                                        <Route index element={component}/>
                                        {
                                            children.map((child, childIndex) => (
                                                <Route path={child.path} element={child.component} key={childIndex}/>
                                            ))
                                        }
                                    </Route>
                                    :
                                    <Route path={path} element={component}/>
                            }
                        </Fragment>
                    ))
                }
            </Routes>
        </>
    );
}

export default App;