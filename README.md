# React-Reactive-Proxy-State

# 重要装饰器
ProxyComponent -> 拦截当前React组件 构造函数AOP增加对应响应过程
ProxyState -> 1. 修饰的普通类成员 自动转变为 React组件上state的对象，
              2. 且修改 类成员 则触发state渲染
              3. 传递响应对象则子组件修改属性也同时触发父组件代理的渲染
              4. 需要关闭则可以在内置渲染器中 isProxy参数 设置为 false

# 使用示例
```typescript

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
        // 直接触发当前组件渲染
        this.proxystate.name = "rose";
        // 直接触发当前组件渲染
        this.student.mat = 2737;
        // 响应开关关闭不触发渲染
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
        // 直接触发父组件渲染
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



```


