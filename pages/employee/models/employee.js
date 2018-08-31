import { query, info, addEmployee, updateEmployee } from '../services/employee';

export default {
  namespace: 'employee',

  state: {
    employees: [],
    employee: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: {
          employees: response.data.data
        },
      });
    },

    *fetchOne({ payload }, { call, put}) {
      const response = yield call(info, payload);
      yield put({
        type: 'save',
        payload: {
          employee: response.data
        },
      });
    },

    *create({ payload, callback }, { call ,put }) {
      const response = yield call(addEmployee, payload);
      if(callback) callback(response.data.status)
    },

    *patch({ payload, callback  }, { call, put  }) {
      const response = yield call(updateEmployee, payload);
      if(callback) callback(response.data.status)
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
};
