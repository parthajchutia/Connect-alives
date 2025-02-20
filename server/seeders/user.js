import { faker, simpleFaker } from "@faker-js/faker";
import { User } from "../models/user.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];
    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }
    await Promise.all(usersPromise);

    console.log("Users created", numUsers);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }
    await Promise.all(chatsPromise);

    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id"); // Fetch user IDs
    const chatsPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = new Set();

      // Select unique random members
      while (members.size < numMembers) {
        const randomIndex = Math.floor(Math.random() * users.length);
        members.add(users[randomIndex]._id.toString());
      }

      const membersArray = Array.from(members);

      // Create a chat
      const chat = Chat.create({
        name: faker.lorem.words(2),
        members: membersArray,
        creator: membersArray[0],
      });

      chatsPromise.push(chat);
    }

    // Wait for all chats to be created
    await Promise.all(chatsPromise);

    console.log("Chats created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

export { createUser, createSingleChats, createGroupChats };
