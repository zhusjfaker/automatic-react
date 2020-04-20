import React from "react";
declare type IProxyState = {
    count: number;
};
export declare class ProxyCounter extends React.Component<{}, {
    proxystate: IProxyState;
}> {
    constructor(props: Readonly<{}>);
    proxystate: IProxyState;
    render(): JSX.Element;
}
export declare const ProxyCounterChild: React.FC<{
    proxyprop: IProxyState;
}>;
export {};
