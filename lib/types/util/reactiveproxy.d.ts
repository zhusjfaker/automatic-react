import 'reflect-metadata';
declare type renderUpdateType = ((val: any, prop: number | string | symbol) => void) | {
    isasync: boolean;
    renderUpdate: (val: any, prop: number | string | symbol) => void;
};
/**
 * 获取Proxy 对象
 *
 * @export
 * @param {object} obj
 * @param {() => void} renderUpdate
 * @returns {*}
 */
export declare function ReactiveProxy(obj: object, renderUpdate: renderUpdateType): any;
export declare function ReactiveOrigin<T extends object>(proxyobj: T): T;
export declare function ReactiveSingle(this: any, property: string): any;
export {};
