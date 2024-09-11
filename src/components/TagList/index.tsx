import "./index.css";
import { Tag } from "antd";

interface Props {
  tagList?: string[];
}

const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tag-list">
      {tagList.map((tag) => {
        if (tag === "VIP") {
          return (
            <Tag color="#f50" key={tag}>
              {tag}
            </Tag>
          );
        }
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;
