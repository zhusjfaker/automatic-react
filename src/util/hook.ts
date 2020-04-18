import { useState } from 'react';

export function rxhook<T extends object>(obj: T, isasync = false): T {
  let asyncid: NodeJS.Timeout | null = null;
  const [originobj, setoriginobj] = useState(obj);

  const handler = {
    get: (target: object, prop: number | string | symbol): any => {
      // 递归创建并返回
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], handler);
      }
      return Reflect.get(target, prop);
    },
    set: (target: object, prop: number | string | symbol, value: any) => {
      const reuslt = Reflect.set(target, prop, value);
      if (isasync) {
        if (asyncid) {
          clearTimeout(asyncid);
        }
        asyncid = setTimeout(() => {
          setoriginobj(originobj);
        }, 0);
      } else {
        setoriginobj(Object.assign({}, originobj));
      }
      return reuslt;
    },
  };

  const proxyobj = new Proxy(originobj, handler);
  Reflect.defineMetadata('$$origindata', proxyobj, originobj);
  return proxyobj as typeof obj;
}
