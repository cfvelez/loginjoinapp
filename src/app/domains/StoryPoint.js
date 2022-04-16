import {create, update, remove, get, all} from '../remotes/StoryPoint'
export default class StoryPoint {

  constructor (id, name, description, appointment_time, storyId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.appointmentAt = appointment_time;
    this.storyId = storyId;
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
    return this.name.length > 0 && this.storyId > 0;
  }


}
