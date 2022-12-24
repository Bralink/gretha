export class RegisterModel{
    public email: string = "";
    public password: string = "";
    public name: string = "";
    public license: string = "";
    public state: string = "";
    public grade: string = "Dr.";
    public institution: string = "";
}

export class LoginModel{
    public username: string = "";
    public password: string = "";
}

export class RecoveryPasswordModel{
    public username: string = "";
    public password: string = "";
    public confirmPassword: string = "";
    public code: number = 0;
}