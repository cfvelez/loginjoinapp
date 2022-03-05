import {create, update, remove, get, all} from '../remotes/Story'
export default class Story {

  constructor (id, contactId, title, description) {
    this.id = id;
    this.contactId = contactId;
    this.title = title;
    this.description = description;
  }

  create(){
    return create(this);
  }

  update(){
    return update(this);
  }

  static async remove(id){
    return remove(id);
  }

  static async getById(id){
    return await get(id);
  }

  static async getAll(){
    return await all();
  }

  validate(){
    return this.title.length > 0 && this.contactId > 0;
  }


}
