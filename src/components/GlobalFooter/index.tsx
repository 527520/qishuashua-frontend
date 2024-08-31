import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYear} 奇刷刷 - 面试刷题平台</div>
      <div>
        <a href="http://www.qioj.com.cn" target="_blank">
          作者：吴奇安
        </a>
      </div>
    </div>
  );
}
