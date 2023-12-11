import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative flex h-full w-full items-center justify-center text-secondary ">
        <div className="text-center">
          <h1>Join Quiz</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (roomId !== "") {
                navigate(`/rooms/${roomId}`);
              } else {
                toast.error("Please enter a valid room ID");
              }
            }}
            className="p-4"
          >
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="rounded-l-lg border-2 border-primary "
            />
            {/* join button */}
            <button
              type="submit"
              className="rounded-r-lg bg-primary p-2.5 text-white "
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
