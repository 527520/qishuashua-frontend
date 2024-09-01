import { Button, Result } from "antd";

/**
 * 无权限访问的页面
 * @constructor
 */
const Forbidden = () => {
  return (
    <Result
      status={403}
      title="403 无权限"
      subTitle="抱歉，您无权限访问该页面。"
      extra={
        <Button type="primary" href="/">
          回到首页
        </Button>
      }
    />
  );
};

export default Forbidden;