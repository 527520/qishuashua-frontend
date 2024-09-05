import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadFile, Image } from "antd";
import { uploadFileUsingPost } from "@/api/fileController";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  biz: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, biz }) => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 新增状态来存储上传后的图片 URL
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadFileUsingPost({ biz: biz }, {}, file as any);
      const uploadedUrl = res.data; // 假设返回的 URL 在 res.data 中
      onUploadSuccess(uploadedUrl); // 将 URL 传递给父组件
      setImageUrl(uploadedUrl); // 设置图片 URL 以便显示
      message.success("上传成功");
      setFile(null); // 上传成功后清空文件
    } catch (e: any) {
      message.error("上传失败，" + e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Upload
        beforeUpload={async (file) => {
          const isImage = file.type.startsWith("image/");
          if (!isImage) {
            message.error("只能上传图片文件!");
            return Upload.LIST_IGNORE;
          }
          setFile(file);
          return false; // 阻止自动上传，使用自定义上传逻辑
        }}
        onRemove={() => {
          setFile(null);
          setImageUrl(null); // 移除文件时也移除显示的图片
        }}
        fileList={file ? [file] : []}
        maxCount={1}
        listType="picture" // 更好的图片显示样式
      >
        <Button icon={<UploadOutlined />}>选择图片</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "上传中" : "开始上传"}
      </Button>
      {imageUrl && (
        <div style={{ marginTop: 16 }}>
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            // 你可以根据需要调整宽度或添加其他样式
          />
        </div>
      )}
    </>
  );
};

export default ImageUpload;
