export class User {
  private username: string;
  private password: string;
  private token: string;
  private email: string;
  private roles: string[];
  private administrator: boolean = false;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  setusername(username: string) {
    this.username = username;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setToken(token: string) {
    this.token = token;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setRoles(roles: string[]) {
    this.roles = roles;
    this.roles.forEach( rol => {
      if (rol === 'Administrator') {
        this.administrator = true;
      }
    });
  }

  setAdministrator(isAdministrator: boolean) {
    this.administrator = isAdministrator;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getToken(): string {
    return this.token;
  }

  getEmail(): string {
    return this.email;
  }

  getRoles(): string[] {
    return this.roles;
  }

  isAdministrator() {
    return this.isAdministrator;
  }

}
