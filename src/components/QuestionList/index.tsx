"use client";
import "./index.css";
import { Avatar, Card, List, Typography } from "antd";
import Link from "next/link";
import TagList from "@/components/TagList";

interface Props {
  questionBanId?: number;
  questionList: string[];
  cardTitle?: string;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList = [], cardTitle, questionBanId } = props;

  return (
    <Card className="question-list" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList} />}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBanId
                      ? `/bank/${questionBanId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
