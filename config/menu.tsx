import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_ENUM from "@/access/accessEnum";

export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "http://qioj.com.cn",
    name: "奇OJ",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/bank",
        name: "题库管理",
        access: ACCESS_ENUM.ADMIN,
      },
    ],
  },
] as MenuDataItem[];

// 根据全部路径查找所有菜单
export const findAllMenusByPath = (path: string): MenuDataItem | null => {
  return findMenuByPath(menus, path);
}

// 根据路径查找菜单
export const findMenuByPath = (menus: MenuDataItem[], path:string): MenuDataItem | null => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const childMenu = findMenuByPath(menu.children, path);
      if (childMenu) {
        return childMenu;
      }
    }
  }
  return null;
}