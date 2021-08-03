import axios from 'axios';

export type VFState = any;

export interface VFRequest {
  request: {
    type: string;
    payload?: string;
  };
  state?: VFState;
}

export interface VFResponse {
  state: VFState;
  trace: any[];
}

const vfRequest = async (req: VFRequest) => {
  const { VOICEFLOW_ENDPOINT, VOICEFLOW_KEY, VOICEFLOW_VERSION } = process.env;

  const config = {
    headers: {
      Authorization: VOICEFLOW_KEY,
      'Content-Type': 'application/json',
    },
  };

  let vfRes = null;
  try {
    vfRes = await axios.post(`${VOICEFLOW_ENDPOINT}/interact/${VOICEFLOW_VERSION}`, req, config);
  } catch (e) {
    console.error(e);
  }

  return vfRes;
};

export const parseTrace = (trace: VFResponse['trace']): string[] => {
  console.log(trace);
  const resMessages: string[] = [];
  trace.forEach((t) => {
    if (t.type === 'speak' && t.payload?.message) {
      resMessages.push(t.payload.message);
    }
  });
  return resMessages;
};

export const vfLaunch = async (): Promise<VFResponse | null> => {
  const res = await vfRequest({
    request: {
      type: 'launch',
    },
  });

  return res?.data;
};

export const vfMessage = async (message: string, state: VFState): Promise<VFResponse | null> => {
  const res = await vfRequest({
    request: {
      type: 'text',
      payload: message,
    },
    state,
  });

  return res?.data;
};
