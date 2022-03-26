import httpClient from '../httpClient';

export const create = async(storypoint) =>{
  var http = new httpClient();
  var data = { id: storypoint.id, storyId: storypoint.storyId, name: storypoint.name, description: storypoint.description, appointmentAt: storypoint.appointmentAt};
  http.setToken();
  return http.axios.post('/storypoint',data)
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
  return http.axios.get('/storypoint')
      .then((response) => { response.data}).catch((e) =>{ console.log(e); return []; });
  }

export const update = (storypoint)=> {
  var http = new httpClient();
  var info = { storyId: storypoint.contactId, name: storypoint.name,description: storypoint.description, appointmentAt: storypoint.appointmentAt};
  http.setToken();
  return http.axios.post(`/storypoint/${storypoint.id}`,info)
    .then(() => {
      return true
    })
    .catch((e) =>{
      return false;
    } );
}

export const get = (storypointId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/storypoint/${storypointId}`)
    .then((response) => {
      return response.data
    })
    .catch((e) =>{
      return false;
    } );
}

export const getStoryPointById = (storyId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.get(`/storypoint/story/${storyId}`)
    .then((response) => {
      return response.data
    })
    .catch((e) =>{
      return false;
    } );
}

export const remove = (storypointId)=> {
  var http = new httpClient();
  http.setToken();
  return http.axios.delete(`/storypoint/${storypointId}`)
  .then(() => true)
  .catch((e) =>{
    console.log(e);
    return false;
  } );
}

export const search = (storyId,term) =>{
  if(contactId && term.length > 0 ){
    var info = { term : term.replace(/ /g, "")};
    var http = new httpClient();
    http.setToken();
    return http.axios.post(`/storypoint/story/${storyId}`, info)
    .then((response) => response.data).catch((e) =>{
          return [];
    });
  }
  else{
    return [];
  }
}
