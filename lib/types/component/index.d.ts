import * as React from 'react';
import './index.module.scss';
interface ITestProps {
}
interface ITestState {
    proxystate: {
        name: string;
        age: number;
        children: any[];
        pad?: any;
        id?: any;
        info: {
            address: string;
        };
    };
    student: {
        mat: number;
        address: string;
    };
    myname: string;
}
export declare class Test extends React.Component<ITestProps, ITestState> {
    proxystate: {
        name: string;
        age: number;
        children: (string | number | {
            name: string;
            age: number;
        })[];
        pad: null;
        id: undefined;
        info: {
            address: string;
        };
    };
    student: {
        mat: number;
        address: string;
    };
    myname: string;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare class ChildTest extends React.Component<any, any> {
    rendercount: number;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
