"use client";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import { TablePaginationConfig } from "antd";
import Link from "next/link";

interface Props {
  defaultQuestionList: API.QuestionVO[];
  defaultTotal: number;
  // 默认查询参数
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const actionRef = useRef<ActionType>();
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  // 总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // 用于判断是否首次加载
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      copyable: true,
      width: 380,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList || []} />;
      },
    },
    {
      title: "可见状态",
      dataIndex: "visibleStatus",
      width: 110,
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
      title: "浏览量",
      dataIndex: "viewNum",
      valueType: "text",
      hideInSearch: true,
      hideInForm: true,
      sorter: true,
      width: 100,
    },
    {
      title: "点赞数",
      dataIndex: "thumbNum",
      valueType: "text",
      hideInForm: true,
      hideInSearch: true,
      sorter: true,
      width: 100,
    },
    {
      title: "收藏数",
      dataIndex: "favourNum",
      valueType: "text",
      hideInForm: true,
      hideInSearch: true,
      sorter: true,
      width: 100,
    },
  ];
  return (
    <div className={"question-table"}>
      <ProTable<API.Question>
        actionRef={actionRef}
        size={"large"}
        scroll={{ x: 1020 }}
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `共 ${total} 道题`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 首次加载
          if (isFirstLoad) {
            setIsFirstLoad(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "desc";

          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;

          setQuestionList(newData);
          setTotal(Number(newTotal));

          return {
            success: code === 0,
            data: newData,
            total: Number(newTotal) || 0,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
