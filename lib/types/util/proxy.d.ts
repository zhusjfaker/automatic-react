import 'reflect-metadata';
export declare function ProxyState(isproxy?: boolean): (this: any, target: any, prop: string | number | symbol) => void;
export declare function ProxyComponent(): (target: any) => any;
