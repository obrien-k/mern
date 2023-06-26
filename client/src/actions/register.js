import uuid from 'uuid';
import { setAlert } from './alert';
import { REGISTER_USER } from './types';

export const registerUser = (username, email, password, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: REGISTER_USER,
    payload: { username, email, password }
  });

  dispatch(setAlert('User registered successfully', 'success'));
};
