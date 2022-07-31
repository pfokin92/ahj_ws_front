/* eslint-disable class-methods-use-this */
export default class Gui {
  constructor() {
    this.newUser = document.querySelector('.name');
    this.next = document.querySelector('.next');
    this.startChat = document.querySelector('.login');
    this.loginLabel = document.querySelector('.header');

    this.chat = document.querySelector('.chat');
    this.send = document.querySelector('.send');
    this.chatInput = document.querySelector('.new-message');

    this.userList = document.querySelector('.user-list');
    this.msgField = document.querySelector('.messages-field');
  }

  changeName() {
    this.loginLabel.style.color = 'red';
    this.newUser.classList.add('invalid');
    this.loginLabel.innerHTML = 'Select another name';
  }

  drawUsersList(user) {
    this.userList.innerHTML += `
    <li class="user-items">${user}</li>
    `;
  }

  drawMsgList(name, msg, user, date) {
    let className = '';
    let login = name;
    if (user === name) {
      className = 'you';
      login = 'You';
    }
    this.msgField.innerHTML += `<div class="message-container ${className}">
      <div class="message">
          <div class="header-message">
              <h6 class="user">${login}</h6>
              <span class="date">${date}</span>
          </div>
          ${msg}
      </div>
    </div>`;
  }
}
