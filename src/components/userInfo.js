export class UserInfo {
  constructor (selector) {
    this._name = document.querySelector(selector.name);
    this._about = document.querySelector(selector.about);
    this._avatar = document.querySelector(selector.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
  }

  setUserAvatar(link) {
    this._avatar.src = link
  }
}



//-----------------------------------------  Алена начало
/* export class UserInfo {
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
} */
//-----------------------------------------  Алена конец