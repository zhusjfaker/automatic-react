import 'reflect-metadata';
/**
 * 获取Proxy 对象
 *
 * @export
 * @param {object} obj
 * @param {() => void} renderUpdate
 * @returns {*}
 */
export function ReactiveProxy(obj, renderUpdate) {
    let asyncid = null;
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
            if (typeof renderUpdate === 'object' && renderUpdate.isasync === true) {
                if (asyncid) {
                    clearTimeout(asyncid);
                }
                asyncid = setTimeout(() => {
                    renderUpdate.renderUpdate(value, prop);
                }, 0);
            }
            else if (typeof renderUpdate === 'object' && renderUpdate.isasync === false) {
                renderUpdate.renderUpdate(value, prop);
            }
            else if (typeof renderUpdate === 'function') {
                renderUpdate(value, prop);
            }
            return reuslt;
        },
    };
    const proxyobj = new Proxy(obj, handler);
    Reflect.defineMetadata('$$origindata', proxyobj, obj);
    return proxyobj;
}
export function ReactiveOrigin(proxyobj) {
    return Reflect.getMetadata('$$origindata', proxyobj);
}
export function ReactiveSingle(property) {
    return Reflect.getMetadata(`$$single_${property}`, this);
}
//# sourceMappingURL=reactiveproxy.js.map