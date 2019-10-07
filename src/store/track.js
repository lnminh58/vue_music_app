import { get } from 'lodash';
import { serializeError } from 'serialize-error';

import Track from '../api/track';
import { getIndexFromURL } from '../utils/general';

import {
  GET_TRACK_BY_NAME_REQUEST,
  GET_TRACK_BY_NAME_SUCCESS,
  GET_TRACK_BY_NAME_FAIL
} from '../constants/mutationTypes';

const state = {
  track: {
    requesting: false,
    status: '',
    result: null,
    error: null
  },
  trackDetail: {
    requesting: false,
    status: '',
    result: null,
    error: null
  }
};

const actions = {
  async getTrackByName({ state, commit }, params) {
    commit(GET_TRACK_BY_NAME_REQUEST)
    try {
      const res = await Track.searchTrack(params)
      const data = get(res, 'data');
      const nextIndexURL = get(data, 'next')
      const prevIndexURL = get(data, 'prev')

      const nextIndex = nextIndexURL && getIndexFromURL(nextIndexURL)
      const prevIndex = prevIndexURL && getIndexFromURL(prevIndexURL)

      commit(GET_TRACK_BY_NAME_SUCCESS, { ...data, nextIndex, prevIndex })
    } catch (error) {
      commit(GET_TRACK_BY_NAME_FAIL, { error: serializeError(error) })
    }
  }

};

const mutations = {
  [GET_TRACK_BY_NAME_REQUEST](state) {
    state.track.requesting = true
    state.track.status = ''
  },
  [GET_TRACK_BY_NAME_SUCCESS](state, payload) {
    console.log('payload', payload)
    state.track.requesting = false
    state.track.status = 'success'
    state.track.result =
      payload.prevIndex === undefined
        ? payload
        : {
          ...payload,
          data: [...get(state, 'track.result.data', []), ...get(payload, 'data', [])]
        };
  },
  [GET_TRACK_BY_NAME_FAIL](state, payload) {
    state.track.requesting = false
    state.track.status = 'error'
    state.track.error = payload
  }
};

const getters = {
  tracks: state => get(state, 'track.result.data', [])
};

export default {
  state,
  mutations,
  actions,
  getters
};
