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
                keys.forEach(p => {
                    const origin_object = Reflect.get(this, p.key);
                    let base_object = {};
                    Reflect.set(base_object, p.key, origin_object);
                    if (p.isproxy == true) {
                        const reactiveobject = ReactiveProxy(origin_object, () => {
                            this.setState(base_object)
                        })
                        Reflect.set(this, p.key, reactiveobject);
                    }
                    this.state = Object.assign(base_object, this.state);
                });
            }
        } as any
    }
}