# HocClassComponent ReactiveProvider

## introduction

- ReactiveProvider
<p>
You can understand that 'contextprovider' adds an upgraded version of auto rendering. Different from the previous react.context, development not only needs to pass in 'data' but also 'modify data' methods. The 'reactiveprovider' can let you pass in the data, as a proxy rendering object, directly assign the 'data' value, which will trigger. Under all the components, the components included in the '@ consumer' method will be used for rendering and updating.
</p>

## Counter example

```typescript
import React from "react";
import {
  consumer,
  UnPackReactContext,
  ReactiveProvider,
} from "automatic-react";

export const context = React.createContext({ proxystate: { count: 0 } });

type IProxyState = {
  count: number;
};

export class Demo extends React.Component<{}, { proxystate: IProxyState }> {
  state = {
    proxystate: {
      count: 1,
    },
  };

  render() {
    return (
      <ReactiveProvider context={context} initialidata={this.state}>
        <ReactiveCounter />
      </ReactiveProvider>
    );
  }
}

@consumer(context)
export class ReactiveCounter extends React.Component<
  UnPackReactContext<typeof context>
> {
  render() {
    return (
      <div>
        <div>{this.props.proxystate!.count}</div>
        <button
          onClick={() => {
            this.props.proxystate!.count = this.props.proxystate!.count + 1;
          }}
        >
          add count
        </button>
      </div>
    );
  }
}
```

## 简介

- ReactiveProvider
<p>
你可以理解为‘ContextProvider’增加自动渲染功能的升级版。不同于以往的React.context，开发不仅需要传入 ‘数据’ 还需要传入 ‘修改数据’ 的方法， ‘ReactiveProvider’ 可以让你传入的数据，作为代理渲染对象，直接对 ‘数据’赋值，则会触发，所有该组件下，被‘@consumer’方法包含的组件去进行渲染更新。
</p>


## 计数器示例

```typescript
import React from "react";
import {
  consumer,
  UnPackReactContext,
  ReactiveProvider,
} from "automatic-react";

export const context = React.createContext({ proxystate: { count: 0 } });

type IProxyState = {
  count: number;
};

export class Demo extends React.Component<{}, { proxystate: IProxyState }> {
  state = {
    proxystate: {
      count: 1,
    },
  };

  render() {
    return (
      <ReactiveProvider context={context} initialidata={this.state}>
        <ReactiveCounter />
      </ReactiveProvider>
    );
  }
}

@consumer(context)
export class ReactiveCounter extends React.Component<
  UnPackReactContext<typeof context>
> {
  render() {
    return (
      <div>
        <div>{this.props.proxystate!.count}</div>
        <button
          onClick={() => {
            this.props.proxystate!.count = this.props.proxystate!.count + 1;
          }}
        >
          add count
        </button>
      </div>
    );
  }
}
```