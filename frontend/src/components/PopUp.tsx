const PopUp = ({ correct }: { correct: boolean }) => {
  return (
    <div className="absolute flex justify-center align-middle">
      <img
        src={
          correct
            ? "../../assets/icons/tick-icon.svg"
            : "../../assets/icons/wrong-icon.svg"
        }
        alt="popup-feedback-icon"
      />
    </div>
  );
};

export default PopUp;
