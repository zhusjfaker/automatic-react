/* eslint-disable react/display-name */
import React from 'react';
import { ProxyComponent, ProxyState } from './proxy';

type Props<T = any> = {
  context: React.Context<T>;

  initialidata: T;
};

export class ContextProvider<T> extends React.Component<Props<T>, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const Providerlayout = this.props.context.Provider;
    return (
      <React.Fragment>
        <Providerlayout value={this.props.initialidata}>{this.props.children}</Providerlayout>
      </React.Fragment>
    );
  }
}

@ProxyComponent()
export class ReactiveProvider<T> extends React.Component<Props<T>, any> {
  @ProxyState()
  public store = Object.assign({}, this.props.initialidata);

  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const Providerlayout = this.props.context.Provider;
    return (
      <React.Fragment>
        <Providerlayout value={Object.assign({}, this.store)}>{this.props.children}</Providerlayout>
      </React.Fragment>
    );
  }
}

export function consumer<T = any>(provider: React.Context<T>) {
  return function<U extends object>(target: U): U {
    const serivce = provider;
    return ((props: any) => {
      return (
        <serivce.Consumer>
          {value => {
            return React.createElement(target as any, Object.assign({}, value, props));
          }}
        </serivce.Consumer>
      );
    }) as any;
  };
}

export type UnPackReactContext<T> = T extends React.Context<infer U> ? Partial<U> : unknown;
