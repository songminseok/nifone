export default (item, action, data) => {
  return {
    type: action,
    data: item,
    payload: {
      [item]: data
    }
  }
}
