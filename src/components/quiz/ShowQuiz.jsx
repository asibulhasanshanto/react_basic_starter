import { useState } from "react";
export default function ShowQuiz({ question, time, onAnswer }) {
  const [answer, setAnswer] = useState(null);
  // console.log(question);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(answer);
    onAnswer(question?.question.id, answer);
  };
  return (
    <div className="w-96 bg-gradient-to-r from-green-200 to-green-300 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <button className=" mb-2 mr-2 rounded-full bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {time}s
        </button>
      </div>
      <div className="mx-auto mb-6 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-green-800">
          Q{question?.questionNumber} of {question?.qustionQuantity}
        </h2>
        <p className="mb-6 text-green-800">{question?.question.question}</p>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-col space-y-4">
            {question?.question.options.map((option, index) => (
              <div className="" key={index}>
                <label className="flex items-center">
                  <input
                    className="h-6 w-6 border-gray-300 bg-gray-100 text-green-600 focus:ring-green-500 dark:focus:ring-green-600"
                    name="option"
                    type="radio"
                    value={option?.option}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <span className="ml-2 text-green-800">{option.option}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              disabled={answer === null}
              className="mb-2 mr-2 rounded-full bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 disabled:bg-gray-700 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
