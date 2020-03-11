# React-Reactive-Proxy-State

## 简介
<pre>
以下2种装饰器，是想抹平在react中修改复杂数据类型必须手动调用setState函数去触发渲染的目的.可以在你的ReactComponentClass中，不用在去任何书写setState有关的
函数代码段,比如数组长度大小变化，数组上元素的变化，对象成员上的变化都可以触发渲染。同样所有class上的 "@ProxyState” 修饰的成员都会自动转为组件的state。实现代码
参考vue 2.0 3.0 和 react-mobx 中间件。
</pre>

## 重要装饰器
* ProxyComponent -> 拦截当前React组件 构造函数AOP增加对应响应过程

* ProxyState -> 
1. 修饰的普通类成员 自动转变为 React组件上state的对象，
2. 且修改 类成员 则触发state渲染
3. 传递响应对象则子组件修改属性也同时触发父组件代理的渲染
4. 需要关闭则可以在内置渲染器中 isProxy参数 设置为 false
5. 新增在组件内部重新修改“引用对象地址” 或 “原始值数值” 则触发组件的渲染 （新增）
6. 跨组件修改Props目前只支持修改Props引用对象上值得修改来触发渲染 （新增）
7. 跨组件修改Props上修改 “引用对象”的地址 和 “原始类型” 的数值 都需要传入对应的change方法。 （新增）

## 使用示例
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

  @ProxyState()
  public myname = "mike jackson"

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    /** 修改引用值触发渲染 */
    this.student.mat = 2737;
  }

  render(): JSX.Element {
    return (
      <div>
        student name is {this.state.student.mat}
        <br />
        myname is {this.state.myname}
        <br />
        student name is {this.state.student.mat}
        <br />
        myname is {this.myname}
        <ChildTest
          name={this.myname}
          obj={this.proxystate}
          changename={(name: string) => {
            this.myname = name;
          }}
          student={this.student}
          changestudent={(student: any) => {
            this.student = student
          }}
        />
      </div>
    );
  }
}


@ProxyComponent()
export class ChildTest extends React.Component<any, any>{

  public rendercount = 0;

  componentDidMount() {
    /** 重新设置单值 */
    this.props.changename("upolsy");
    /** 在引用对象上改值 */
    this.props.student.mat = 9999;
    /** 重新设置引用 */
    this.props.changestudent({
      mat: 2523,
      address: "home in sydeny"
    })
    /** 在引用对象上改值 */
    this.props.obj.name = "jack 666";
    this.props.obj.children.push({ age: 99 });
  }

  render(): JSX.Element {
    this.rendercount = this.rendercount + 1;
    console.log(this.rendercount);
    const text = JSON.stringify(this.props.obj, null, 4);
    return (
      <div>
        ChildTest myname is {this.props.name}
        <pre>
          {text}
        </pre>
      </div>
    );
  }
}




```


