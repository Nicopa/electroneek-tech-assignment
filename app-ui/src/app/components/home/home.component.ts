import { Component } from '@angular/core';
import { PanelSwitcherService } from '@services/panel-switcher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  panel = '';
  constructor(panelSwitcherService: PanelSwitcherService) {
    panelSwitcherService.selectedPanel.subscribe(panel => this.panel = panel);
  }
}
