"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/stores";
import "./globals.css";
import { getLoginUserUsingGet } from "@/api/userController";
import { usePathname } from "next/navigation";
import AccessLayout from "@/access/AccessLayout";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => {
  const pathname = usePathname();

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
      } else {
        // 跳转到登录页
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
