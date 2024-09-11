"use server";
import { Avatar, Button, Card, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import "./index.css";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";
import { getQuestionBankVoByIdUsingPost } from "@/api/questionBankController";

/**
 * 题库详情页
 * @constructor
 */
export default async function bankPage({ params }) {
  const { questionBankId } = params;
  let bank = undefined;
  const requestForm = {
    id: questionBankId,
    needQueryQuestionList: true,
    pageSize: 200,
  } as API.QuestionBankQueryRequest;

  try {
    const res = await getQuestionBankVoByIdUsingPost(requestForm);
    bank = res.data;
  } catch (e) {
    console.error("获取题库列表失败，" + e.message);
  }
  // 错误处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  // 获取第一道题目
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage?.records?.[0].id;
  }

  return (
    <div id="bankPage" className={"max-width-content"}>
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type={"secondary"}>{bank.description}</Paragraph>
              <Button
                type="primary"
                shape={"round"}
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target={"_blank"}
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <QuestionList
        questionBankId={bank.id}
        questionList={bank.questionPage?.records ?? ([] as any[])}
        cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
      />
    </div>
  );
}
