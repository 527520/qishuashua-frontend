"use server";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import React from "react";
import { Flex, message } from "antd";
import Title from "antd/es/typography/Title";
import QuestionTable from "@/components/QuestionTable";

/**
 * 题目列表页面
 *
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 获取url的查询参数
  const { q: searchText } = searchParams;
  let questionList = [];
  let total = 0;
  try {
    const res = await listQuestionVoByPageUsingPost({
      title: searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="questionsPage" className={"max-width-content"}>
      <Flex justify={"space-between"} align={"center"}>
        <Title level={2}>题目大全</Title>
      </Flex>
      <div>
        <QuestionTable
          defaultQuestionList={questionList}
          defaultTotal={total}
          defaultSearchParams={{
            title: searchText,
          }}
        />
      </div>
    </div>
  );
}
