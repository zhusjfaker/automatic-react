import React from "react";
import { UnPackReactContext } from "../../util";
export declare const context: React.Context<{
    proxystate: {
        count: number;
    };
}>;
declare type IProxyState = {
    count: number;
};
export declare class Demo extends React.Component<{}, {
    proxystate: IProxyState;
}> {
    state: {
        proxystate: {
            count: number;
        };
    };
    render(): JSX.Element;
}
export declare class ReactiveCounter extends React.Component<UnPackReactContext<typeof context>> {
    render(): JSX.Element;
}
export {};
