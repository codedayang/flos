// @ts-ignore
import React, {useState} from 'react';
import {View} from '@tarojs/components';
import {connect} from 'react-redux';

import {StateType} from '../../models/outboxModel';
import {ConnectProps, ConnectState} from '../../models/connect';

import './index.scss';
import dva from "../../utils/dva";
import Taro, {useReady} from "@tarojs/taro";

import { Picker } from '@tarojs/components'
import {AtButton, AtList, AtListItem} from 'taro-ui'
import {Channel} from "../../models/inboxModel";
import { AtTextarea } from 'taro-ui'


type IProps = StateType & ConnectProps;

const Outbox: Taro.FunctionComponent<IProps> = (props) => {

    const {dispatch} = props;
    useReady(async () => {

        dispatch({
            type: "outbox/fetchManagedChannels"
        })
        console.log("Ready")
    })

    const [checked, setChecked] = useState<Channel>();

    const onChange = (event) => {
        setChecked(props.managedChannels[parseInt(event.detail.value)]);
    }

    const [editText, setEditText] = useState("");

    const handleEditTextChange = (value) => {
        setEditText(value);
    }

    const handleCreateClicked = () => {
        if (editText == "") {
            Taro.showToast({title: "内容不能为空"})
            return;
        }

        dispatch({
            type: "outbox/createCast",
            payload: {
                channelId: checked?.id,
                content: editText
            }
        })

    }
    return (
        <View className="">
            <Picker
                mode='selector'
                range={props.managedChannels}
                rangeKey="title"
                onChange={onChange}
                value={0}>
                <AtList>
                    <AtListItem
                        title='选择频道'
                        extraText={checked?.title}
                    />
                </AtList>
            </Picker>

            <AtTextarea
                value={editText}
                onChange={handleEditTextChange}
                maxLength={200}
                placeholder='输入内容...'
            />

            <AtButton type='primary' onClick={() => handleCreateClicked()}>发送</AtButton>


        </View>
    );
}

const mapStateToProps = ({outbox, loading}: ConnectState) => {
    return {
        ...outbox, ...loading,
        dispatch: dva.getDispatch()
    };
}

export default connect(mapStateToProps)(Outbox);