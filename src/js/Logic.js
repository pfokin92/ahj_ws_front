export default class Logic {
  constructor(gui) {
    this.gui = gui;
    // this.url = 'ws://localhost:7070/ws';
    this.url = 'wss://ahj-ws-server-pfokin.herokuapp.com';
    this.enterUser = this.enterUser.bind(this);
    this.user = null;
  }

  init() {
    this.wsConnect();
    this.gui.next.addEventListener('click', (e) => this.enterUser(e));
    this.gui.send.addEventListener('click', (e) => this.sendMessage(e));
  }

  enterUser(e) {
    e.preventDefault();
    const val = document.querySelector('.name').value;
    this.user = val;
    this.ws.send(JSON.stringify({ login: val }));
    this.getMessages();
  }

  sendMessage(e) {
    e.preventDefault();
    this.ws.send(JSON.stringify({ message: this.gui.chatInput.value }));
    this.gui.chatInput.value = '';
  }

  getMessages() {
    this.ws.send(JSON.stringify({ messagesList: true }));
  }

  wsConnect() {
    this.ws = new WebSocket(this.url);
    const { ws } = this;
    ws.binaryType = 'blob';
    ws.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log('connected people');
    });
    ws.addEventListener('close', () => {
      // eslint-disable-next-line no-console
      console.log('close');
    });
    ws.addEventListener('message', (e) => {
      const response = JSON.parse(e.data);
      // eslint-disable-next-line no-console
      console.log(response);
      if (!response) {
        this.gui.changeName();
      } else if (!response[0].msg) {
        this.gui.userList.innerHTML = '';
        this.gui.chat.classList.remove('hidden');
        this.gui.startChat.classList.add('hidden');
        response.forEach((user) => {
          this.gui.drawUsersList(user.name);
        });
      } else if (response[0].msg) {
        this.gui.msgField.innerHTML = '';
        response.forEach((msg) => {
          this.gui.drawMsgList(msg.nickname, msg.msg, this.user, msg.date.toString().slice(11, 16));
        });
      }
    });
  }
}
