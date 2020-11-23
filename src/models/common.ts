import Taro from '@tarojs/taro';
import {Reducer} from "redux";
import {Effect, Model} from "dva";
import {login, verify} from "../service/apiService";

export interface StateType {
    token: string;
}

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect;
    };
    reducers: {
        save: Reducer;
    };
}

const model: Model & ModelType = {
    namespace: 'common',
    state: {
        token: Taro.getStorageSync('token'),
    },

    effects: {
        * login(_, {call, put}) {
            const wxLogin = () => new Promise<string>((resolve => {
                Taro.login().then(res => resolve(res.code));
            }))
            const code = yield call(wxLogin);
            const res = yield call(login, code);

            Taro.setStorageSync("token", res.token);
            yield put({
                type: "save",
                payload: {
                    token: res.token
                }
            })

            console.log(yield call(verify))
        }
    },

    reducers: {
        save(state, {payload}) {
            return {...state, ...payload};
        }
    }
};

export default model;
