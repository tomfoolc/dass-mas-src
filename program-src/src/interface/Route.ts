import { IUserRole } from "./UserConfig";

export interface IRoute {
    path : string,
    element: React.JSX.Element;
    auth: boolean;
    permission: IUserRole
}
