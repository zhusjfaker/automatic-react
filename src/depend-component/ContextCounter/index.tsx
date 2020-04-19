import React, { useState } from "react";
import { ContextProvider, consumer, UnPackReactContext } from "../../util";

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
