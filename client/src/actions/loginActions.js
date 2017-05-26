// CURRENTLY NOT USED

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_STATE = 'LOGOUT_STATE';

export function loginStart() {
  return {
    type: LOGIN_START
  };
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function logoutState() {
  return {
    type: LOGOUT_STATE
  };
}

export function requestLogin(email, password) {
  return (dispatch) => {
    dispatch(loginStart());

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `email=${email}&password=${password}`
    const options = {
      headers,
      method: 'POST',
      body,
    }

    fetch('api/login', options)
      .then(response => {
      	console.log(response);
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(loginObj => {
        let data = {
          user: {},
          error: ""
        }        
      	if (loginObj.success) {
          localStorage.setItem("sessionId", loginObj.sessionId);
          data.user = loginObj.user;
      	} else {
          data.error = loginObj.error;
        }
        dispatch(loginSuccess(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(loginFailure(error));
      });
  }
}

export function logInFromSession() {
  return (dispatch) => {
    dispatch(loginStart());

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `sessionId=${localStorage.getItem("sessionId")}`
    const options = {
      headers,
      method: 'POST',
      body,
    }

    fetch('api/login', options)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(loginObj => {
        let data = {
          user: {},
          error: ""
        }        
        if (loginObj.success) {
          localStorage.setItem("sessionId", loginObj.sessionId);
          data.user = loginObj.user;
        } else {
          data.error = loginObj.error;
        }
        dispatch(loginSuccess(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(loginFailure(error));
      });
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.setItem("sessionId", "");
    dispatch(logoutState());
  }
}

