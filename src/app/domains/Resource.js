import {upload} from '../remotes/Resource'
export default class Resource {

  constructor (title, storypoint_id, owner_id, uri) {
    this.title = title;
    this.owner_id = owner_id;
    this.storypoint_id = storypoint_id;
    this.uri = uri;
  }

  upload(){
    return upload(this);
  }

}
