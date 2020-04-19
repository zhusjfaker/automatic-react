import 'reflect-metadata';
import { ReactiveProxy } from './reactiveproxy';
export function ProxyState(isproxy = true) {
    return function (target, prop) {
        const list = Reflect.getMetadata('$$renderstate', target);
        if (!list) {
            Reflect.defineMetadata('$$renderstate', [{ key: prop, isproxy: isproxy }], target);
        }
        else {
            list.push({ key: prop, isproxy: isproxy });
        }
    };
}
export function ProxyComponent() {
    return function (target) {
        return class extends target {
            constructor(...args) {
                super(...args);
                const keys = Reflect.getMetadata('$$renderstate', this);
                if (keys) {
                    keys.forEach(p => {
                        let origin_object = Reflect.get(this, p.key);
                        const base_object = {};
                        Reflect.set(base_object, p.key, origin_object);
                        this.state = Object.assign(base_object, this.state);
                        /** 处理单值必须增加伪引用层 */
                        Reflect.deleteProperty(this, p.key);
                        Object.defineProperty(this, p.key, {
                            enumerable: true,
                            configurable: true,
                            get: function () {
                                if (p.isproxy) {
                                    if (Object.keys(origin_object).includes('$$issingle') && origin_object.$$issingle === true) {
                                        return origin_object[`single_${p.key}`];
                                    }
                                    else {
                                        const base_object = {};
                                        Reflect.set(base_object, p.key, { ...origin_object });
                                        const reactiveobject = ReactiveProxy(origin_object, (_value, _prop) => {
                                            const proxystate = {};
                                            Reflect.set(proxystate, p.key, { ...origin_object });
                                            this.setState(proxystate);
                                        });
                                        return reactiveobject;
                                    }
                                }
                                else {
                                    return origin_object;
                                }
                            },
                            set: (value) => {
                                if (p.isproxy) {
                                    if (typeof value !== 'object') {
                                        if (typeof origin_object !== 'object') {
                                            const inderit_object = {};
                                            inderit_object[`single_${p.key}`] = value;
                                            inderit_object[`$$issingle`] = true;
                                            const reactiveobject = ReactiveProxy(inderit_object, val => {
                                                const temp = {};
                                                Reflect.set(temp, p.key, val);
                                                this.setState(temp);
                                            });
                                            Reflect.defineMetadata(`$$single_${p.key}`, reactiveobject, this);
                                            origin_object = reactiveobject;
                                        }
                                        else {
                                            origin_object[`single_${p.key}`] = value;
                                        }
                                    }
                                    else {
                                        origin_object = value;
                                        if (this.state[p.key] !== value) {
                                            const temp = {};
                                            Reflect.set(temp, p.key, value);
                                            this.setState(temp);
                                        }
                                    }
                                }
                                else {
                                    origin_object = value;
                                }
                            },
                        });
                        this[p.key] = origin_object;
                    });
                }
            }
        };
    };
}
//# sourceMappingURL=proxy.js.map