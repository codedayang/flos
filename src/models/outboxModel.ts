import {Effect, Model} from "dva";
import {Reducer} from "redux";
import {Channel} from "./inboxModel";
import {createCast, fetchManagedChannels} from "../service/apiService";
import Taro from "@tarojs/taro";


export interface StateType {
    managedChannels: Channel[];
}

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        fetchManagedChannels: Effect;
    };
    reducers: {
        updateState: Reducer;
    };
}


const model: Model & ModelType = {
    namespace: 'outbox',
    state: {
        managedChannels: [],
    },

    effects: {
        * fetchManagedChannels(_, {call, put}) {
            const res = yield call(fetchManagedChannels);
            yield put({
                type: "updateState",
                payload: {
                    managedChannels: res.data.manageChannels
                }
            })
        },
        * createCast({payload}, {call}) {
            yield call(createCast, payload);
            Taro.showToast({
                title: "已发送"
            })
        }
    },


    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload};
        }
    }
};

export default model;