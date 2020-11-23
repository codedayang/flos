import { AnyAction, Dispatch } from 'redux';
import { StateType as TestState } from './testModel';
import { StateType as InboxState } from './inboxModel';
import { StateType as ChannelState } from './channelModel';
import { StateType as OutboxState } from './outboxModel';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
}

export interface ConnectProps {
  dispatch: Dispatch<AnyAction>;
}

export interface ConnectState {
  loading: Loading;
  inbox: InboxState;
  channel: ChannelState;
  outbox: OutboxState;
}
