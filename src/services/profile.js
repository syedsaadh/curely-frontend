import { session as _config } from '../config/service';
import { getRequest, postRequest } from './_helper';

class ProfileService {
  static getProfle() {
    const request = getRequest(_config.baseUrl, '/users/profile', true);
    return fetch(request);
  }
  static updateProfile(data) {
    const request = postRequest(_config.baseUrl, '/users/profile/update', data);
    return fetch(request);
  }
  static changePassword(data) {
    const request = postRequest(_config.baseUrl, '/users/profile/changepassword', data);
    return fetch(request);
  }
}

export default ProfileService;
