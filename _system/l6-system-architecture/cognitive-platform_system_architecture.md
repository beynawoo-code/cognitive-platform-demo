---
title: 认知平台 · L6 系统架构
owner: "@beynawoo-code"
date: 2026-10-15
version: v1.0
related:
  - ../l4-menu/cognitive-platform_menu_v1.md
  - ../l3-business-capability-architecture/cognitive-platform_capability_architecture.md
---

# 认知平台 · L6 系统架构

> **TL;DR**：一个 pnpm monorepo 出两个静态站——**portal 独立站**（React + Tailwind）与 **admin Wujie 子应用**（React + antd，挂 ERP 主壳）。业务 API 仍在 ERP_backend **digitize**；登录菜单在 **user**。本层只承接 L4 已有入口，不增加幽灵模块。

## 为何这样拆

- 门户要被深链打开、视觉是消费产品 → 独立站 + 自建登录/SSO。
- 后台使用者泡在 ERP → 继续 Wujie，菜单契约 `path` / `authPattern` 与主壳 `leftMenuMap` 对齐。
- 不做 SSR/BFF：阿里云静态线无容器通道，内网站无 SEO 收益。

## 仓库拓扑

```text
lanjing-cognition-platform
├── apps/portal     门户 · 端口 9920 · 桶 cognition-portal-fe
├── apps/admin      后台 · 端口 9910 · 桶复用 cognition-fe / 现网静态域
└── packages/
    ├── api-client           openapi-fetch + 信封解包（禁手改 generated）
    ├── tokens               设计 token SSOT
    ├── rich-text-sanitize   DOMPurify，对齐 Quill HTML
    ├── domain-constants     业务枚举（老仓逐字，禁改值）
    └── config               tsconfig / eslint
```

应用内业务按 `src/features/<模块>/`（portal：feed/detail/submit/exam/mall/me/inbox/interaction；admin：content/publish/exam/user/growth/points）。Controller 不在本仓；本仓是 BFF 不存在的展示层。

## 分层对照 L3

| 层 | 模块 | 对应 L3 |
|----|------|---------|
| 应用 · 门户 | feed / detail / submit / exam / mall / me / inbox | ②③④⑤ 消费面 |
| 应用 · 后台 | operate 页、user、growth、material、role、exam、points | ①③⑤⑥ 治理面 |
| 集成 | api-client → 网关 `backend.lanjingerp.com` | 信封 `{code,msg,data,success}` |
| 领域（后端） | digitize `com.ihoment.jpc` | 内容/课考/互动/积分等表 |
| 身份 | user 登录、菜单；门户 `cognition.token`；后台 `token` 与主壳共享 | ⑥ |
| 文件 | 公有 OSS | 封面/附件 |
| 富文本 | Quill 1.3.7 + sanitize 包 | 存量 HTML 方言 |

## 集成点

| 方向 | 系统 | 方式 | 备注 |
|------|------|------|------|
| 入 | ERP 主壳 | Wujie 挂载 admin；SSO fragment 跳 portal/admin | `aiPlatform.js` AES-GCM |
| 入 | 钉钉 | 门户 `/dingtalk-auth` | 免登 |
| 出/入 | user | 登录、logout、loginUserInfo、menus-role | 门户部分接口无标准信封 |
| 出/入 | digitize | 业务 REST | 与 `ms-digitize` 同源路径 |
| 入 | Job | 考试超时交卷、推荐分等 | 门户只读结果 |
| 文件 | OSS | 上传/公读 | 预览契约不在本轮展开 |

无 refresh token；401 清会话。后台 Wujie 内 401 发 `sub-route-change`（`systemCode: cognition`）。

## 鉴权要点

- 后台：S8-A 双路径（主壳 bootstrap 快照优先，否则拉网）。
- 门户：`protectedLoader` 查 token；按钮权限 `useButtonPermission`。
- 素材提报：另调导师接口，不是菜单码。

## 交付成熟度（相对 L4）

| 阶段 | 对应菜单子集 | 状态 |
|------|----------------|------|
| 现状已接网关 | 门户主链路 + 后台 19 页路由 | 代码在仓 |
| 已知缺口 | 列表错误态、部分表单字段未接后端、AI 试题页完整度、Wujie+React19 沙箱实测、写操作未全部验收 | 见两端 README「已知问题」 |
| 规划未进仓 | 不在 L4 的能力（不在本架构图加模块） | 只在 A 页列表 |

## 与相邻系统

不修改 `common` 认知实体。组织主数据、账号以 user 为准。ERP 其它子系统（销售/供应链等）无本系统写依赖。

---

作者：@beynawoo-code
