const PopUp = ({ isCorrect }: { isCorrect: boolean }) => {
  return (
    <div className="absolute flex justify-center items-center justify-self-center align-middle h-full w-full">
      <img
        src={
          isCorrect ? "../../icons/tick-icon.svg" : "../../icons/wrong-icon.svg"
        }
        alt="popup-feedback-icon"
      />
    </div>
  );
};

export default PopUp;
