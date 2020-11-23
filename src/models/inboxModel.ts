import {Reducer} from 'redux';
import {Model} from 'dva';
import {SocketTask} from '@tarojs/taro'
import {fetchCasts} from "../service/apiService";
import Taro from "@tarojs/taro";
import io from "weapp.socket.io";
import {WS_HOST} from "../config";

export interface Cast {
    id: number;
    channelTitle: string;
    channelId: number;
    content: string;
    updatedAt: number; //传时间戳
    channel: Channel;
}

export interface Channel {
    id: number;
    title: string;
    isSubscribed?: boolean;
}

export interface StateType {
    casts: Cast[];
    socketTask: Taro.SocketTask | null
    socketIsOk: boolean;
}

interface ModelType {
    namespace: string;
    state: StateType;
    effects: {};
    reducers: {
        updateState: Reducer;
    };
}

const model: Model & ModelType = {
    namespace: 'inbox',
    state: {
        casts: [],
        socketTask: null,
        socketIsOk: false
    },
    effects: {
        * fetchCasts(_, {take,select, call, put}) {
            const token = yield select(state => state.common.token);
            if (token == "") yield take("common/login/@@end");
            const preCasts = yield select(state => state.inbox.casts);
            const offset = preCasts.length;
            const response = yield call(fetchCasts, {offset: offset, size: 7})

            const resCasts = response.data.casts;
            if (resCasts.length == 0) Taro.showToast({title: "没有更多了"})

            yield put({
                type: "updateState",
                payload: {
                    casts: preCasts.concat(resCasts)
                }
            })
        },
        * connectWebSocket(_, {select, take, call, put}) {
            let token = yield select(state => state.common.token);
            if (token == "") yield take("common/login/@@end");
            token = yield select(state => state.common.token);
            const conn = () => new Promise((resolve) => {
                const socket = io(`${WS_HOST}?token=${token}`)
                socket.on("connect", () => resolve(socket));
            })
            const sk = yield call(conn);

            const upw = () => new Promise((resolve => {
                sk.on("updated", (payload) => {
                    resolve(payload);
                })
            }))

            while (true) {
                const cast = yield call(upw);
                yield put({
                    type: "receiveUpdate",
                    payload: cast
                })
            }


            // yield take("websocketOK")
            // yield put({
            //     type: "ws/sendMessage"
            // })
        },
        * receiveUpdate({payload}, {select, put}) {
            Taro.pageScrollTo({
                scrollTop: 0,
                duration: 150
            })
            Taro.showToast({title: "有新消息"})
            console.log(payload);
            const preCasts = yield select(state => state.inbox.casts);
            const cc = [payload].concat(preCasts);
            console.log(cc);
            yield put({
                type: "updateState",
                payload: {
                    casts: [payload].concat(preCasts)
                }
            })
        },
        * sendMessage({payload}, {select}) {
            const socketTask: SocketTask = yield select((state) => {
                console.log(state);
                return state.ws.ws;
            })
            socketTask.send({
                data: payload,
            })
        },
        * completeRefresh(_,  {put}) {
            yield put({
                type: "updateState",
                payload: {
                    casts: []
                }
            })
            yield put({
                type: "fetchCasts",
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
