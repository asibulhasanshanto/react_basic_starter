import { useParams } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { socketEvents, question } from "../utils";
import ShowQuiz from "../components/quiz/ShowQuiz";
import Waiting from "../components/quiz/Waiting";
import CorrectAnswer from "../components/quiz/CorrectAnswer";
import LeaderBoard from "../components/quiz/LeaderBoard";

const Room = () => {
  const { id } = useParams();
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(false);
  const [time, setTime] = useState(0);
  const [users, setUsers] = useState([]);
  const [roomStatus, setRoomStatus] = useState("waiting"); // waiting, quiz, leaderboard
  const [quiz, setQuiz] = useState(null);
  const [marks, setMarks] = useState(null);
  const [leaderBoard, setLeaderBoard] = useState(null);
  const onConnect = () => {
    toast.success(`connected`);
    setIsConnected(true);
    socket.emit(socketEvents.JOIN_ROOM_EVENT, id, question);
  };

  const onDisconnect = () => {
    toast.error(`disconnected`);
    setIsConnected(false);
  };

  const onSocketError = (error) => {
    toast.error(error);
  };

  const onUserBroadcast = (users) => {
    setUsers(users);
  };

  const onBeforeQuizStartTimer = (time) => {
    setTime(time);
  };

  const onRoomStatusChange = (status) => {
    setRoomStatus(status);
  };

  const onQuizQuestion = (question) => {
    setQuiz(question);
  };

  const onQuestionTimeChange = (time) => {
    setTime(time);
  };

  const onShowCorrectAnswer = (marks) => {
    setMarks(marks);
  };

  const onShowCorrectAnswerTimeChange = (time) => {
    setTime(time);
  };

  const onLeaderBoard = (leaderBoard) => {
    setLeaderBoard(leaderBoard);
  };

  const onLeaderBoardTimeChange = (time) => {
    setTime(time);
  };

  const onQuizAnswer = (qid, answer) => {
    socket.emit(socketEvents.QUIZ_ANSWER_EVENT, {
      questionId: qid,
      answer,
      room: id,
    });
  };
  useEffect(() => {
    if (!socket) return;
    // Listener for when the socket connects.
    socket.on(socketEvents.CONNECTED_EVENT, onConnect);
    // Listener for when the socket disconnects.
    socket.on(socketEvents.DISCONNECT_EVENT, onDisconnect);

    // Listener for when an error occurs with the socket.
    socket.on(socketEvents.SOCKET_ERROR_EVENT, onSocketError);

    socket.on(socketEvents.USER_BROADCAST_EVENT, onUserBroadcast);

    socket.on(socketEvents.BEORE_QUIZ_START_TIMER, onBeforeQuizStartTimer);

    socket.on(socketEvents.QUIZ_CHANGE_STATUS_EVENT, onRoomStatusChange);

    socket.on(socketEvents.QUIZ_QUESTION_EVENT, onQuizQuestion);

    socket.on(socketEvents.SHOW_QUESTION_TIME, onQuestionTimeChange);

    socket.on(socketEvents.SHOW_CORRECT_ANSWER, onShowCorrectAnswer);

    socket.on(socketEvents.SHOW_LEADERBOARD, onLeaderBoard);
    socket.on(
      socketEvents.SHOW_CORRECT_ANSWER_TIME,
      onShowCorrectAnswerTimeChange,
    );

    socket.on(socketEvents.SHOW_LEADERBOARD_TIME, onLeaderBoardTimeChange);
    // Remove listeners when the component unmounts.
    return () => {
      socket.off(socketEvents.CONNECTED_EVENT, onConnect);
      socket.off(socketEvents.DISCONNECT_EVENT, onDisconnect);
      socket.off(socketEvents.SOCKET_ERROR_EVENT, onSocketError);
      socket.off(socketEvents.USER_BROADCAST_EVENT, onUserBroadcast);
      socket.off(socketEvents.BEORE_QUIZ_START_TIMER, onBeforeQuizStartTimer);
      socket.off(socketEvents.QUIZ_CHANGE_STATUS_EVENT, onRoomStatusChange);
      socket.off(socketEvents.QUIZ_QUESTION_EVENT, onQuizQuestion);
      socket.off(socketEvents.SHOW_QUESTION_TIME, onQuestionTimeChange);
      socket.off(socketEvents.SHOW_CORRECT_ANSWER, onShowCorrectAnswer);
      socket.off(socketEvents.SHOW_LEADERBOARD, onLeaderBoard);
      socket.off(
        socketEvents.SHOW_CORRECT_ANSWER_TIME,
        onShowCorrectAnswerTimeChange,
      );

      socket.off(socketEvents.SHOW_LEADERBOARD_TIME, onLeaderBoardTimeChange);

      // socket.off(socketEvents.TIMER_TICK_EVENT, onTimerTick);
    };
  }, [socket]);

  return (
    <Layout>
      <div className="relative flex h-full w-full flex-col items-center justify-center text-secondary ">
        <div className="text-center">
          <h1>
            Welcome to the room:{" "}
            <span className="font-bold text-primary">{id}</span>
          </h1>
        </div>
        {/* users */}
        <div className="grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.email}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    user.avatar === "default.jpeg"
                      ? "https://i.pravatar.cc/150?img=2"
                      : user.avatar
                  }
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  {/* <p className="truncate text-sm text-gray-500">{user.role}</p> */}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* action buttons */}
        <div className="mt-5  flex space-x-2">
          {roomStatus === "quiz" && (
            <ShowQuiz onAnswer={onQuizAnswer} question={quiz} time={time} />
          )}
          {roomStatus === "waiting" && <Waiting time={time} />}
          {roomStatus === "showAnswer" && (
            <CorrectAnswer marks={marks} time={time} />
          )}
          {roomStatus === "showLeaderboard" && (
            <LeaderBoard leaderBoard={leaderBoard} time={time} />
          )}

          {roomStatus === "finished" && (
            <div className="text-center">
              <h1>Quiz Finished</h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Room;
