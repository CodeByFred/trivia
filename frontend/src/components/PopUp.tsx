const PopUp = ({ isCorrect }: { isCorrect: boolean }) => {
  return (
    <div className="absolute flex justify-center items-center justify-self-center align-middle h-full w-full">
      <img
        src={
          isCorrect
            ? "../../assets/icons/tick-icon.svg"
            : "../../assets/icons/wrong-icon.svg"
        }
        alt="popup-feedback-icon"
      />
    </div>
  );
};

export default PopUp;
