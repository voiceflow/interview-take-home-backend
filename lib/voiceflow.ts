export type VFState = any;

export interface VFRequest {
  request: {
    type: string;
    payload: string;
  };
  state: VFState;
}

export interface VFResponse {
  state: VFState;
  trace: any[];
}

export const vfMessage = async (message: string, state: VFState): Promise<VFResponse> => {
  const vfReq = {
    request: {
      type: 'text',
      payload: message,
    },
    state,
  };

  // TODO send request to Voiceflow

  return {
    state,
    trace: [],
  };
};
