import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.module';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) { }

    // gets send when user is logged in
    @Output() login: EventEmitter<void> = new EventEmitter();

  public loginSubmit(loginForm: NgForm): void {
    const { username } = loginForm.value;

    this.loginService.login(username).subscribe({
      next: (trainer: User) => {
        // given access to the user
        this.userService.trainer = trainer;
        // redirect to the trainer page
        this.login.emit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      },
    });
  }
}
