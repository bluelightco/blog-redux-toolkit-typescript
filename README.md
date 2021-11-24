# Redux Toolkit with Typescript

 * **Redux** :  is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native). [Redux](https://redux.js.org/)

* **Redux Toolkit** : is a package is intended to be the standard way to write Redux logic. [Redux Toolkit](https://redux-toolkit.js.org/)

* **Typescript** : is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. [Typescript](https://www.typescriptlang.org/)

<hr />

Explained that, now I'll show you how to implement Redux Toolkit with TypeScript in React.


Two situations will be discussed:

> Implement within an existing project

And 

> Creating a new project

# Implement within an existing project

Add dependencies to your project

` npm install @reduxjs/toolkit react-redux `

Or

` yarn  add @reduxjs/toolkit react-redux `


After the dependencies are installed, create a file for your Redux Store. Ex: src/store/index.ts

Within this file, you must use the “configureStore” function of ReduxToolkit to create your store and later export it.

```
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: { },
})

export type RootState = ReturnType<typeof store.getState>
```

Provide the Redux Store to React


```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
); 
```



To create your reducers, use the Redux Toolkit's createSlice function.
In this function, you will need to set three properties: name, initialState, and reducers.

 * **name** : Used in action types (String)
 * **initialState** : Initial state for the respective reducer (any)
 * **reducers** : An object of reducer functions. Key names will be used to generate actions.(Object<string, function>)

```
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  incrementAmount: number
}

const initialState: CounterState = {
  value: 0,
  incrementAmount : 1
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.incrementAmount
    },
    decrement: (state) => {
      state.value -= state.incrementAmount
    },
    changeIncrementAmount: (state, action: PayloadAction<number>) => {
      state.incrementAmount = action.payload
    },
  },
})

export const { increment, decrement, changeIncrementAmount } = counterSlice.actions

export default counterSlice.reducer
```

After creating the reducer add it to the store

```
import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './counterReducer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

After that you can use the redux state and Actions inside your components.
To read the data use the "useSelector" function, and for dispatch actions use the "useDispatch" function.

```
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { increment, decrement, changeIncrementAmount, } from "./store/counterReducer";

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const incrementAmount = useSelector(
    (state: RootState) => state.counter.incrementAmount
  );

  function handleChange(incrementAmountValue: string) {
    dispatch(changeIncrementAmount(Number(incrementAmountValue)));
  }

  return (
    <div className="counter-container">
      <h1> Counter </h1>
      <div>
        <button aria-label="Decrement" onClick={() => dispatch(decrement())}>
          -
        </button>
        <p>{count}</p>
        <button aria-label="Increment" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <span >Change Increment Amount</span>
      <input type="number" value={incrementAmount} min={1} onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default App;
```

# Creating a new project

Creating a new project with Redux Toolkit is very simple, you will just use the following command:

` npx create-react-app APPLICATION_NAME --template redux-typescript `

Behind the scenes the CRA will be used to create your React application, in the end, you will have a similar structure to this :


# Conclusion

Redux Toolkit is an excellent tool to give productivity to applications that use redux and together with Typescript your applications will be reliable and easy to maintain.
As much as everything can be built only with redux, the complexity and verbosity make the development slower and with a greater understanding curve
