class Auth {
  static getToken() {
    return sessionStorage.jwt;
  }
  static isLoggedIn() {
    return !!sessionStorage.jwt;
  }
  static login(jwt) {
    sessionStorage.setItem('jwt', jwt);
  }

  static logOut() {
    sessionStorage.removeItem('jwt');
  }
}

export default Auth;
