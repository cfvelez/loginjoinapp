import {LIST_UPDATED} from '../../types/list/'

export const contact_list_update = (data) => {
 return{
      type: LIST_UPDATED,
      payload:data
    }
}
