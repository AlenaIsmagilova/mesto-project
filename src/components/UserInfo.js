export class UserInfo {
  constructor(selector) {
    this._name = document.querySelector(selector.name);
    this._about = document.querySelector(selector.about);
    this._avatar = document.querySelector(selector.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
