import { drugcatalog as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class DrugCatalogService {
  static searchDrugs(q) {
    const request = getRequest(_config.baseUrl, `/admin/drugs/search/${q}`, true);
    return fetch(request);
  }
  static getAllDrugs() {
    const request = getRequest(_config.baseUrl, '/admin/drugs/all', true);
    return fetch(request);
  }
  static addDrug(data) {
    const request = postRequest(_config.baseUrl, '/admin/drugs/create', data);
    return fetch(request);
  }
  static editDrug(data) {
    const request = postRequest(_config.baseUrl, '/admin/drugs/edit', data);
    return fetch(request);
  }
  static deleteDrug(id) {
    const request = getRequest(_config.baseUrl, `/admin/drugs/delete/${id}`, true);
    return fetch(request);
  }
}

export default DrugCatalogService;
