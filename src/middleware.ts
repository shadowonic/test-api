import {Middleware, MiddlewareInterface} from 'socket-controllers';

@Middleware()
export class CompressionMiddleware implements MiddlewareInterface {
    public use(socket: any, next: ((err?: any) => any)) {
        next();
    }

}
