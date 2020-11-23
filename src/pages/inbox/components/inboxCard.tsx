// @ts-ignore
import React from 'react';
import Taro from "@tarojs/taro"
import {AtCard} from "taro-ui";
import {Channel} from "../../../models/inboxModel";
import * as timeago from 'timeago.js';
import {format} from "timeago.js";

export interface InboxCardProps {
    channelTitle: string;
    channelId: number;
    content: string;
    updatedAt: number; //传时间戳
    channel: Channel;
}

const InboxCard: Taro.FunctionComponent<InboxCardProps> = (props) => {
    return (
        <AtCard
            className="card"
            title={props.channel.title}
            extra={format(props.updatedAt*1000, "zh_CN")}
        >
            {props.content}
        </AtCard>
    );
}

export default InboxCard;