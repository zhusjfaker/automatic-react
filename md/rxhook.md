# function rxhook

## introduction
```
Instead of using usestate in react hooks, instead of returning [object setobject], it is changed to a proxy object. The modification of the proxy object will trigger the rendering update of function components
```

## Counter example

```typescript
import React, { useEffect } from 'react'
import { rxhook } from 'automatic-react';


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
```

## 简介
```
在ReactHooks 中替代 useState 来使用，不再返回 [object setobject] 而是改为 代理对象， 对代理对象的修改则会触发 函数组件的渲染更新
```

```typescript
import React, { useEffect } from 'react'
import { rxhook } from 'automatic-react';


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
```