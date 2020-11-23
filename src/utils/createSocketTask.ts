import {SocketTask} from '@tarojs/taro'
import {WS_HOST} from "../config";

export default async () => {
    const option = {
        url: WS_HOST
    }
    const socketTask = await Taro.connectSocket(option);
    const pp = new Promise<SocketTask>(((resolve, reject) => {
        socketTask.onOpen(() => {
            resolve(socketTask);
        });
        socketTask.onError(() => {
            reject();
        });
    }))
    return await pp;
}