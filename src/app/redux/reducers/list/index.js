import {CONTACT_LIST_UPDATED, STORY_LIST_UPDATED, STORYPOINT_LIST_UPDATED} from '../../types/list'

export const contactListUpdate = (state=Date.now(),action) => {
  switch(action.type){
    case CONTACT_LIST_UPDATED :
      return action.payload
    default: return state
  }
}

export const storyListUpdate = (state=Date.now(),action) => {
  switch(action.type){
    case STORY_LIST_UPDATED :
      return action.payload
    default: return state
  }
}

export const storypointListUpdate = (state=Date.now(),action) => {
  switch(action.type){
    case STORYPOINT_LIST_UPDATED :
      return action.payload
    default: return state
  }
}

