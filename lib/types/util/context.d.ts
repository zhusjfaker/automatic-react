import React from 'react';
declare type Props<T = any> = {
    context: React.Context<T>;
    initialidata: T;
};
export declare class ContextProvider<T> extends React.Component<Props<T>, any> {
    constructor(props: Props);
    render(): JSX.Element;
}
export declare class ReactiveProvider<T> extends React.Component<Props<T>, any> {
    store: {} & T;
    constructor(props: Props);
    render(): JSX.Element;
}
export declare function consumer<T = any>(provider: React.Context<T>): <U extends object>(target: U) => U;
export declare type UnPackReactContext<T> = T extends React.Context<infer U> ? Partial<U> : unknown;
export {};
