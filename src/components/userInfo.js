export class UserInfo {
  constructor(firstnameSelector, aboutProfSelector) {
    this.firstnameSelector = document.querySelector(firstnameSelector);
    this.aboutProfSelector = document.querySelector(aboutProfSelector);
  }

  getUserInfo() {
    return {
      name: this.firstnameSelector.textContent,
      about: this.aboutProfSelector.textContent,
    };
  }

  setUserInfo(user) {
    this.firstnameSelector.textContent = user.name;
    this.aboutProfSelector.textContent = user.about;
  }
}
