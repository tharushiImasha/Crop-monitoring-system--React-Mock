export class LoginDetails {
    password: string;
    email: string;

    constructor(password: string, email: string) {
        this.password = password;
        this.email = email;
    }
}