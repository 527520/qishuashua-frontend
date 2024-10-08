import { addUserUsingPost } from "@/api/userController";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React, { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface Props {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onSubmit: (values: API.UserAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserAddRequest) => {
  const hide = message.loading("正在添加");
  try {
    await addUserUsingPost(fields);
    hide();
    message.success("创建成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("创建失败，" + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  return (
    <Modal
      destroyOnClose
      title={"创建"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns.map((column) => {
          if (column.dataIndex === "userAvatar") {
            return {
              ...column,
              renderFormItem: () => (
                <ImageUpload onUploadSuccess={setAvatarUrl} biz="user_avatar" />
              ),
            };
          }
          return column;
        })}
        onSubmit={async (values: API.UserAddRequest) => {
          const success = await handleAdd({
            ...values,
            userAvatar: avatarUrl,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
