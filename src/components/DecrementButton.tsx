import { useDispatch } from "react-redux";
import { decrement } from "../store/counterReducer";

function DecrementButton() {
  const dispatch = useDispatch();

  return (
    <button aria-label="Increment value" onClick={() => dispatch(decrement())}>
      -
    </button>
  );
}

export default DecrementButton;
