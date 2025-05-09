import { put, takeLatest } from "redux-saga/effects";

import { messagesLoaded } from "../actions";

const fetchConversations = fetch("http://localhost:3001/api/conversations")
  .then((response) => response.json())
  .then((user) => {
    const conversations = user;
    return conversations;
  });

let conversations = [];
const messageDetails = {};
fetchConversations.then((a) => {
  conversations = a;
  conversations.forEach((element) => {
    const id = element._id;
    const fetchConversationMessages = fetch(
      `http://localhost:3001/api/conversations/conversation/${id}`
    )
      .then((response) => response.json())
      .then((user) => {
        const messages = user;
        return messages;
      });
    fetchConversationMessages.then((a) => {
      //console.log(a);
      messageDetails[id] = a;
      //console.log(messageDetails);
    });
  });
  //console.log(messageDetails);
  //console.log(conversations);
  //return conversations;
});

/*const messageDetails = {
  1: [
    {
      imageUrl: null,
      imageAlt: null,
      messageText: "Ok then",
      createdAt: "Apr 16",
      isMyMessage: true,
    },
    {
      imageUrl: require("../../images/profiles/daryl.png"),
      imageAlt: "Daryl Duckmanton",
      messageText: `
                  Yeah I think it's best we do that. Otherwise things won't work well at all. 
                  I'm adding more text here to test the sizing of the speech bubble and the 
                  wrapping of it too.
              `,
      createdAt: "Apr 16",
      isMyMessage: false,
    },
    {
      imageUrl: null,
      imageAlt: null,
      messageText: "Maybe we can use Jim's studio.",
      createdAt: "Apr 15",
      isMyMessage: true,
    },
    {
      imageUrl: require("../../images/profiles/daryl.png"),
      imageAlt: "Daryl Duckmanton",
      messageText: `
                  All I know is where I live it's too hard
                  to record because of all the street noise.
              `,
      createdAt: "Apr 15",
      isMyMessage: false,
    },
    {
      imageUrl: null,
      imageAlt: null,
      messageText: `
                  Well we need to work out sometime soon where
                  we really want to record our video course.
              `,
      createdAt: "Apr 15",
      isMyMessage: true,
    },
    {
      imageUrl: require("../../images/profiles/daryl.png"),
      imageAlt: "Daryl Duckmanton",
      messageText: `
                  I'm just in the process of finishing off the
                  last pieces of material for the course.
              `,
      createdAt: "Apr 15",
      isMyMessage: false,
    },
    {
      imageUrl: null,
      imageAlt: null,
      messageText: "How's it going?",
      createdAt: "Apr 13",
      isMyMessage: true,
    },
    {
      imageUrl: require("../../images/profiles/daryl.png"),
      imageAlt: "Daryl Duckmanton",
      messageText: " Hey mate what's up?",
      createdAt: "Apr 13",
      isMyMessage: false,
    },
    {
      imageUrl: null,
      imageAlt: null,
      messageText: "Hey Daryl?",
      createdAt: "Apr 13",
      isMyMessage: true,
    },
  ],
  2: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Ok fair enough. Well good talking to you.",
      createdAt: "Oct 20",
      isMyMessage: true,
    },
    {
      id: "2",
      imageUrl: require("../../images/profiles/kim.jpeg"),
      imageAlt: "Kim O'Neil",
      messageText: `
                Not sure exactly yet. It will be next year sometime. Probably late.
            `,
      createdAt: "Oct 20",
      isMyMessage: false,
    },
    {
      id: "3",
      imageUrl: null,
      imageAlt: null,
      messageText: "Yeah I know. But oh well. So when is the big date?",
      createdAt: "Oct 19",
      isMyMessage: true,
    },
    {
      id: "4",
      imageUrl: require("../../images/profiles/kim.jpeg"),
      imageAlt: "Kim O'Neil",
      messageText: `
                Well I know you like doing that stuff. But honestly I think
                you are already really talented. It's a shame you haven't found
                what you are looking for yet.
            `,
      createdAt: "Oct 19",
      isMyMessage: false,
    },
    {
      id: "5",
      imageUrl: null,
      imageAlt: null,
      messageText: `
                I'm doing ok. Just working on building some applications to
                bulk up my resume, so I can get a better job.
            `,
      createdAt: "Oct 19",
      isMyMessage: true,
    },
    {
      id: "6",
      imageUrl: require("../../images/profiles/kim.jpeg"),
      imageAlt: "Kim O'Neil",
      messageText: `
                I've just been really busy at work myself, looking to get
                married sometime next year too. How are you going?
            `,
      createdAt: "Oct 19",
      isMyMessage: false,
    },
    {
      id: "7",
      imageUrl: null,
      imageAlt: null,
      messageText: "Yes it has been a little while",
      createdAt: "Oct 19",
      isMyMessage: true,
    },
    {
      id: "8",
      imageUrl: require("../../images/profiles/kim.jpeg"),
      imageAlt: "Kim O'Neil",
      messageText: "Hey!!!! Have not spoken to you for a while",
      createdAt: "Oct 19",
      isMyMessage: false,
    },
    {
      id: "9",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi Kim?",
      createdAt: "Oct 19",
      isMyMessage: true,
    },
  ],
  3: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
  4: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
  5: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
  6: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
  7: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
  8: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
  9: [
    {
      id: "1",
      imageUrl: null,
      imageAlt: null,
      messageText: "Hi",
      createdAt: "1 week ago",
      isMyMessage: true,
    },
  ],
};*/

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const messagesSaga = function* (action) {
  const { conversationId, numberOfMessages, lastMessageId } = action.payload;
  const messages = messageDetails[conversationId];
  const startIndex = lastMessageId
    ? messages.findIndex((message) => message._id === lastMessageId) + 1
    : 0;
  const endIndex = startIndex + numberOfMessages;
  const pageGroup = messages.slice(startIndex, endIndex);
  const newLastMessageId =
    pageGroup.length > 0 ? pageGroup[pageGroup.length - 1].id : null;
  const hasMoreMessages = newLastMessageId && endIndex < messages.length - 1;

  yield delay(1000);

  yield put(
    messagesLoaded(conversationId, pageGroup, hasMoreMessages, newLastMessageId)
  );

  if (hasMoreMessages) {
    yield delay(500);
    yield put({
      type: "MESSAGES_REQUESTED",
      payload: {
        conversationId,
        numberOfMessages,
        lastMessageId: newLastMessageId,
      },
    });
  }
};

export const watchGetMessagesAsync = function* () {
  yield takeLatest("MESSAGES_REQUESTED", messagesSaga);
};
