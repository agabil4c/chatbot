class Users {
  constructor() {
    this.users = [];
    this.admins = [];
  }

  addUser(id, name, room) {
    // name = name.trim().toLowerCase();
    // room = room.trim().toLowerCase();

    //   const existingUser = users.find((user) => {
    //     user.room === room && user.name === name;
    //   });

    //   if (existingUser) {
    //     return { error: "Username is taken" };
    //   }
    const user = { id, name, room };
    const admin = { id, name, room };
    if (room === "room1") {
      this.users = [];
      this.users.push(user);
    } else if (room === "room2") {
      this.admins = [];
      this.admins.push(admin);
    }
    return { user, admin };
  }

  removeUser(id) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUsersInRoom(room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

export default Users;
