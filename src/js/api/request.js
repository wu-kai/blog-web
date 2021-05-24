import axios from 'axios';
import { APP_ID, APP_KEY, BASE_API_URL, LOCAL_URL } from 'constant/leadCloud'

const { isCancel } = axios;

function getInstance() {
  let instance = axios.create({
    baseURL: `${process.env.NODE_ENV === 'development' ? LOCAL_URL : BASE_API_URL}`,
    timeout: 30000,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    }
  });

  instance.interceptors.request.use((config) => {
    config.withCredentials = true;
    let url = config.url;
    config.headers = {
      ...config.headers,
      'X-LC-Id': APP_ID,
      'X-LC-Key': APP_KEY
    };
    if (config.method === 'get' && config.params) {
      url += '?';
      let keys = Object.keys(config.params);
      for (let key of keys) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
      url = url.substring(0, url.length - 1);
      config.params = {}
    }
    config.url = url;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const { response } = error;
    if (isCancel(error)) {
      return Promise.reject({ data: { errMsg: error, type: 'cancel' } });
    }
    return Promise.reject(response);
  });

  return instance;
}

const request = getInstance();
export default request;
