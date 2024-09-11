"use server";
import Title from "antd/es/typography/Title";
import { Flex, message } from "antd";
import "./index.css";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {
  let questionBankList = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 200,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    message.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="banksPage" className={"max-width-content"}>
      <Flex justify={"space-between"} align={"center"}>
        <Title level={2}>题库大全</Title>
      </Flex>
      <div>
        <QuestionBankList questionBankList={questionBankList} />
      </div>
    </div>
  );
}
