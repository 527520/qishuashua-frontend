"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { useRouter } from "next/navigation";

/**
 * 用户登录页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect") ?? "/";
  /**
   * 提交
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        // 登录成功
        message.success("登录成功");
        dispatch(setLoginUser(res.data));
        router.replace(redirect);
        form.resetFields();
      }
    } catch (e) {
      message.error("登录失败，" + e.message);
    }
  };
  return (
    <div id="userLoginPage">
      <LoginForm
        form={form}
        title="奇刷刷 - 用户登录"
        subTitle="程序员面试刷题平台"
        onFinish={doSubmit}
      >
        <ProFormText
          name="userAccount"
          allowClear
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          allowClear
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <div
            style={{
              float: "right",
              marginBottom: 16,
            }}
          >
            还没有账号？
            <Link href={"/user/register"}>去注册</Link>
          </div>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
