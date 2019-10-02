import http from '../services/http'

export default class artist {
  static searchArtist({ name, index = 0 }) {
    return http.get(`search/artist?q=${name}&index=${index}`)
  }
}
