const notificaitonReducer = (state=null, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.message
  default:
    return state
  }
}

export const notify = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        message: null
      })
    }, duration*1000)
  }
}


export default notificaitonReducer
