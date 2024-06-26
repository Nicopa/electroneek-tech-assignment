import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

const MAX_LOGS = 20;

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly _logs: string[] = [];
  readonly logsSubject = new Subject<string[]>();
  log(message: string) {
    const datedMessage = `${new Date().toLocaleTimeString()} - ${message}`;
    console.log(datedMessage);
    this._logs.push(datedMessage);
    if (this._logs.length > MAX_LOGS) {
      this._logs.shift();
    }
    this.logsSubject.next(this._logs);
  }
}