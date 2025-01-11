"use client";
import "./index.css";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionCard from "@/components/QuestionCard";
import {useEffect, useState} from "react";

/**
 * 题目详情页
 * @constructor
 */
export default function QuestionPage({ params }) {
  const { questionId } = params;
  // 获取题目详情
  let [question, setQuestion] = useState<API.QuestionVO>();

  const fetchDataList = async () => {
    try {
      const res = await getQuestionVoByIdUsingGet({
        id: questionId,
      });
      setQuestion(res.data);
    } catch (e) {
      console.error("获取题目详情失败，" + e.message);
    }
  };

  // 保证只会调用一次
  useEffect(() => {
    fetchDataList();
  }, []);

  // 错误处理
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }

  return (
    <div id="questionPage">
      <QuestionCard question={question} />
    </div>
  );
}
