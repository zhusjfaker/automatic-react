import "reflect-metadata";

type renderUpdateType = (() => void) | ({ isasync: boolean, renderUpdate: () => void })

/**
 * 获取Proxy 对象
 *
 * @export
 * @param {object} obj
 * @param {() => void} renderUpdate
 * @returns {*}
 */
export function ReactiveProxy(obj: object, renderUpdate: renderUpdateType): any {

    let asyncid: NodeJS.Timeout | null = null;

    const handler = {
        get: (target: object, prop: number | string | symbol): any => {
            // 递归创建并返回
            if (typeof target[prop] === 'object' && target[prop] !== null) {
                return new Proxy(target[prop], handler)
            }
            return Reflect.get(target, prop)
        },
        set: (target: object, prop: number | string | symbol, value: any) => {
            const reuslt = Reflect.set(target, prop, value);
            if (typeof renderUpdate === "object" && renderUpdate.isasync === true) {
                if (asyncid) {
                    clearTimeout(asyncid);
                }
                asyncid = setTimeout(() => { renderUpdate.renderUpdate(); }, 0);
            } else if (typeof renderUpdate === "object" && renderUpdate.isasync === false) {
                renderUpdate.renderUpdate();
            } else if (typeof renderUpdate === "function") {
                renderUpdate();
            }
            return reuslt
        }
    }

    const proxyobj = new Proxy(obj, handler)

    Reflect.defineMetadata("$$origindata", proxyobj, obj);
    return proxyobj;
}

export function ReactiveOrigin<T extends any>(proxyobj: T): T {
    return Reflect.getMetadata("$$origindata", proxyobj);
}


