import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changeIncrementAmount } from "../store/counterReducer";

function IncrementAmountInput() {
  const dispatch = useDispatch();
  const incrementAmount = useSelector(
    (state: RootState) => state.counter.incrementAmount
  );

  function handleChange(incrementAmountValue: string) {
    dispatch(changeIncrementAmount(Number(incrementAmountValue)));
  }

  return (
    <input
      type="number"
      value={incrementAmount}
      min={1}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

export default IncrementAmountInput;
