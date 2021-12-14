import axios from 'axios'

/**
 * The API Key provided by thecatapi.
 * see: https://docs.thecatapi.com/authentication
 */
const apiKey = '89c72587-01b5-49c0-93ca-263055fb166e';

/**
 * The axios instance that we will
 * use to call the cat api using
 * the apiKey
 */
const catAPI = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: { 'x-api-key': apiKey }
});

export default catAPI;
