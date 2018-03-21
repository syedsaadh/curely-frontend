import { inventory as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class InventoryService {
  static getAllInventory() {
    const request = getRequest(_config.baseUrl, '/admin/inventory/all', true);
    return fetch(request);
  }
  static getInventory(id) {
    const request = getRequest(_config.baseUrl, `/admin/inventory/get/${id}`, true);
    return fetch(request);
  }
  static newItem(data) {
    const request = postRequest(_config.baseUrl, '/admin/inventory/create', data);
    return fetch(request);
  }
  static editItem(data) {
    const request = postRequest(_config.baseUrl, '/admin/inventory/edit', data);
    return fetch(request);
  }
  static deleteItem(id) {
    const request = getRequest(_config.baseUrl, `/admin/inventory/delete/${id}`, true);
    return fetch(request);
  }
}

export default InventoryService;
