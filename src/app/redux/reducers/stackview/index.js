import {STACK_LOGIN, STACK_CONTACT, STACK_HISTORY} from '../../types/stackview'

const init_state = { stack:STACK_LOGIN, params:{} };

export const stackView = (state=init_state,action) => {
  switch(action.type){
    case STACK_CONTACT :
      return { view:STACK_CONTACT, params: action.payload}
    case STACK_HISTORY :
      return { view:STACK_HISTORY, params: action.payload}
    default: return state
  }
}

