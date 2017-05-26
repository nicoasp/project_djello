export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';


export function requestStart() {
  return {
    type: REQUEST_START
  };
}

export function requestSuccess(data) {
  return {
    type: REQUEST_SUCCESS,
    data
  };
}

export function requestFailure(error) {
  return {
    type: REQUEST_FAILURE,
    error
  };
}

export function getBoards() {
  return (dispatch) => {
    dispatch(requestStart());

    fetch(`api/boards?sessionId=${localStorage.getItem("sessionId")}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(results => {
        dispatch(requestSuccess(results));
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailure(error));
      });
  }
}