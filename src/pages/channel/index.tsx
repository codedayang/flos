// @ts-ignore
import React, {useState} from 'react';
import {Button, View} from '@tarojs/components';
import {connect} from 'react-redux';

import {StateType} from '../../models/channelModel';
import {ConnectProps, ConnectState} from '../../models/connect';

import './index.scss';
import dva from "../../utils/dva";
import Taro, {useReady, useReachBottom} from "@tarojs/taro";
import {AtButton, AtInput, AtList, AtListItem, AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";
import {Channel} from "../../models/inboxModel";



type IProps = StateType & ConnectProps;

const ChannelList: Taro.FunctionComponent<IProps> = (props) => {

    const [value, setValue] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onChange = (value) => {
        console.log(value);
        setValue(value);
    }
    const {dispatch} = props;
    useReady(async () => {

        dispatch({
            type: "channel/fetchChannels"
        })
    })
    useReachBottom(async () => {
        dispatch({
            type: "channel/fetchChannels"
        })
        console.log("Reach Bottom")
    })

    const handleCreateChannel = () => {
        dispatch({
            type: "channel/createChannel",
            payload: {
                title: value
            }
        });
        setModalIsOpen(false);
    }

    const handleChannelListItemClicked = (item: Channel) => {
        if (item.isSubscribed) {
            dispatch({
                type: "channel/unSubscribeChannel",
                payload: {
                    channelId: item.id
                }
            })
        } else {
            dispatch({
                type: "channel/subscribeChannel",
                payload: {
                    channelId: item.id
                }
            })
        }
    };


    return (
        <View className="channel-root">
            <AtButton type='primary' onClick={() => setModalIsOpen(true)}>创建频道</AtButton>
            <AtModal isOpened={modalIsOpen}>
                <AtModalHeader>创建频道</AtModalHeader>
                <AtModalContent>
                    <AtInput
                        name='value'
                        title='标题'
                        type='text'
                        value={value}
                        onChange={onChange}
                    />
                </AtModalContent>
                <AtModalAction>
                    <Button onClick={() => setModalIsOpen(false)}>取消</Button>
                    <Button onClick={() => handleCreateChannel()}>确定</Button>
                </AtModalAction>
            </AtModal>
            <AtList>
                {props.channels.map((item) => (
                    <AtListItem
                        title={item.title}
                        extraText={item.isSubscribed ? "已订阅" : "未订阅"}
                        onClick={() => handleChannelListItemClicked(item)}/>
                ))}
            </AtList>

        </View>
    );
}

const mapStateToProps = ({channel, loading}: ConnectState) => {
    return {
        ...channel, ...loading,
        dispatch: dva.getDispatch()
    };
}

export default connect(mapStateToProps)(ChannelList)