import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PanelName = 'user-list' | 'user-form' | 'user-chat';

@Injectable({
  providedIn: 'root'
})
export class PanelSwitcherService {
  private _selectedPanel = new BehaviorSubject<PanelName>('user-list');
  get selectedPanel() {
    return this._selectedPanel.asObservable();
  }
  setPanel(name: PanelName) {
    this._selectedPanel.next(name);
  }
}
