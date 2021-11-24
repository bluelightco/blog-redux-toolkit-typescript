import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import IncrementButton from "./components/IncrementButton";
import DecrementButton from "./components/DecrementButton";
import IncrementAmountInput from "./components/IncrementAmountInput";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="counter-container">
      <h1> Counter </h1>
      <div>
        <DecrementButton />
        <p>{count}</p>
        <IncrementButton />
      </div>
      <span >Change Increment Amount</span>
      <IncrementAmountInput />
    </div>
  );
}

export default App;
