import * as React from 'react';
import './index.module.scss';
import { ProxyState, ProxyComponent } from '../util/proxy';
import { TestHooks } from '../depend-component/TestHooks';

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
        <TestHooks />
      </div>
    );
  }
}

