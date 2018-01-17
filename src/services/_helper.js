import auth from '../utils/authenticator';

export const getRequest = (baseUrl, endpoint, authenticated: boolean = false) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  if (authenticated) {
    headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${auth.getToken()}`,
    };
  }

  return new Request(baseUrl + endpoint, {
    method: 'GET',
    headers: new Headers(headers),
  });
};

export const postRequest = (baseUrl, endpoint, body, headers) => {
  const header = headers || {
    'Content-Type': 'application/json',
    authorization: `Bearer ${auth.getToken()}`,
  };
  return new Request(baseUrl + endpoint, {
    method: 'POST',
    headers: new Headers(header),
    body: JSON.stringify(body),
  });
};
