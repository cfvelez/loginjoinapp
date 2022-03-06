import httpClient from '../httpClient';

export const create = async(story) =>{
  var http = new httpClient();
  var data = { id: story.id, contactId: story.contactId, title: story.title, description: story.description};
  http.setToken();
  return http.axios.post('/story',data)
    .then(() => {
      return true;
    })
    .catch((e) =>{
      return false;
    } );
  }

export const all = async() =>{
  var http = new httpClient();
  http.setToken();
  return http.axios.get('/story')
      .then((response) => response.data).catch((e) =>{ console.log(e); return []; });
  }

export const update = (story)=> {
  var http = new httpClient();
  var info = { contactId: story.contactId, title: story.title,description: story.description};
  http.setToken();
  return http.axios.post(`/story/${story.id}`,info)
    .then(() => {
      return true
    })
    .catch((e) =>{
      return false;
    } );
}

export const get = (storyId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/story/${storyId}`)
    .then((response) => {
      return response.data
    })
    .catch((e) =>{
      return false;
    } );
}

export const getByContact = (contactId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/story/contact/${contactId}`)
    .then((response) => {
      return response.data
    })
    .catch((e) =>{
      return false;
    } );
}

export const remove = (storyId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.delete(`/story/${storyId}`)
  .then(() => true)
  .catch((e) =>{
    console.log(e);
    return false;
  } );
}
/*
export const search = (term) =>{
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/contact/search/${term}`)
  .then((response) => response.data)
  .catch((e) =>{
          return [];
  } );
}
*/

