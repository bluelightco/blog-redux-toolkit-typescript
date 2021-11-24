import { useDispatch } from "react-redux";
import { increment } from "../store/counterReducer";

function IncrementButton() {
  const dispatch = useDispatch();

  return (
    <button aria-label="Increment value" onClick={() => dispatch(increment())}>
      +
    </button>
  );
}

export default IncrementButton;
