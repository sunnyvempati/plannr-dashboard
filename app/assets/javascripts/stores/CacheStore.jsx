// this is used to cache filter sort pagination requests
class CacheStore {
  constructor() {
    this._contexts = {};
  }

  add(id, params) {
    this._contexts[JSON.stringify(params)].push(id);
  }

  createContext(params, keys=[]) {
    this._contexts[JSON.stringify(params)] = keys;
  }

  contextExists(params) {
    return !!this._contexts[JSON.stringify(params)]
  }

  getEvents(params) {
    return this._contexts[JSON.stringify(params)];
  }

  spliceAndClear(params) {
    let contextIds = this._contexts[JSON.stringify(params)];
    ids.map((id) => {
      contextIds.splice(id, 1);
    });
    this.clear();
  }

  clear() {
    this._contexts = {};
  }
}

export default CacheStore;