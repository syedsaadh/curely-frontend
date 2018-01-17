import { procedures as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class ProceduresService {
  static getAllProcedures() {
    const request = getRequest(_config.baseUrl, '/admin/procedures/all', true);
    return fetch(request);
  }
  static addProcedure(data) {
    const request = postRequest(_config.baseUrl, '/admin/procedures/create', data);
    return fetch(request);
  }
  static editProcedure(data) {
    const request = postRequest(_config.baseUrl, '/admin/procedures/edit', data);
    return fetch(request);
  }
  static deleteProcedure(id) {
    const request = getRequest(_config.baseUrl, `/admin/procedures/delete/${id}`, true);
    return fetch(request);
  }
}

export default ProceduresService;
