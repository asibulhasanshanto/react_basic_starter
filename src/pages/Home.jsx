import Layout from "../components/layouts/Layout";
const Home = () => {
  return (
    <Layout>
      <div className="relative flex h-full w-full items-center justify-center text-secondary ">
        <div className="text-center">
          <h1>Join Room</h1>
          <div className="p-4">
            <input
              type="text"
              placeholder="Enter Room ID"
              className="rounded-l-lg border-2 border-primary "
            />
            {/* join button */}
            <button className="bg-primary text-white rounded-r-lg p-2.5 ">
              Join
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
