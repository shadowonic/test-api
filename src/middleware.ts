import {Middleware, MiddlewareInterface} from 'socket-controllers';

@Middleware()
export class CompressionMiddleware implements MiddlewareInterface {
    public use(socket: any, next: ((err?: any) => any)) {
        console.log('do something, for example get authorsization token and check authorization');
        next();
    }

}
