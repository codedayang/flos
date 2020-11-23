// @ts-ignore
import React, {useState} from 'react';
import {View} from '@tarojs/components';
import {connect} from 'react-redux';

import {StateType} from '../../models/inboxModel';
import {ConnectProps, ConnectState} from '../../models/connect';

import './index.scss';
import dva from "../../utils/dva";
import Taro, {useReady, useReachBottom} from "@tarojs/taro";
import InboxCard from "./components/inboxCard";


interface OwnProps {
    ws: Taro.SocketTask | null
    str: string;
}

type IProps = StateType & ConnectProps & OwnProps;

const Inbox: Taro.FunctionComponent<IProps> = (props) => {

    const {dispatch} = props;
    useReady(async () => {


        dispatch({
            type: "common/login"
        })
        dispatch({
            type: "inbox/fetchCasts"
        })
        dispatch({
            type: "inbox/connectWebSocket"
        })
        console.log("Ready")
    })
    useReachBottom(async () => {
        dispatch({
            type: "inbox/fetchCasts"
        })
        console.log("Reach Bottom")
    })


    return (
        <View className="inbox-root">
            <View className="card-list">
                {props.casts.map((item) => (
                    <InboxCard {...item}/>
                ))}
            </View>

        </View>
    );
}

const mapStateToProps = ({inbox, loading}: ConnectState) => {
    return {
        ...inbox, ...loading,
        dispatch: dva.getDispatch()
    };
}

export default connect(mapStateToProps)(Inbox)