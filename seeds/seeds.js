const bcrypt = require("bcrypt");
// const faker = require('faker');

const models = require("../models");
const User = models.User;
const Board = models.Board;
const List = models.List;
const Card = models.Card;
const Activity = models.Activity;

function randomZeroToXMinus1(x) {
  return Math.floor(Math.random() * x);
}


module.exports = () => {

  // ----------------------------------------
  // Create Users pending boards
  // ----------------------------------------
  console.log('Creating Users pending boards');
  var users = [];
  for (let i = 1; i < 7; i++) {
    var user = new User({
      email: `foobar${ i }@gmail.com`,
      passwordHash: bcrypt.hashSync("123456", 8),
      cards: [],
      activities: [],
      boards: []
    });
    users.push(user);
  }

  // ----------------------------------------
  // Create Cards
  // ----------------------------------------
  console.log('Creating Cards');
  var cards = [];
  for (let i = 1; i <= 31; i++) {
    var card = new Card({
      title: `Card ${ i }`,
      description: `This card is about ${ i } stuff`,
      users: [],
      activities: [],
    });
    cards.push(card);
  }


// ----------------------------------------
  // Create Lists
  // ----------------------------------------
  console.log('Creating Lists');
  var lists = [];

  var list1 = new List({
    title: 'Project Ideas',
    description: `This is a list for stuff`,
    cards: [cards[0], cards[1], cards[2], cards[3], cards[4], cards[5], cards[6]]
  });
  lists.push(list1);
  var list2 = new List({
    title: 'Deciding Factors',
    description: `This is a list for stuff`,
    cards: [cards[7], cards[8], cards[9], cards[10], cards[11]]
  });
  lists.push(list2);
  var list3 = new List({
    title: 'Project Specifications',
    description: `This is a list for stuff`,
    cards: [cards[12], cards[13]]
  });
  lists.push(list3);
  var list4 = new List({
    title: 'Project Proposals',
    description: `This is a list for stuff`,
    cards: [cards[14], cards[15], cards[16], cards[17]]
  });
  lists.push(list4);
  var list5 = new List({
    title: 'Project Status',
    description: `This is a list for stuff`,
    cards: [cards[18], cards[19], cards[20]]
  });
  lists.push(list5);
  var list6 = new List({
    title: 'Kitchen Renovation',
    description: `This is a list for stuff`,
    cards: [cards[21], cards[22], cards[23], cards[24], cards[25], cards[26], cards[27]]
  });
  lists.push(list6);
  var list7 = new List({
    title: 'Garden Work',
    description: `This is a list for stuff`,
    cards: [cards[28], cards[29], cards[30]]
  });
  lists.push(list7);

  // ----------------------------------------
  // Create Boards
  // ----------------------------------------
  console.log('Creating Boards');
  var boards = [];
  var board1 = new Board({
    title: "Viking Final Project",
    users: [users[0], users[1], users[2], users[3], users[4]],
    owner: users[0],
    lists: [lists[0], lists[1], lists[2], lists[3], lists[4]]
  });
  boards.push(board1);
  var board2 = new Board({
    title: "Home renovation",
    users: [users[0], users[5]],
    owner: users[0],
    lists: [lists[5], lists[6]]
  });
  boards.push(board2);
  
  // ----------------------------------------
  // Add Boards to Users
  // ----------------------------------------
  console.log('Adding Boards to Users');
  for (let i = 0; i < 5; i++) {
    users[i].boards.push(boards[0]);
  }
  users[0].boards.push(boards[1]);
  users[5].boards.push(boards[1]);


  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [
    users,
    boards,
    lists,
    cards
  ].forEach((collection) => {
    collection.forEach((model) => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};