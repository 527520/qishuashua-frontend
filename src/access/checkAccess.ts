import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess = ACCESS_ENUM.NOT_LOGIN,
) => {
  // 获取当前用户具有的权限，如果未登录，则默认没有权限
  const loginUserAccess = loginUser?.userRole || ACCESS_ENUM.NOT_LOGIN;
  // 如果当前不需要任何权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    return loginUserAccess !== ACCESS_ENUM.NOT_LOGIN;
  }
  // 如果需要VIP权限才能访问
  if (needAccess === ACCESS_ENUM.VIP) {
    return (
      loginUserAccess === ACCESS_ENUM.ADMIN ||
      loginUserAccess === ACCESS_ENUM.VIP
    );
  }
  // 如果需要管理员权限才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    return loginUserAccess === ACCESS_ENUM.ADMIN;
  }
  // 如果当前用户具有的权限包含需要的权限，则返回true
  return loginUserAccess.includes(needAccess);
};

export default checkAccess;
