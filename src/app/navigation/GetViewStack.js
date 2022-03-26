import React from "react";
import {StoryStackViews,ContactStackViews, StoryPointStackViews} from "./AuthorizedStackViews";
import LoginStackViews from "./LoginStackViews";
import useAuth from "../hooks/useAuth";
import useStackView from "../hooks/useStackView";
import {STACK_LOGIN,STACK_CONTACT, STACK_STORY, STACK_STORYPOINT} from "../redux/types/stackview";

const GetViewStack = () =>{
  const isAuthorized = useAuth();
  const stackView = useStackView();

  console.log('stackView:', stackView);

  if(isAuthorized === true){
    let view = stackView?.view;

    switch (view) {
      case STACK_CONTACT:
        return <ContactStackViews></ContactStackViews>;
      case STACK_STORY:
        return <StoryStackViews contactId={stackView.params?.contactId} storyId={stackView.params?.storyId}></StoryStackViews>
      case STACK_STORYPOINT:
        return <StoryPointStackViews contactId={stackView.params?.contactId} storyId={stackView.params?.storyId}></StoryPointStackViews>
      case STACK_LOGIN:
        return <LoginStackViews></LoginStackViews>;
      default:
        return <LoginStackViews></LoginStackViews>;
    }
  }
  return <LoginStackViews></LoginStackViews>;
}

export default GetViewStack;
