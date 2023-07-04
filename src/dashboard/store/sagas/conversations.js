import { put, takeEvery } from "redux-saga/effects";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchConversations = fetch("/api/conversations")
  .then((response) => response.json())
  .then((user) => {
    const conversations = user;
    return conversations;
  });

// const getConversations = () => {
//   fetchConversations.then((a) => {
//     console.log(a);
//     return a;
//   });
// };
let conversations = [];
fetchConversations.then((a) => {
  conversations = a;
  //console.log(conversations);
  //return conversations;
});

/*const conversations = [
  {
    id: "1",
    imageUrl: require("../../images/profiles/daryl.png"),
    imageAlt: "Daryl Duckmanton",
    title: "Daryl Duckmanton",
    createdAt: "Apr 16",
    latestMessageText: "This is a message",
    messages: [],
  },
  {
    id: "2",
    imageUrl: require("../../images/profiles/kim.jpeg"),
    imageAlt: "Kim O'Neil",
    title: "Kim O'Neil",
    createdAt: "Oct 20",
    latestMessageText: "Ok fair enough. Well good talking to you.",
    messages: [],
  },
  {
    id: "3",
    imageUrl: require("../../images/profiles/john.jpeg"),
    imageAlt: "John Anderson",
    title: "John Anderson",
    createdAt: "1 week ago",
    latestMessageText: "Yes I love how Python does that",
    messages: [],
  },
  {
    id: "4",
    imageUrl: require("../../images/profiles/ben.png"),
    imageAlt: "Ben Smith",
    title: "Ben Smith",
    createdAt: "2:49 PM",
    latestMessageText: "Yeah Miami Heat are done",
    messages: [],
  },
  {
    id: "5",
    imageUrl: require("../../images/profiles/douglas.png"),
    imageAlt: "Douglas Johannasen",
    title: "Douglas Johannasen",
    createdAt: "6:14 PM",
    latestMessageText: "No it does not",
    messages: [],
  },
  {
    id: "6",
    imageUrl: require("../../images/profiles/jacob.png"),
    imageAlt: "Jacob Manly",
    title: "Jacob Manly",
    createdAt: "3 secs ago",
    latestMessageText: "Just be very careful doing that",
    messages: [],
  },
  {
    id: "7",
    imageUrl: require("../../images/profiles/stacey.jpeg"),
    imageAlt: "Stacey Wilson",
    title: "Stacey Wilson",
    createdAt: "30 mins ago",
    latestMessageText: "Awesome!!! Congratulations!!!!",
    messages: [],
  },
  {
    id: "8",
    imageUrl: require("../../images/profiles/stan.jpeg"),
    imageAlt: "Stan George",
    title: "Stan George",
    createdAt: "1 week ago",
    latestMessageText: "Good job",
    messages: [],
  },
  {
    id: "9",
    imageUrl: require("../../images/profiles/sarah.jpeg"),
    imageAlt: "Sarah Momes",
    title: "Sarah Momes",
    createdAt: "1 year ago",
    latestMessageText: "Thank you. I appreciate that.",
    messages: [],
  },
];*/

export const conversationsSaga = function* () {
  yield delay(1000);

  yield put({
    type: "CONVERSATIONS_LOADED",
    payload: {
      conversations,
      selectedConversation: conversations[0],
    },
  });
};

export function* watchGetConversationsAsync() {
  yield takeEvery("CONVERSATIONS_REQUESTED", conversationsSaga);
}
