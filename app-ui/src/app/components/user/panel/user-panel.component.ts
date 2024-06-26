import { Component } from '@angular/core';
import { PanelName, PanelSwitcherService } from '@services/panel-switcher';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  constructor(private readonly panelSwitcherService: PanelSwitcherService) {}
  switchPanel(name: PanelName) {
    this.panelSwitcherService.setPanel(name);
  }
}
