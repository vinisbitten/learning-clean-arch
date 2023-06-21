import OrderItem from "./order-item";
import OrderInterface from "./order.interface";

export default class Order implements OrderInterface {
  private _id: string;
  private _customer: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customer: string, items: OrderItem[]) {
    this._id = id;
    this._customer = customer;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length == 0) {
      throw new Error("Id is required");
    }
    if (this._customer.length == 0) {
      throw new Error("Customer is required");
    }
    if (this._items.length == 0) {
      throw new Error("Must have 1 or more items");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }

  total(): number {
    return this._items.reduce(
      (total, item) => total + item.orderItemTotal(),
      0
    );
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customer;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set id(id: string) {
    this._id = id;
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
    this._total = this.total();
    this.validate();
  }

  removeItem(id: string): void {
    this._items = this._items.filter((item) => item.id !== id);
    this._total = this.total();
    this.validate();
  }

  changeItemQuantity(id: string, quantity: number): void {
    let item = this._items.find((item) => item.id === id);
    if (item) {
      item.changeQuantity(quantity);
      this._total = this.total();
      this.validate();
    }
  }
}
