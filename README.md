# automatic-react

## introduction

A set of decorators can transform your react | react hooks | react context app convert into a reative app,
Development mode similar to Vue | Vue composition | vuex

## 简介

一组装饰器可以将你的 react | react-hooks | react-context 应用 改造为 响应式应用,
类似 vue | vue-composition | vuex 的开发模式

## Export Member（导出成员）

- automatic-react -> 将react setState 作为render的操作移除，转而直接修改 proxystate上的属性直接触发渲染。

- [decorator @ProxyState && @ProxyComponent](https://github.com/zhusjfaker/React-Reactive-Proxy-State/wiki/ProxyState-&&-ProxyComponent)
- [function rxhook](https://github.com/zhusjfaker/automatic-react/wiki/function-rxhook) 
- [HocClassComponent ContextProvider && Decorator consumer && type UnPackReactContext](https://github.com/zhusjfaker/automatic-react/wiki/HocClassComponent-ContextProvider-&&-Decorator-consumer-&&-type-UnPackReactContext) 
- [HocClassComponent ReactiveProvider](https://github.com/zhusjfaker/automatic-react/wiki/HocClassComponent-ReactiveProvider)

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

```typescript
import React from "react";
import { ProxyComponent } from "automatic-react";

type IProxyState = {
  count: number;
};

@ProxyComponent()
export class ProxyCounter extends React.Component<
  {},
  { proxystate: IProxyState }
> {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  proxystate: IProxyState = {
    count: 0,
  };

  render() {
    return (
      <div>
        <div>Own component is valid</div>
        <div>{this.state.proxystate.count}</div>
        <button
          onClick={() => {
            this.proxystate.count = this.proxystate.count + 1;
          }}
        >
          {" "}
          add count{" "}
        </button>
        <ProxyCounterChild proxyprop={this.proxystate} />
      </div>
    );
  }
}
```

## ContactInformation
* Email 439453290@qq.com
* Email zhushijie.jayson@bytedance.com

## WorkTogether
<p>
The development of the project is relatively fast, and there may be many areas to be refined. If you like Vue, but at the same time you have to write react. If you like this' lightweight 'solution, you can contact me to improve' automatic react '. Contact address please see the email address in "contact information" above
</p>
<p>
项目开发的比较快，可能还有很多的地方需要细化。如果喜欢Vue，但同时又必须要写React的小伙伴，喜欢这个比较‘轻量级’的解决方案，可以联系我，共同把 ‘automatic-react’ 进行完善。联系地址请看上方的‘联系方式’中的邮箱地址
</p>





