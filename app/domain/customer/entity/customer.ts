import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity implements CustomerInterface {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    if (this._name.length == 0) {
      this.notification.addError({
        context: "customer",
        message: "name is required",
      });
    }
    if (this._id.length == 0) {
      this.notification.addError({
        context: "customer",
        message: "id is required",
      });
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    this._address = address;
    this.validate();
  }

  activate(): void {
    if (this._address == undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  set address(address: Address) {
    this._address = address;
  }

  get address(): Address {
    return this._address;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}
