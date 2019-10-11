import http from '../services/http'

export default class Artist {
  static searchArtist({ name, index = 0 }) {
    return http.get(`search/artist?q=${name}&index=${index}`)
  };
  static getArtist(artistID) {
    return http.get(`artist/${artistID}`)
  }
}
