import Logger from './logger';
import io, { Socket } from 'socket.io-client';
import { store } from "@/store";

export default class VueSocketIO {

    private io: Socket;

    constructor(connection: string, listeners: string[], debug=false){
        Logger.debug = debug;   
        this.io = this.connect(connection);
        this.attach_listeners(listeners);
    }

    install(Vue: any){

        const version = Number(Vue.version.split('.')[0])

        if (version >= 3) {
            Vue.config.globalProperties.$socket = this.io;
            Vue.config.globalProperties.$vueSocketIo = this;
        } else {
            Vue.prototype.$socket = this.io;
            Vue.prototype.$vueSocketIo = this;
        }
        Logger.info('Vue-Socket.io plugin enabled');

    }

    connect(connection: string){
        if(typeof connection === 'string'){
            Logger.info(`Received connection string${connection}`);
            return this.io = io(connection);
        } else {
            throw new Error('Unsupported connection type');
        }

    }

    attach_listeners(listeners: string[]){
        if(this.io.connected !==undefined && listeners.length>0){
            listeners.map((event) => {
                this.io.on(event, (data) => {
                    store.dispatch(`SOCKET_${event}`, data);
                })
            })
        }else{
            throw new Error('connection issue or no event listener passed');
        }
    }

}