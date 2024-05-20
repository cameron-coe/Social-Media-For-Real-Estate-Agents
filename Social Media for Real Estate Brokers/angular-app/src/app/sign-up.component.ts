import { Component } from "@angular/core";

import { SignupService } from '../services/sign-up.service';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    username: string = '';
    password: string = '';
    confirmPassword: string = '';

    constructor(private signupService: SignupService) {}

    onSubmit(event: Event) {
        event.preventDefault();  // Prevent default form submission

        if (this.password !== this.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        const userData = {
            username: this.username,
            password: this.password
        }

        this.signupService.signUp(userData).subscribe({
            next: response => {
                console.log('Sign-up Successful!');
                console.log(response);
            },
            error: error => {
                console.log('Sign-up Failed!');
                console.log(error.status);
                console.log(error.error.error);
                console.error(error);
            }
        });
    }

}