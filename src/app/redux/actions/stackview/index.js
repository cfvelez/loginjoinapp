import {STACK_CONTACT, STACK_HISTORY} from '../../types/stackview/'

export const set_contact_stack = (data) => {
 return{
      type: STACK_CONTACT,
      payload:data
    }
}

export const set_history_stack = (data) => {
  return{
       type: STACK_HISTORY,
       payload:data
     }
 }
