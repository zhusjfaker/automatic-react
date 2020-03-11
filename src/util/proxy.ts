import "reflect-metadata"
import { ReactiveProxy } from '.';

export function ProxyState(isproxy: boolean = true) {
  return function (this: any, target: any, prop: string | number | symbol) {
    let list: any[] = Reflect.getMetadata("$$renderstate", target);
    if (!list) {
      Reflect.defineMetadata("$$renderstate", [{ key: prop, isproxy: isproxy }], target);
    } else {
      list.push({ key: prop, isproxy: isproxy });
    }
  }
}


export function ProxyComponent() {
  return function (target: any) {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        const keys: any[] = Reflect.getMetadata("$$renderstate", this);
        if (keys) {
          keys.forEach(p => {
            let origin_object = Reflect.get(this, p.key);
            let base_object = {};
            Reflect.set(base_object, p.key, origin_object);
            this.state = Object.assign(base_object, this.state);
            /** 处理单值必须增加伪引用层 */
            Reflect.deleteProperty(this, p.key);
            Object.defineProperty(this, p.key, {
              enumerable: true,
              configurable: true,
              get: function () {
                if (p.isproxy) {
                  if (Object.keys(origin_object).includes("$$issingle") && origin_object.$$issingle === true) {
                    return origin_object[`single_${p.key}`];
                  } else {
                    let base_object = {};
                    Reflect.set(base_object, p.key, origin_object);
                    const reactiveobject = ReactiveProxy(origin_object, () => {
                      this.setState(base_object)
                    })
                    return reactiveobject
                  }
                } else {
                  return origin_object
                }
              },
              set: (value: any) => {
                if (p.isproxy) {
                  if (typeof value !== "object") {
                    if (typeof origin_object !== "object") {
                      let inderit_object = {};
                      inderit_object[`single_${p.key}`] = value;
                      inderit_object[`$$issingle`] = true;
                      const reactiveobject = ReactiveProxy(inderit_object, (val) => {
                        let temp = {};
                        Reflect.set(temp, p.key, val);
                        this.setState(temp);
                      });
                      Reflect.defineMetadata(`$$single_${p.key}`, reactiveobject, this);
                      origin_object = reactiveobject;
                    } else {
                      origin_object[`single_${p.key}`] = value;
                    }
                  } else {
                    origin_object = value;
                    if (this.state[p.key] !== value) {
                      let temp = {};
                      Reflect.set(temp, p.key, value);
                      this.setState(temp);
                    }
                  }
                } else {
                  origin_object = value;
                }
              }
            });
            this[p.key] = origin_object;
          });
        }
      }
    } as any
  }
}