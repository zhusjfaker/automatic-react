import React from "react";
import { ProxyComponent, ProxyState } from "../../util/index";

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

  @ProxyState()
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
