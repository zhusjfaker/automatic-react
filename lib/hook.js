import { useState } from 'react';
export function rxhook(obj, isasync = false) {
    let asyncid = null;
    const [originobj, setoriginobj] = useState(obj);
    const handler = {
        get: (target, prop) => {
            // 递归创建并返回
            if (typeof target[prop] === 'object' && target[prop] !== null) {
                return new Proxy(target[prop], handler);
            }
            return Reflect.get(target, prop);
        },
        set: (target, prop, value) => {
            const reuslt = Reflect.set(target, prop, value);
            if (isasync) {
                if (asyncid) {
                    clearTimeout(asyncid);
                }
                asyncid = setTimeout(() => {
                    setoriginobj(originobj);
                }, 0);
            }
            else {
                setoriginobj(Object.assign({}, originobj));
            }
            return reuslt;
        },
    };
    const proxyobj = new Proxy(originobj, handler);
    Reflect.defineMetadata('$$origindata', proxyobj, originobj);
    return proxyobj;
}
//# sourceMappingURL=hook.js.map