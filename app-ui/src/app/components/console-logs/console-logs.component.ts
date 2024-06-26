import { Component } from '@angular/core';
import { LoggerService } from '@services/logger';
@Component({
  selector: 'app-console-logs',
  templateUrl: './console-logs.component.html',
  styleUrls: ['./console-logs.component.scss']
})
export class ConsoleLogsComponent {
  messages: string[] = [];

  constructor(loggerService: LoggerService) {
    loggerService.logsSubject.subscribe(logs => {
      this.messages = logs.concat().reverse();
    });
  }

}
