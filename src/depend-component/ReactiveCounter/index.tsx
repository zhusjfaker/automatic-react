import React from "react";
import { consumer, UnPackReactContext, ReactiveProvider } from "../../util";

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
