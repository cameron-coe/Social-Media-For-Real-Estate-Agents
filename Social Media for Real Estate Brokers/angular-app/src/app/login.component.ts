import { Component } from "@angular/core";

import { LoginService } from "../services/login.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private loginService: LoginService) {}

    onSubmit(event: Event) {
        event.preventDefault();  // Prevent default form submission

        const userData = {
            username: this.username,
            password: this.password
        }

        this.loginService.signUp(userData).subscribe({
            next: response => {
                console.log('Login Successful!');
                console.log(response);
            },
            error: error => {
                console.log('Login Failed!');
                console.log(error.status);
                console.log(error.error.error);
                console.error(error);
            }
        });
    }
}