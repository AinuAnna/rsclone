import { usersArray } from './utils/FirebaseDB/FirebaseDB';

export default class RequestForBD {
  constructor() {
    this.data = null;
  }

  static async getUsers() {
    const users = await usersArray;
    return users.map((el) => ({
      fullName: el.fullName,
      mail: el.mail,
      type: el.type,
      description: el.description,
    }));
  }
}
