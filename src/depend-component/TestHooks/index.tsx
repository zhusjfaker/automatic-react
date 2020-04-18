import React, { useEffect } from 'react'
import { rxhook } from '../../util/index';


export const ProxyCounter: React.FC<any> = _props => {

  const state = rxhook({ count: 123, double: 0 });

  useEffect(() => {
    state.double = state.count * 2
  }, [state.count]);

  return (
    <div>
      <div>{state.count}</div>
      <div>{state.double}</div>
      <button
        onClick={() => {
          state.count = state.count + 1;
        }}
      >
        add count
      </button>
    </div>
  )
}