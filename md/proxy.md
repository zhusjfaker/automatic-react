# ProxyState && ProxyComponen

## introduction

@ProxyComponent

```
The reactclasscomponent decorated by the @ proxycomponent decorator will automatically check whether there are proxy members on @ proxystate on all class members

At the same time, after constructing the common react constructor method, all class members with the same name will be assigned to react state. Use as raw value. Class members

The proxy object will be converted to the proxy object, and the assignment of the proxy object will trigger the rendering of the assignment of the member with the same name on the corresponding state.
```

- @ProxyState

```
The reactclasscomponentproperties decorated by the '@ proxystate' decorator will automatically change to {key: string, isproxy: Boolean} object

On the '$$renderstate' key of metadata of the prototype of the class. Form an array of the object. In this way, the array is batched when the proxy constructor is used.
```


## Counter example

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

export const ProxyCounterChild: React.FC<{ proxyprop: IProxyState }> = (
  prop
) => {
  return (
    <div>
      <div>Child component is valid</div>
      <div>{prop.proxyprop.count}</div>
      <button
        onClick={() => {
          prop.proxyprop.count = prop.proxyprop.count + 1;
        }}
      >
        {" "}
        add count{" "}
      </button>
    </div>
  );
};
```

## 简介

- @ProxyComponent

```
被‘@ProxyComponent’装饰器修饰过的 ReactClassComponent 将会自动检查所有的类成员上是否有 ‘@ProxyState’ 上的代理成员
同时 在构造完普通的React Constructor 方法后，会将所有 同名类成员赋值给 React State 上。作为原始值来去使用。 而类成员则
会转化为Proxy的代理对象，对代理对象的赋值则会去触发对应State上 同名成员的赋值渲染。
```

- @ProxyState

```
被 ‘@ProxyState’ 装饰器修饰过的 ReactClassComponentProperties 会自动转为 {key: string, isproxy:boolean} 的对象存在
该Class 的 prototype 的 metadata 的 ‘$$renderstate’ key 上。形成一个该对象的数组。从而在代理构造函数时，对该数组做批处理。
```

## 计数器 Demo

```typescript
import React from "react";
import { ProxyComponent } from "../../util/index";

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

export const ProxyCounterChild: React.FC<{ proxyprop: IProxyState }> = (
  prop
) => {
  return (
    <div>
      <div>Child component is valid</div>
      <div>{prop.proxyprop.count}</div>
      <button
        onClick={() => {
          prop.proxyprop.count = prop.proxyprop.count + 1;
        }}
      >
        {" "}
        add count{" "}
      </button>
    </div>
  );
};
```