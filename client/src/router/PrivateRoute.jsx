import React from 'react'
import {adminMainPagePath, loginPagePath, mainPagePath} from './path';
import { Navigate } from 'react-router-dom';
import {lsProps} from "../utils/lsProps";
import {getLSItem} from "../utils/functions/localStorage";
import {userRoles} from "../constants";

const PrivateRoute = ({element,noAuth,roles}) => {
   const token = getLSItem(lsProps.token)
   const user = getLSItem(lsProps.user,true)
   const isAuthenticated = !token || !user
   const statement = noAuth ?
       !isAuthenticated :
       isAuthenticated  || roles && !roles.includes(user.role)
   let navigateTo = loginPagePath

   if(!isAuthenticated) {
      navigateTo =  mainPagePath
   } else {
      if(noAuth) {
         navigateTo = mainPagePath
      }
   }

   return (
       statement ? <Navigate to={navigateTo} replace={true} /> : element
   )
}

export default PrivateRoute
