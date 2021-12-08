import React from "react";
//import {useSelector} from 'react-redux';
import AuthorizedStackViews from "./AuthorizedStackViews";
import LoginStackViews from "./LoginStackViews";
import useAuth from "../hooks/useAuth";

const GetViewStack = (props) =>{
  const isAuthorized = useAuth();
  if(isAuthorized === true)
    return <AuthorizedStackViews></AuthorizedStackViews>;

  return <LoginStackViews></LoginStackViews>;
}

export default GetViewStack;
