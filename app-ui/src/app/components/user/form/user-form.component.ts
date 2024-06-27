import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { PanelSwitcherService } from 'src/app/services/panel-switcher/panel-switcher.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly userService: UserService,
    private readonly panelSwitcherService: PanelSwitcherService
  ) {}
  userForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    age: new FormControl(0, { validators: [Validators.required, Validators.min(1), Validators.max(150)] }),
    address: new FormControl('', { validators: [Validators.maxLength(20)] }),
  });
  onSubmit() {
    this.loggerService.log('Submitting user form...');
    this.userService.createUser({
      username: this.userForm.controls.username.value!,
      email: this.userForm.controls.email.value!,
      age: this.userForm.controls.age.value!,
      address: this.userForm.controls.address.value || undefined,
    }).subscribe({
      next: () => {
        this.loggerService.log(`User ${this.userForm.controls.username.value} created`);
        this.panelSwitcherService.setPanel('user-list');
      },
      error: (error) => console.error(error)
    });
  }
  async onSubmitSync() {
    this.loggerService.log('Submitting user form...');
    try {
      await this.userService.createUserSync({
        username: this.userForm.controls.username.value!,
        email: this.userForm.controls.email.value!,
        age: this.userForm.controls.age.value!,
        address: this.userForm.controls.address.value || undefined,
      });
      this.panelSwitcherService.setPanel('user-list');
    } catch (error) {}
  }
}
