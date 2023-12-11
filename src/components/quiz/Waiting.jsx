
const Waiting = ({ time }) => {
  return (
    <div className="w-full">
      <h3 className="font-bold">Waiting for the quiz to be started</h3>

      <span className="flex w-full items-center justify-center text-center text-8xl font-bold">
        {time}
      </span>
    </div>
  );
};

export default Waiting;
