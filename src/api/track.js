import http from '../services/http';

export default class Track {
  static searchTrack({ name, index = 0 }) {
    return http.get(`search/track?q=${name}&index=${index}`);
  }
  static getTrack(trackId) {
    return http.get(`track/${trackId}`);
  }
}