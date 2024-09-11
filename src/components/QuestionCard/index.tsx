"use client";
import "./index.css";
import { Avatar, Card, List, Typography } from "antd";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";

interface Props {
  question?: API.QuestionVO;
}

/**
 * 题目卡片组件
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;

  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question?.title}
        </Title>
        <TagList tagList={question?.tagList} />
        <div style={{ marginBottom: 16 }}></div>
        <MdViewer value={question?.content} />
      </Card>
      <Card title={"推荐答案"}>
        <MdViewer value={question?.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
