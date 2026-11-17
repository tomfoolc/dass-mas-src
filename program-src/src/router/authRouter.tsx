import { checkAccessPermission, goToPage } from "@/dass/common/DASSUtils";
import Constant from "@/constant/Constant";
import { IUserRole } from "@/interface";
import ErrorPage from "@/dass/common/ErrorPage";

interface Props {
  key: string;
  children: any;
  auth: boolean;
  isAuthenticated: boolean;
  pagePermission: IUserRole;
  userPermission: IUserRole;
}

export const AuthRoute = (props: Props) => {

  if (props.auth) {
    if (props.isAuthenticated) {
      let isAllowed = checkAccessPermission(props.pagePermission, props.userPermission);
      if (isAllowed) {
        return props.children;
      } else {
        goToPage("/error");
        return <ErrorPage />;
      }
    } else {
      goToPage(Constant.LOGINPAGE);
      return null;
    }
  } else {
    return props.children;
  }

}

export default AuthRoute;