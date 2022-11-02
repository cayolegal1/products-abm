import axios from 'axios';

export const api = axios.create({

    baseURL: 'http://192.168.183.11:8000',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
});