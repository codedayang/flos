import {Effect, Model} from "dva";
import {Reducer} from "redux";
import Taro from "@tarojs/taro";
import {Channel} from "./inboxModel";
import {createChannel, fetchChannels, subscribeChannel, unSubscribeChannel} from "../service/apiService";



export interface StateType {
    channels: Channel[];
}

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        fetchChannels: Effect;
        createChannel: Effect;
    };
    reducers: {
        updateState: Reducer;
    };
}


const model: Model & ModelType = {
    namespace: 'channel',
    state: {
        channels: [],
    },

    effects: {
        * fetchChannels(_, {take,select, call, put}) {
            const token = yield select(state => state.common.token);
            if (token == "") yield take("common/login/@@end");
            const preChannels = yield select(state => state.channel.channels);
            const offset = preChannels.length;
            const response = yield call(fetchChannels, {offset: offset, size: 7})

            const resChannels = response.data.channels;
            if (resChannels.length == 0) Taro.showToast({title: "没有更多了"})

            yield put({
                type: "updateState",
                payload: {
                    channels: preChannels.concat(resChannels)
                }
            })
        },
        * createChannel({payload}, {call, put}) {
            yield call(createChannel, payload.title);
            yield put({
                type: "updateState",
                payload: {
                    channels: []
                }
            })
            yield put({
                type: "fetchChannels"
            })
            yield put({
                type: "outbox/fetchManagedChannels"
            })

        },

        *subscribeChannel({payload}, {call, put}) {
            yield call(subscribeChannel, payload.channelId)
            yield put({
                type: "updateState",
                payload: {
                    channels: []
                }
            })
            yield put({
                type: "fetchChannels"
            })
            yield put({
                type: "inbox/completeRefresh"
            })
        },

        *unSubscribeChannel({payload}, {call, put}) {
            yield call(unSubscribeChannel, payload.channelId);
            yield put({
                type: "updateState",
                payload: {
                    channels: []
                }
            })
            yield put({
                type: "fetchChannels"
            })
            yield put({
                type: "inbox/completeRefresh"
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