import store from '../app/redux/store';

export const getTokens = () => {
  const {token} = store.getState();
  const jwt_token = token?.token ?? null;
  const refresh_token = token?.refresh_token ?? null;
  return {token:jwt_token,refresh_token};
}




