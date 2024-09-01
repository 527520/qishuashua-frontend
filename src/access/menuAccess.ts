import {menus} from "../../config/menu";
import checkAccess from "@/access/checkAccess";

/**
 * 获取有权限、可访问的菜单(递归)
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (loginUser: API.LoginUserVO, menuItems = menus) => {
    return menuItems.filter(menu => {
        if(!checkAccess(loginUser, menu.access)) {
            return false;
        }
        if(menu.children) {
            menu.children = getAccessibleMenus(loginUser, menu.children);
        }
        return true;
    });
}
export default getAccessibleMenus;