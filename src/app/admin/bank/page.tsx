"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  deleteQuestionBankUsingPost,
  listQuestionBankByPageUsingPost,
} from "@/api/questionBankController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import React, { useRef, useState } from "react";

/**
 * 题库管理页面
 *
 * @constructor
 */
const QuestionBankAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前题库点击的数据
  const [currentRow, setCurrentRow] = useState<API.QuestionBank>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.QuestionBank) => {
    const hide = message.loading("正在删除");
    if (!row) return true;
    try {
      await deleteQuestionBankUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("删除成功");
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionBank>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
      copyable: true,
      width: 200,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      copyable: true,
      width: 200,
    },
    {
      title: "描述",
      dataIndex: "description",
      valueType: "textarea",
      ellipsis: true,
      width: 200,
    },
    {
      title: "用户id",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
      copyable: true,
      width: 200,
    },
    {
      title: "图片",
      dataIndex: "picture",
      valueType: "image",
      width: 100,
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "reviewStatus",
      width: 80,
      valueEnum: {
        0: {
          text: "待审核",
        },
        1: {
          text: "通过",
        },
        2: {
          text: "拒绝",
        },
        99: {
          text: "无需审核",
        },
      },
    },
    {
      title: "可见状态",
      dataIndex: "visibleStatus",
      width: 100,
      valueEnum: {
        0: {
          text: "所有人可见",
        },
        1: {
          text: "仅本人可见",
        },
      },
    },
    {
      title: "审核信息",
      dataIndex: "reviewMessage",
      valueType: "text",
      width: 140,
    },
    {
      title: "审核人id",
      dataIndex: "reviewerId",
      valueType: "text",
      hideInForm: true,
      copyable: true,
      width: 200,
    },
    {
      title: "审核时间",
      sorter: true,
      dataIndex: "reviewTime",
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true,
      width: 150,
    },
    {
      title: "优先级",
      dataIndex: "priority",
      valueType: "text",
      hideInSearch: true,
      sorter: true,
      width: 80,
    },
    {
      title: "浏览量",
      dataIndex: "viewNum",
      valueType: "text",
      hideInForm: true,
      hideInSearch: true,
      sorter: true,
      width: 100,
    },
    {
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
      width: 150,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="确认删除？"
            description="你确定要删除这条记录吗?"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.QuestionBank>
        headerTitle={"题库信息"}
        actionRef={actionRef}
        rowKey="key"
        scroll={{ x: 2400 }}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listQuestionBankByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionBankQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default QuestionBankAdminPage;
