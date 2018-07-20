import { Middleware, KoaMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before' })
export class CustomErrorHandler implements KoaMiddlewareInterface {
  public async use(context: any, next: (err?: any) => Promise<any>) {
    try {
      await next();
    } catch (e) {
      let payload = e;
      if (e.errors) {
        e.errors.forEach(item => {
          payload.message = (Object.values(item.constraints));
          payload.status = 405    
        });
      }

      if (e.isBoom) {
        payload = e.output.payload;
        payload.data = e.data;
      }
      context.status = payload.statusCode || payload.status || 500;
      context.body = payload;
    }
  }
}
