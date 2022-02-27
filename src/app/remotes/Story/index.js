import httpClient from '../httpClient';

export const create = async(story) =>{
  var http = new httpClient();
  var data = { contactId: story.contactId,tittle:story.title, description: story.description};
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
/*
export const update = (contact)=> {
  var http = new httpClient();
  var info = { name: contact.name,lastname: contact.lastName};
  http.setToken();
  return http.axios.post(`/contact/${contact.id}`,info)
    .then(() => {
      return true
    })
    .catch((e) =>{
      return false;
    } );
}

export const get = (contactId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/contact/${contactId}`)
    .then((response) => {
      return response.data
    })
    .catch((e) =>{
      return false;
    } );
}

export const remove = (contact)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.delete(`/contact/${contact.id}`)
  .then(() => true)
  .catch((e) =>{
    return false;
  } );
}

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
