import React from "react";
import { UnPackReactContext } from "../../util";
export declare const context: React.Context<{
    count: number;
    addcount: () => void;
}>;
export declare const Demo: React.FC;
export declare class ContextCounter extends React.Component<UnPackReactContext<typeof context>> {
    render(): JSX.Element;
}
export declare const ContextCounterFC: React.FC<UnPackReactContext<typeof context>>;
