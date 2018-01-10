import 'reflect-metadata'; // this shim is required
import {createSocketServer} from 'socket-controllers';

import './db';
import './MessageController'; // we need to "load" our controller before call createSocketServer. this is required
import './middleware';

createSocketServer(3000);
