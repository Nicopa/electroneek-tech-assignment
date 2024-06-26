import { Component, OnInit } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';
import { UserService } from '@services/user/user.service';
import { UserResponseInterface } from '@shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  columnNames = ['username', 'email', 'age', 'address', 'actions'];
  list: UserResponseInterface[] = [];
  constructor(
    private readonly loggerService: LoggerService,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.userService.fetchUsers((users) => {
      this.list = users;
    });
  }
  delete(username: string) {
    this.loggerService.log(`Deleting user ${username}`);
    this.userService.deleteUser(username, () => this.load());
  }
}
