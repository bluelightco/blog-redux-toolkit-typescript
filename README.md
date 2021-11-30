# Redux Toolkit with Typescript

If you're a React developer and you've ever had to work with global/shared states you know how complicated this can be.

Today there are two main ways to use this concept: Redux and Context API. Both approaches have a prior understanding curve to be able to use them in the best way.

And whenever Redux is talked about, its high complexity and verbosity is always raised when developing, even greater when it comes to working with typescript.

But today I will discuss the Redux Toolkit tool, which is an official Redux library that makes it easy to not only configure but use all the resources offered by Redux.
If you've ever found Redux to be boring and difficult, I'm sure the explanations and examples I'll show you will rethink the subject.

Explained that, now I'll show you how to implement Redux Toolkit with TypeScript in React.


# Table of Contents 

* Why Redux Toolkit?
* Getting started
* Implement within an existing project
* Creating a new project
* Conclusion


# Why Redux Toolkit?

The Redux Toolkit makes it easy to write good Redux applications and speeds up development by following our best practices, providing good default behaviors, detecting errors, and allowing you to write simpler code. The Redux Toolkit is beneficial to all Redux users, regardless of skill level or experience, whether you are a new Redux user setting up your first project, or an experienced user who wants to simplify an existing application

# Getting started

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

> configureStore: Function that provides simplified configuration options to combine all your reducers or add any middleware.

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
In this function, you will need to set three properties: name, 
, and reducers.

 * **name** : Used in action types (String)
 * **initialState** : Initial state for the respective reducer (any)
 * **reducers** : An object of reducer functions. Key names will be used to generate actions.(Object<string, function>)

Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based on those changes.

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

* src

  * app

    * hooks.ts

    * store.ts

  * features

    * counter

      * counter.module.css

      * counter.tsx

      * counterAPI.ts

      * counterSlice.spec.ts

      * counterSlice.ts


* **app/hooks.ts**: While you can import RootState and AppDispatch types for each component, it's better to create typed versions of the “useDispatch” and “useSelector” hooks for use in your application. This allows you to import them into any component files that need to use the hooks and avoids potential circular import dependency issues.

* **app/store.ts**: To use the "configureStore" function no extra typing is required. However, you will want to use RootState and Dispatch typing inside files that will need this reference. These definitions are created and exported within the store.ts file.

* **features/counter/counter.module.css**: Simply the file of the stylizations of the component created.

* **features/counter/counter.tsx**:  Main component file, where dispatch functions triggers and global state values ​​are used. In addition to all Html structures being present inside it.

* **counterAPI.ts**: Inside is a dummy function to mimic an asynchronous data request.

* **counterSlice.spec.ts**: File where tests are created for the main features of the component.

* **counterSlice.ts**: The location where reducers and actions are defined and all the logic to manage the global state and control so that data consistency is always maintained



# Conclusion

Redux Toolkit is an excellent tool to give productivity to applications that use redux and together with Typescript your applications will be reliable and easy to maintain.
As much as everything can be built only with redux, the complexity and verbosity make the development slower and with a greater understanding curve

<hr />

 * **Redux** :  Redux is an open-source JavaScript library for managing and centralizing the application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to (and inspired by) Facebook's Flux architecture. [Redux](https://redux.js.org/)

* **Redux Toolkit** :  Redux Toolkit is the official Redux toolkit, opinionated, with batteries for efficient Redux development. This is intended to be the standard way of writing Redux logic, and it is highly recommended that you use it. It includes several utility functions that simplify the most common use cases of Redux, including store configuration, setting dimmers, immutable update logic, and even creating entire "slices" of state at once without writing any action creators or type of action manually. It also includes the most used Redux add-ons, such as Redux Thunk for asynchronous logic and Reselect for writing selector functions, so you can use them right away. [Redux Toolkit](https://redux-toolkit.js.org/)

* **Typescript** : TypeScript is an open-source programming language developed by Microsoft. It is a strict syntactic superset of JavaScript and adds optional static typing to the language. Types provide a way to describe the shape of an object, providing better documentation and allowing TypeScript to validate that your code is working correctly. Since TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs. [Typescript](https://www.typescriptlang.org/)
