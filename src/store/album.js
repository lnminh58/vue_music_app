import { get } from 'lodash'
import { serializeError } from 'serialize-error'

import {
  GET_ALBUM_BY_ID_REQUEST,
  GET_ALBUM_BY_ID_SUCCESS,
  GET_ALBUM_BY_ID_FAIL
} from '../constants/mutationTypes'

import Album from '../api/album'

const state = {
  album: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
};

const actions = {
  async getAlbumByID({ state, commit }, albumID) {
    commit(GET_ALBUM_BY_ID_REQUEST);
    try {
      const res = await Album.getAlbum(albumID);
      const data = get(res, 'data');
      commit(GET_ALBUM_BY_ID_SUCCESS, data)
      console.log('albumJS', data)
    } catch (error) {
      commit(GET_ALBUM_BY_ID_FAIL, { error: serializeError(error
      ) })
    }
  }
};

const mutations = {
  [GET_ALBUM_BY_ID_REQUEST](state) {
    state.album.requesting = true;
    state.album.status = '';
  },
  [GET_ALBUM_BY_ID_SUCCESS](state, payload) {
    state.album.requesting = false;
    state.album.status = 'success';
    state.album.result = payload;
  },
  [GET_ALBUM_BY_ID_FAIL](state, payload) {
    state.album.requesting = false;
    state.album.status = 'error';
    state.album.result = payload;
  },
};

const getters = {
  album: state => get(state, 'album.result.data', {})
};

export default {
  state,
  actions,
  mutations,
  getters
}
