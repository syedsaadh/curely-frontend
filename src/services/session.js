import { session as _config } from '../config/service';

const getRequest = endpoint =>
  new Request(_config.baseUrl + endpoint, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

class SessionService {
  static login(credentials) {
    const request = new Request(`${_config.baseUrl}/users/login`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(credentials),
    });
    return fetch(request)
      .then(response => response)
      .catch((error) => {
        console.log('Fetch Error :-S', error);
        return error;
      });
  }
  static signup(credentials) {
    const request = new Request(`${_config.baseUrl}user/signup`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(credentials),
    });

    return fetch(request)
      .then(response => response)
      .catch((error) => {
        console.log('Fetch Error :-S', error);
        return error;
      });
  }

  static verifyEmail(token) {
    const request = getRequest(`user/verify?token=${token}`, 'GET');
    return fetch(request)
      .then(response => response)
      .catch((error) => {
        console.log('Fetch Error :-S', error);
      });
  }

  static resetPassword(email) {
    const request = getRequest(`user/resetpassword?email=${email}`, 'GET');
    return fetch(request)
      .then(response => response)
      .catch((error) => {
        console.log('Fetch Error :-S', error);
      });
  }

  static setPassword(passwordWithToken) {
    const request = new Request(`${_config.baseUrl}user/setpassword`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(passwordWithToken),
    });

    return fetch(request)
      .then(response => response)
      .catch((error) => {
        console.log('Fetch Error :-S', error);
        return error;
      });
  }
}

export default SessionService;
