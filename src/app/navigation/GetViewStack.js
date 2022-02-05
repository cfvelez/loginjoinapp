import React from "react";
import {AuthorizedStackViews,ContactStackViews} from "./AuthorizedStackViews";
import LoginStackViews from "./LoginStackViews";
import useAuth from "../hooks/useAuth";

const GetViewStack = () =>{
  const isAuthorized = useAuth();

  if(isAuthorized === true)
    return <ContactStackViews></ContactStackViews>;

  return <LoginStackViews></LoginStackViews>;
}

export default GetViewStack;
