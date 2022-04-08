import chat from './chat.tmpl.pug';

const chatMock = {
  messages: [
    {
      photoUrl: '',
      nickname: 'Андрей',
      message: 'Изображение',
      time: '10:40',
      counter: 2
    },
    {
      photoUrl: '',
      nickname: 'Андрей',
      message: 'Изображение',
      time: '10:40',
      counter: 2
    }
  ]
}

document.querySelector('#root').innerHTML = chat(chatMock);
