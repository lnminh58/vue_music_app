import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import Artist from '../api/artist';
import { getIndexFromURL } from '../utils/general';

import {
  GET_ARTIST_BY_NAME_REQUEST,
  GET_ARTIST_BY_NAME_SUCCESS,
  GET_ARTIST_BY_NAME_FAIL
} from '../constants/mutationTypes';

const state = {
  artist: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
};

const actions = {
  async getArtistByName({ state, commit }, params) {
    commit(GET_ARTIST_BY_NAME_REQUEST);
    try {
      const res = await Artist.searchArtist(params);
      const data = get(res, 'data');
      const nextIndexURL = get(data, 'next');
      const prevIndexURL = get(data, 'prev');

      const nextIndex = nextIndexURL && getIndexFromURL(nextIndexURL);
      const prevIndex = prevIndexURL && getIndexFromURL(prevIndexURL);
      commit(GET_ARTIST_BY_NAME_SUCCESS, { ...data, nextIndex, prevIndex });
    } catch (error) {
      commit(GET_ARTIST_BY_NAME_FAIL, { error: serializeError(error) });
    }
  }
};

const mutations = {
  [GET_ARTIST_BY_NAME_REQUEST](state) {
    state.artist.requesting = true;
    state.artist.status = '';
  },

  [GET_ARTIST_BY_NAME_SUCCESS](state, payload) {
    state.artist.requesting = false;
    state.artist.status = 'success';
    state.artist.result = payload;
  },

  [GET_ARTIST_BY_NAME_FAIL](state, payload) {
    state.artist.requesting = false;
    state.artist.status = 'error';
    state.artist.error = payload;
  }
};

const getters = {
  artists: state => get(state, 'artist.result.data', [])
};

export default {
  state,
  actions,
  mutations,
  getters
};
