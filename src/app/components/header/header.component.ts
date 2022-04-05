import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.module';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get user(): User | undefined {
    return this.userService.trainer;
  }

  constructor(
    private readonly userService: UserService
  ) { }

}
