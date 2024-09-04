"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import { getLoginUserUsingGet } from "@/api/userController";
import { usePathname } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";
import {setLoginUser} from "@/stores/loginUser";
import "./globals.css";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 全局单次调用的代码都可以写到这里
   */
  const doInitLoginUser = useCallback(async () => {
    if (
      !pathname.startsWith("/user/login") &&
      !pathname.startsWith("/user/register")
    ) {
      const res = await getLoginUserUsingGet();
      if (res.data) {
        // 跟新全局用户状态
        dispatch(setLoginUser(res.data));
      } else {
        // 跳转到登录页
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }
  }, []);
  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
