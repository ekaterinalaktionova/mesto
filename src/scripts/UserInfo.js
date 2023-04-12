export default class UserInfo {
  constructor(selectors) {
    this._userNameElement = document.querySelector(selectors.userNameElement);
    this._userInfoElement = document.querySelector(selectors.userInfoElement);
  }

  getUserInfo(){
    return {
      name: this._userNameElement.textContent,
      job: this._userInfoElement.textContent,
    };
  }

  setUserInfo(name, job){
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = job;
  }
}
