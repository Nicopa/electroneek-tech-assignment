import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
    private socket: Socket;
    constructor() {
        this.socket = io('/app-ui', {
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            randomizationFactor: 0.5
        });
    }

    connect() {
        if (!this.socket.connected) {
            this.socket.on('error', (error) => {
                console.error(error);
                throw new Error('Failed to connect to websocket');
            }).on('connect', () => {
                return Promise.resolve();
            }).connect()
        }
        return Promise.resolve();
    }

    disconnect() {
        if (this.socket.connected) {
            this.socket.disconnect();
        }
    }

    ngOnDestroy() {
        this.disconnect();
    }

    on(eventName: string, callback: (data: any) => void) {
        this.socket.on(eventName, callback);
    }

    off(eventName: string) {
        this.socket.off(eventName);
    }

    emit(eventName: string, data?: any) {
        this.socket.emit(eventName, data);
    }

    emitAndWaitResponse(eventName: string, data?: any) {
        return this.socket.emitWithAck(eventName, data);
    }
}
