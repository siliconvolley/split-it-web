
class Bill():
    def __init__(self, title: str, date_created: str):
        self.title = title
        self.date_created = date_created
        self.total_amount = 0
        self.items = {}                                                 # ? Item name : Item Price
        self.members = {}                                               # ? Member name : Member's Share
        self.item_shares = {}                                               # ? Item name : Member sharing

        self.name = self.title + "_" + self.date_created

    def add_members(self, member: str):
        self.members[member] = 0                                        # ? Initially each member's share will be 0

    def add_items(self, name: str, price: int):
        self.items[name] = price                                        # ? Adding the item to the items list along with its price
        self.item_shares[name] = []                                     # ? Adding the item to the item_shares list and initializing its corresponding member list as [] 
        self.total_amount += price                                      # ? Adding to the total price as we add the item to the bill

    def add_members_to_item(self, item: str, members: list):
        for member in members:
            if item in self.item_shares:
                self.item_shares[item].append(member)                   # ? If the item is present in the item_shares list then append the member who is sharing the item
    
    def member_item_count(self):
        for item in self.item_shares:
            print(f"{item} : {len(self.item_shares[item])}")            # ? Displaying the number of members sharing that item

    def find_individual_shares(self):
        for member in self.members:
            self.item_serial_number = 1                                 # ? Initializing the item serial number from 1
            print(f"\n{member}: \n")                                    # ? Printing names of each member
            for item in self.item_shares:                   
                if member in self.item_shares[item]: 
                    share_amount = self.items[item] / len(self.item_shares[item])             # ? If the member is present in the list of members for that key item
                    print(f"{self.item_serial_number}) {item} : {share_amount}")              # ? Calculating the item's share amount for that item
                    self.members[member] += share_amount                                      # ? Adding the share amount to the member's share amount
                    self.item_serial_number += 1                        # ? Incrementing the item serial number
            print("-------------------------------------")
            print(f"TOTAL : {self.members[member]}")                    # ? Displaying the total share of the member

