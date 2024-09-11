"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import Link from "next/link";
import "./index.css";
import { Metadata } from "next";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";

export const metadata = async (): Promise<Metadata> => {
  return {
    title: "奇刷刷-程序员面试刷题平台",
    description: "奇刷刷，qishuashua，面试刷题平台，刷题就来奇刷刷",
  };
};

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  let questionBankList = [];
  let questionList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    message.error("获取题库列表失败，" + e.message);
  }
  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
  } catch (e) {
    // message.error("获取题目列表失败，" + e.message);
    console.error("获取题目列表失败，" + e.message);
  }

  return (
    <div id="homePage" className={"max-width-content"}>
      <Flex justify={"space-between"} align={"center"}>
        <Title level={2}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <div>
        <QuestionBankList questionBankList={questionBankList} />
      </div>
      <Divider />
      <Flex justify={"space-between"} align={"center"}>
        <Title level={2}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <div>
        <QuestionList questionList={questionList} />
      </div>
    </div>
  );
}
