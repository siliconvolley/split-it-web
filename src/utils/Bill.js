export default class Bill {
  constructor() {
    this.totalAmount = 0;
    this.members = {};
    this.items = {};
    this.itemShares = {};
  }

  addItem(item, price, quantity = 1) {
    this.items[item] = { price, quantity };
    this.totalAmount += price * quantity; // Add to the total price considering quantity
  }

  addMembers(members) {
    members.forEach(member => {
      this.members[member] = true;
    });
  }

  addMembersToItem(item, members) {
    if (this.itemShares[item]) {
      this.itemShares[item].push(...members); // Append members sharing the item
    } else {
      this.itemShares[item] = [...members]; // Initialize the itemShares array if it doesn't exist
    }
  }

  findIndividualShares() {
    const shares = {};

    Object.keys(this.members).forEach(member => {
      shares[member] = {
        total: 0,
        items: [],
      };
    });

    Object.keys(this.itemShares).forEach(item => {
      const { price, quantity } = this.items[item];
      const totalItemCost = price * quantity;
      const membersSharingItem = this.itemShares[item];
      const sharePerMember = totalItemCost / membersSharingItem.length;

      membersSharingItem.forEach(member => {
        shares[member].total += sharePerMember;
        shares[member].items.push({ item, shareAmount: sharePerMember });
      });
    });

    return shares;
  }
}