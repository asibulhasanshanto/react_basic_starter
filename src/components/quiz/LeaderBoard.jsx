const LeaderBoard = () => {
  return (
    <div className="w-full">
      <h3>Leaderboard</h3>

      <div className="mt-4 flex flex-col">
        <div className="">
          {/* serial --- name --- marks */}
          <div className="flex flex-row justify-between">
            <span>1</span>
            <span>John doe</span>
            <span>10</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>2</span>
            <span>John doe</span>
            <span>10</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>3</span>
            <span>John doe</span>
            <span>10</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>4</span>
            <span>John doe</span>
            <span>10</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>5</span>
            <span>John doe</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
