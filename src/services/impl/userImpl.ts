import User from "../../domains/User";
import { IUserService } from "../user.interface";

export class UserServiceImpl implements IUserService {

    connect(user: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    disconnect(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
}