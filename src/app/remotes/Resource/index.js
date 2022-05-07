import httpClient from '../httpClient';

export const upload = async(resource) =>{
  var http = new httpClient();
  var data = { tiitle:resource.tiitle , storypoint_id: resource.storypointId, owner_id: resource.ownerId, base64File: resource.uri};
  http.setToken();
  return http.axios.post('/resource',data)
    .then(() => {
      return true;
    })
    .catch((e) =>{
      return false;
    } );
  }
