export default class UserInfo {
  constructor(selectors) {
    this._userNameElement = document.querySelector(selectors.userNameElement);
    this._userInfoElement = document.querySelector(selectors.userInfoElement);
    this._avatarElement = document.querySelector(selectors.userAvatarElement);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userInfoElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(name, job, avatarUrl) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = job;
    if (!!avatarUrl)
      this._avatarElement.src = avatarUrl;
  }
}
