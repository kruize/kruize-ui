import NodeContext from './nodeContext';
import React from 'react';
import { get_ip, get_port } from 'env';

const EnvState = (props) => {
  const ip = get_ip();
  const port = get_port();

  const state = {
    cluster: ip,
    autotune: port
  };
  return <NodeContext.Provider value={state}>{props.children}</NodeContext.Provider>;
};

export default EnvState;
