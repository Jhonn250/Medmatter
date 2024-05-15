import React, { useReducer } from "react";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { GET_USERS } from './types.js'
import { getData } from "../../util/other/SaveObject";

const UserState = (props) => {
  const initialState = {
    users: [],
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUsers = async () => {
    try {
      const res = await getData();
      dispatch({ type: 'GET_USER', payload: res })
    } catch (error) {
      console.log('error');
    }
  };




  return (
    <UserContext.Provider
      value={{
        users: state.users,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;

