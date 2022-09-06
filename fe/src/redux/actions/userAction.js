import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants'
import axios from 'axios'

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/auth/login',
      { username, password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  await axios.delete('/api/auth/logout', config)

  dispatch({ type: USER_LOGOUT })
}

export const me = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/auth/me')
  } catch (error) {}
}
