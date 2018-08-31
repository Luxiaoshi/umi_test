import { query, info, change, changeData } from '../services/attendance';

export default {
  namespace: 'attendance',

  state: {
    attendances: [],
    personal_attendances: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: {
          attendances: response.data.data
        },
      });
    },

    *personal({ payload }, { call , put }) {
      const response = yield call(info, payload);
      yield put({
        type: 'save',
        payload: {
          personal_attendances: response.data.data
        },
      });
    },

    *change_status({ payload, callback }, { call, put }) {
      const response = yield call(change, payload);
      if (callback) callback(response.data.status); 
    },

    *change_data({ payload, callback }, { call, put }) {
      const response = yield call(changeData, payload.values);
      if (callback) callback(response.data.status); 
    },

    //*export_data({ payload }, { call, put }) {
    //  const response = yield call(exportData, payload);
    //}
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
};
