import http from '../services/http';

export default class Album {
  static getAlbum(albumID) {
    return http.get(`album/${albumID}`)
  };
}
