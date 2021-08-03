import { VFState } from './voiceflow';

const userStates: { [key: string]: VFState } = {};

export const getUserState = (userID: string): any => {
  return userStates[userID] ?? null;
};

export const setUserState = (userID: string, state: VFState): void => {
  userStates[userID] = state;
};
