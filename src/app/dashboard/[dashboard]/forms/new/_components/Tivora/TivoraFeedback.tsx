import React, { useRef, useState } from "react";

function TivoraFeedback({
  hide,
  setFeedbackvalue,
}: {
  hide: () => void;
  setFeedbackvalue: (number: number) => void;
}) {
  const Box = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);

  function handleOutterClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (Box.current === e.target) {
      hide();
    }
  }

  const feedbackOptions = [
    { emoji: "😠", value: 1 },
    { emoji: "🙁", value: 2 },
    { emoji: "🙂", value: 3 },
    { emoji: "😁", value: 4 },
    { emoji: "😍", value: 5 },
  ];

  function handleFeedback(value: number) {
    setFeedbackvalue(value);
    setShowThankYou(true);
    setTimeout(() => {
      hide();
    }, 2000);
  }

  return (
    <div
      className="fixed inset-0 z-5000 flex items-center justify-center backdrop-blur-sm px-4"
      onClick={handleOutterClick}
      ref={Box}
    >
      <div className="relative bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl p-8 pt-10 w-full max-w-md border border-light-fg/10 dark:border-dark-fg/10">
        {!showThankYou ? (
          <>
            <h2 className="text-center text-xl font-semibold mb-6">
              Give us Feedback for Tivora AI
            </h2>
            <div className="flex justify-center gap-4">
              {feedbackOptions.map((option, index) => (
                <button
                  key={index}
                  className="text-3xl transition transform hover:scale-125 active:scale-90 duration-300 animate-emoji-pop cursor-pointer"
                  onClick={() => handleFeedback(option.value)}
                >
                  {option.emoji}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
            <div className="text-5xl animate-ping-once">💖</div>
            <p className="text-lg font-semibold text-center">
              Thank you for your feedback!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TivoraFeedback;
