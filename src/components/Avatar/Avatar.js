import UI from '../UIclass/UIclass';
import { FirebaseDB } from '../../utils/FirebaseDB/FirebaseDB';

export default class Avatar extends UI {
  constructor() {
    super();
    this.firebaseDB = new FirebaseDB();
  }

  AvatarMe() {
    const avatarMe = document.querySelector('#account-photo');
    UI.renderElement(
      avatarMe,
      'img',
      null,
      ['src', `${this.usersArray.avatar}`],
      ['class', 'img-fluid rounded-circle mb-1'],
      ['width', '30px'],
      ['height', '30px']
    );
  }

  render() {
    this.firebaseDB.getUsers().then((data) => {
      const uid = localStorage.getItem('uidMath');
      this.usersArray = data.filter((x) => x.id === uid)[0];
      if (this.usersArray) {
        this.AvatarMe();
      }
    });
  }
}
