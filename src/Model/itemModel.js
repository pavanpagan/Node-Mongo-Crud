
class Item {
  static validateItem(item) {
    if (!item.item_name || typeof item.item_name !== 'string') {
      return 'Invalid item name. Item name must be a non-empty string.';
    }

    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 0) {
      return 'Invalid quantity. Quantity must be a non-negative number.';
    }

    if (!item.price || typeof item.price !== 'number' || item.price < 0) {
      return 'Invalid price. Price must be a non-negative number.';
    }
    return null;
  }

}

module.exports = Item;
