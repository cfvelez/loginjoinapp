import {CONTACT_LIST_UPDATED, STORY_LIST_UPDATED, STORYPOINT_LIST_UPDATED,RESOURCES_LIST_UPDATED } from '../../types/list/'

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

 export const storypoint_list_update = (data) => {
  return{
       type: STORYPOINT_LIST_UPDATED,
       payload:data
     }
 }

 export const resource_list_update = (data) => {
  return{
       type: RESOURCES_LIST_UPDATED,
       payload:data
     }
 }



