import Request from '../utils/request';
import {Cast, Channel} from "../models/inboxModel";

export interface BaseResponse<T> {
    success: boolean;
    data: T;
}
export interface LoginReq {
    code: string;
}

export interface LoginRes {
    token: string;

}
export const login = async (code: string) => await Request<LoginReq, LoginRes>({
    url: '/auth/login',
    method: "POST",
    data: {
        code: code
    }
})

export interface FetchCastsReq {
    offset: number;
    size: number;
}

export interface FetchCastsRes {
    total: number;
    casts: Cast[];
}

export const fetchCasts = async (req: FetchCastsReq) => await Request<FetchCastsReq, BaseResponse<FetchCastsRes>>({
    url: '/cast/getSubscribed',
    method: "POST",
    data: req
})

export interface FetchChannelsReq {
    offset: number;
    size: number;
}

export interface FetchChannelsRes {
    total: number;
    channels: Channel[];
}

export const fetchChannels = async (req: FetchChannelsReq) => await Request<FetchCastsReq, BaseResponse<FetchCastsRes>>({
    url: "/channel/getAll",
    method: "POST",
    data: req
})

export interface CreateChannelReq {
    title: string;
}

export const createChannel = async (title: string) => await Request<CreateChannelReq, BaseResponse<void>>({
    url: "/channel/create",
    method: "POST",
    data: {
        title: title
    }
})

export interface SubscribeChannelReq {
    channelId: number;
}

export const subscribeChannel = async (channelId: number) => await Request<SubscribeChannelReq, BaseResponse<void>>({
    url: "/channel/subscribe",
    method: "POST",
    data: {
        channelId: channelId
    }
})

export interface UnSubscribeChannelReq {
    channelId: number;
}
export const unSubscribeChannel = async (channelId: number) => await Request<UnSubscribeChannelReq, BaseResponse<void>>({
    url: "/channel/unsubscribe",
    method: "POST",
    data: {
        channelId: channelId
    }
})

export interface CreateCastReq {
    channelId: number;
    content: string;
}

export const createCast = async (req: CreateCastReq) => await Request<CreateCastReq, BaseResponse<void>>({
    url: "/cast/create",
    method: "POST",
    data: req
})

export const fetchManagedChannels = async () => await Request({
    url: "/channel/managedList",
    method: "GET",
    data: {}
})
export const verify = async () => await Request({
    url: "/auth/verify",
    method: "GET",
    data:{}
})

export const tec = async () => await Request({
    url: '/e28b462e-20e6-4023-8ff5-06a1dfc46b0c',
    method: "GET",
    data: {}
});