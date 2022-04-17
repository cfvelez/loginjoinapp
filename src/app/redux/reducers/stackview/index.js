import {STACK_LOGIN, STACK_CONTACT, STACK_STORY, STACK_STORYPOINT, STACK_RESOURCES} from '../../types/stackview'

const init_state = { stack:STACK_LOGIN, params:{} };

export const stackView = (state=init_state,action) => {
  switch(action.type){
    case STACK_CONTACT :
      return { view:STACK_CONTACT, params: action.payload }
    case STACK_STORY :
      return { view:STACK_STORY, params: action.payload }
    case STACK_STORYPOINT :
        return { view:STACK_STORYPOINT, params: action.payload }
    case STACK_RESOURCES :
        return { view:STACK_RESOURCES, params: action.payload }
    default: return state
  }
}

