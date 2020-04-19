# HocClassComponent ContextProvider && Decorator consumer && type UnPackReactContext

## introduction

- ContextProvider
<p>
Using 'contextprovider' hocclasscomponent, you can treat react.context.provider equally. It needs to input a 'react context' you created at prop 'context' on the component,And declare the initialization data and input it to the initialidata property on the hoc component.
</p>

- @consumer
<p>
After react 16.1 +, you can use context.consumer to inject data or methods on your component. But writing experience is bad for developers. Developers can simply decorate their components with @consumer, and quickly inject content into the components they need.
</p>

## Counter example
```typescript
import React, { useState } from "react";
import { ContextProvider, consumer, UnPackReactContext } from "automatic-react";

export const context = React.createContext({ count: 0, addcount: () => {} });

export const Demo: React.FC = () => {
  const [count, setCount] = useState(1);

  return (
    <ContextProvider
      context={context}
      initialidata={{
        count: count,
        addcount: () => {
          setCount(count + 1);
        },
      }}
    ></ContextProvider>
  );
};

@consumer(context)
export class ContextCounter extends React.Component<
  UnPackReactContext<typeof context>
> {
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button
          onClick={() => {
            this.props.addcount!();
          }}
        >
          add count
        </button>
      </div>
    );
  }
}

export const ContextCounterFC: React.FC<UnPackReactContext<
  typeof context
>> = consumer(context)((props) => {
  return (
    <div>
      <div>{props.count}</div>
      <button
        onClick={() => {
          props.addcount!();
        }}
      >
        add count
      </button>
    </div>
  );
});

```

## 简介

- ContextProvider
<p>
使用 ‘ContextProvider’ HocClassComponent 你可以把React.Context.Provider同等来看待，它需要传入一个你创建好的 'context',
并且声明好初始化数据，传入给HOC组件上的 initialidata 属性。
</p>

- @consumer

<p>
在 React 16.1+ 后，你可以使用Context.Consumer去注入你的context上的数据 或方法。但是书写形式给开发者体验很差，利用 ‘@consumer’，开发者可以很简单的装饰自己的组件，将内容快速注入自己需要的业务组件内部。
</p>

- UnPackReactContext<T extends React.Contex>
<p>
利用该 ‘UnPackReactContext’ 类型，开发者可以快速在typescript react app的 组件上，声明自己组件注入的 context 的 成员类型。
</p>

## 计数器示例
```typescript
import React, { useState } from "react";
import { ContextProvider, consumer, UnPackReactContext } from "automatic-react";

export const context = React.createContext({ count: 0, addcount: () => {} });

export const Demo: React.FC = () => {
  const [count, setCount] = useState(1);

  return (
    <ContextProvider
      context={context}
      initialidata={{
        count: count,
        addcount: () => {
          setCount(count + 1);
        },
      }}
    ></ContextProvider>
  );
};

@consumer(context)
export class ContextCounter extends React.Component<
  UnPackReactContext<typeof context>
> {
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button
          onClick={() => {
            this.props.addcount!();
          }}
        >
          add count
        </button>
      </div>
    );
  }
}

export const ContextCounterFC: React.FC<UnPackReactContext<
  typeof context
>> = consumer(context)((props) => {
  return (
    <div>
      <div>{props.count}</div>
      <button
        onClick={() => {
          props.addcount!();
        }}
      >
        add count
      </button>
    </div>
  );
});
```