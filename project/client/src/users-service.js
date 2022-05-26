function users() {
  get = function () {
    return axios.get('http://localhost:3000/motorcycles');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/motorcycles/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
