import { roles as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class ProceduresService {
  static getAllRoles() {
    const request = getRequest(_config.baseUrl, '/admin/roles/all', true);
    return fetch(request);
  }
}

export default ProceduresService;
