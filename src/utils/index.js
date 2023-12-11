// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get(key) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

export const socketEvents = {
  CONNECTED_EVENT: "connected",
  DISCONNECT_EVENT: "disconnect",
  SOCKET_ERROR_EVENT: "socketError",
  JOIN_ROOM_EVENT: "joinRoom",
  LEAVE_ROOM_EVENT: "leaveRoom",
  START_TIMER_EVENT: "startTimer",
  STOP_TIMER_EVENT: "stopTimer",
  TIMER_TICK_EVENT: "timerTick",
  USER_BROADCAST_EVENT: "broadcastUsers",
  BEORE_QUIZ_START_TIMER: "beforeQuizStartTimer",
  QUIZ_QUESTION_EVENT: "quizQuestion",
  SHOW_QUESTION_TIME: "showQuestionTime",
  SHOW_CORRECT_ANSWER_TIME: "showCorrectAnswerTime",
  SHOW_CORRECT_ANSWER: "showCorrectAnswer",
  SHOW_LEADERBOARD_TIME: "showLeaderboardTime",
  SHOW_LEADERBOARD: "showLeaderboard",
  QUIZ_CHANGE_STATUS_EVENT: "quizChangeStatus",
  QUIZ_ANSWER_EVENT: "quizAnswer",
};

export const question = {
  questions: [
    {
      question: "first question",
      id: "ques_1",
      options: [
        {
          option: "option 1",
          isCorrect: false,
        },
        {
          option: "option 2",
          isCorrect: false,
        },
        {
          option: "option 3",
          isCorrect: false,
        },
        {
          option: "option 4",
          isCorrect: true,
        },
      ],
      time: 10,
    },
    {
      question: "second question",
      id: "ques_2",
      options: [
        {
          option: "option 1",
          isCorrect: false,
        },
        {
          option: "option 2",
          isCorrect: false,
        },
        {
          option: "option 3",
          isCorrect: false,
        },
        {
          option: "option 4",
          isCorrect: true,
        },
      ],
      time: 10,
    },
  ],
  startTime: Date.now() + 10000,
};
