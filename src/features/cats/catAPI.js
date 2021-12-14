import axios from 'axios'
import { setupCache } from 'axios-cache-adapter';

/**
 * The API Key provided by thecatapi.
 * see: https://docs.thecatapi.com/authentication
 */
const apiKey = '89c72587-01b5-49c0-93ca-263055fb166e';

/**
 * Axios cache adapter. It will increase page
 * performance and user experience.
 */
const cacheInMinutes = 15;
const cache = setupCache({
  maxAge: cacheInMinutes * 60 * 1000
});

/**
 * The axios instance that we will
 * use to call the cat api using
 * the apiKey
 */
const catAPI = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: { 'x-api-key': apiKey },
  adapter: cache.adapter
});

export default catAPI;
