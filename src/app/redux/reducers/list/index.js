import {LIST_UPDATED} from '../../types/list'

export const contactListUpdate = (state=Date.now(),action) => {
  switch(action.type){
    case LIST_UPDATED :
      return action.payload
    default: return state
  }
}

