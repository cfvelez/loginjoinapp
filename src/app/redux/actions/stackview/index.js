import {STACK_CONTACT, STACK_STORY, STACK_STORYPOINT} from '../../types/stackview/'

export const set_contact_stack = (data) => {
 return{
      type: STACK_CONTACT,
      payload:data
    }
}

export const set_story_stack = (data) => {
  return{
       type: STACK_STORY,
       payload:data
     }
 }

 export const set_storypoint_stack = (data) => {
  return{
       type: STACK_STORYPOINT,
       payload:data
     }
 }
