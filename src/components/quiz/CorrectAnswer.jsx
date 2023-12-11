
const CorrectAnswer = () => {
  return (
    <div className="w-full text-center">
      <h3>Correct Answers</h3>
      <div className="mt-4 flex flex-col">
        <div className="flex flex-row justify-between">
          <span className="p-4 text-xl font-bold">1. A 10%</span>
          <span className="p-4 text-xl font-bold text-primary">2. B 20%</span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="p-4 text-xl font-bold">3. C 50%</span>
          <span className="p-4 text-xl font-bold">4. D 20%</span>
        </div>
      </div>
    </div>
  );
};

export default CorrectAnswer;
