function showOrderItems(items) {
  if (items < 10) {
    return `0${items}`;
  } else {
    return items;
  }
  /* (
        {(orders.totalItem < 10
          ? `0${orders.totalItem}`
          : orders.totalItem) || 0}
        ) */
}
export default showOrderItems;
