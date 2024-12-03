function showOrderItems(items) {
  if (items < 10) {
    return `0${items}`;
  } else if (items === 0 || !items) {
    return `00`;
  } else {
    return items;
  }
}
export default showOrderItems;
