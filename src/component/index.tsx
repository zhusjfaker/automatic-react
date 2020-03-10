import * as React from 'react';
import './index.module.scss';
import { ProxyState, ProxyComponent } from '../util/proxy';

interface ITestProps { }

interface ITestState {

    proxystate: {
        name: string;
        age: number;
        children: any[],
        pad?: any;
        id?: any;
        info: { address: string }
    }

    student: {
        mat: number;
        address: string;
    };

    myname: string;
}

@ProxyComponent()
export class Test extends React.Component<ITestProps, ITestState>{

    @ProxyState()
    public proxystate = {
        name: "tom",
        age: 16,
        children: ["mike", 22, { name: "tolar", age: 11 }],
        pad: null,
        id: undefined,
        info: {
            address: "ksilxi os l66"
        }
    }

    @ProxyState()
    public student = {
        mat: 8928,
        address: "home in beijing"
    }

    @ProxyState(false)
    public myname = "mike jackson"

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.proxystate.name = "rose";
        this.student.mat = 2737;
        this.myname = "6666";
    }

    render(): JSX.Element {
        return (
            <div>
                student name is {this.state.student.mat}
                <br />
                myname is {this.state.myname}
                <br />
                myname is {this.myname}
                <ChildTest obj={this.state.proxystate} />
            </div>
        );
    }
}

export class ChildTest extends React.Component<any, any>{

    public rendercount = 0;

    componentDidMount() {
        this.props.obj.children.push({ age: 99 } as any);
    }

    render(): JSX.Element {
        this.rendercount = this.rendercount + 1;
        console.log(this.rendercount);
        const text = JSON.stringify(this.props, null, 4);
        return (
            <pre>
                {text}
            </pre>
        );
    }
}

