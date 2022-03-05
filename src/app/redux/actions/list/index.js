import {CONTACT_LIST_UPDATED, STORY_LIST_UPDATED} from '../../types/list/'

export const contact_list_update = (data) => {
 return{
      type: CONTACT_LIST_UPDATED,
      payload:data
    }
}
export const story_list_update = (data) => {
  return{
       type: STORY_LIST_UPDATED,
       payload:data
     }
 }

