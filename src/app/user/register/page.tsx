"use client";
import {
  LockOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { ProFormDigit } from "@ant-design/pro-form";

/**
 * 用户登录页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  /**
   * 提交
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        // 注册成功
        message.success("注册成功");
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      message.error("注册失败，" + e.message);
    }
  };
  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        title="奇刷刷 - 用户注册"
        subTitle="程序员面试刷题平台"
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
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
        <ProFormText
          name="userName"
          allowClear
          fieldProps={{
            size: "large",
            prefix: <UserAddOutlined />,
          }}
          placeholder={"请输入姓名"}
          rules={[
            {
              required: true,
              message: "请输入姓名!",
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
        <ProFormText.Password
          name="checkPassword"
          allowClear
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请确认密码"}
          rules={[
            {
              required: true,
              message: "请确认密码！",
            },
          ]}
        />
        <ProFormDigit
          name="phoneNumber"
          allowClear
          fieldProps={{
            size: "large",
            prefix: <PhoneOutlined />,
          }}
          placeholder={"请输入手机号"}
          rules={[
            {
              required: true,
              message: "请确认手机号！",
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
            已有账号？
            <Link href={"/user/login"}>去登录</Link>
          </div>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;
