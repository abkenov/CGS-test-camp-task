import axios from 'axios';

export default class HttpSerivce {
  baseUrl: string | undefined;
  fetchingService: any;
  apiVersion: string;
  
  constructor(baseUrl = 'http://localhost:5000', fetchingService = axios, apiVersion = 'api') {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion
  }

  private getFullApiUrl(url: String) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      'Authorization': localStorage.getItem('token'),
    }
  }
  
  private extractUrlAndDataFromConfig({data, url, ...configWithoutDataAndUrl}) {
    return configWithoutDataAndUrl;
  }

  get(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config));
  }

  post(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.post(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config));
  }

  delete(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.delete(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config));
  }

  put(config: any, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      }
    }
    return this.fetchingService.put(this.getFullApiUrl(config.url), config.data, this.extractUrlAndDataFromConfig(config));
  }
}