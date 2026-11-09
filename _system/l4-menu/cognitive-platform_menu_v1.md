---
title: 认知平台 · 菜单架构 v1
owner: "@beynawoo-code"
date: 2026-10-15
version: v1.0
related:
  - ../l3-business-capability-architecture/cognitive-platform_capability_architecture.md
  - ../l1-business-workflow/cognitive-platform-workflow.md
---

# 认知平台 · 菜单架构 v1

> **TL;DR**：门户是消费 IA（首页四栏 + 提报/考试/商城/消息/我的）；后台是 ERP 子应用 **7 组 19 个侧栏页**。角色矩阵用拟用 8 角色；真实鉴权是菜单码。优先级：现网已有 = **现状**（等价 P0）；代码标明未完成的标 **缺口**；规划未进仓不进本表。

## 设计原则

1. 能力 → 菜单对照 L3；无现网路由则不列。
2. 看板（提报统计/目标）与操作（审核、组卷、履约）分开。
3. 命名用业务方语言，path 与 `ADMIN_ROUTES` / 门户 `routes.tsx` 逐字一致。
4. 符号：⭐️ 主责写 · ● 常用协同 · ○ 只读 · — 不可见。

## 角色定义

| 代号 | 角色 | 定位 |
|:---:|------|------|
| EMP | 全员员工 | 门户主用户 |
| MENTOR | 导师 | 素材提报门槛 |
| OPS | 内容运营 | 后台运营组主责 |
| BP | 业务伙伴 | BDA 审核/奖金协同 |
| LEARN | 学习运营 | 课程考试 |
| GROWTH | 成长运营 | 勋章/素材/价值点/目标 |
| PTS | 积分运营 | 商城履约 |
| SYS | 系统管理 | 用户与统计 |

门户底线权限：进入认知平台需 `cognition:cognition:app`（及查看码）。积分/奖金按钮另码。

## 一级模块总览

```text
门户  ① 首页信息流  ② 提报  ③ 考试中心  ④ 积分商城  ⑤ 消息中心  ⑥ 个人中心
后台  ① 运营  ② 用户  ③ 成长  ④ 素材  ⑤ 角色价值  ⑥ 考试  ⑦ 积分
```

后台分组名对齐 `ADMIN_MODULE_LABEL`。

## 门户菜单明细

| 一级 | 二级 | 路由（示意） | L3 能力 | EMP | MENTOR | 优先级 |
|------|------|----------------|---------|:---:|:---:|:---:|
| 首页 | 专业 | `/cognition/app?tab=prof` | 信息流聚合 | ⭐️ | ⭐️ | 现状 |
| 首页 | CBDA案例 | `tab=cbda` | 信息流聚合 | ⭐️ | ⭐️ | 现状 |
| 首页 | 课程 | `tab=course` | 课程编排/发现 | ⭐️ | ⭐️ | 现状 |
| 首页 | 官方发布 | `tab=pub` | 官方运营位 | ⭐️ | ⭐️ | 现状 |
| 详情 | 专业/CBDA/课程/发布详情 | `/professional/:id` 等 | 内容互动 | ⭐️ | ⭐️ | 现状 |
| 提报 | 提报 BDA | `/submit/bda` | 结构化提报 | ⭐️ | ● | 现状 |
| 提报 | 提报素材 | `/submit/material` | 结构化提报 + 导师资格 | — | ⭐️ | 现状 |
| 考试 | 列表/简介/答题/成绩/排行 | `/exam/*` | 考试执行 | ⭐️ | ● | 现状 |
| 考试 | 提报考题 | `/exam/:id/submit-question` | 题库与组卷（用户侧） | ● | ● | 现状 |
| 积分商城 | 首页/商品/兑换/申请 | `/mall/*` | 兑换履约 | ● | ● | 现状（需 minePoint） |
| 消息 | 消息中心 | `/inbox` | 消息触达 | ⭐️ | ⭐️ | 现状 |
| 我的 | 个人中心 | `/me` | 横切 | ⭐️ | ⭐️ | 现状 |
| 我的 | 勋章墙 / 铭牌 | `/me/medals` 等 | 勋章铭牌 | ● | ● | 现状 |
| 我的 | 积分/奖金明细 | `/me/bonus` | 积分账户 | ● / ○ | ● | 现状（奖金需 mineBonus） |
| 我的 | 我的互动 | `/me/interactions` | 内容互动 | ● | ● | 现状 |
| 登录 | 账密 / SSO / 钉钉 | `/login` `/sso` `/dingtalk-auth` | 身份会话 | ⭐️ | ⭐️ | 现状 |

OPS 等运营角色日常主阵地在后台；进入门户时按 EMP 行理解（同一账号可同时有后台码）。

## 后台菜单明细（19 个侧栏页）

| 一级 | 二级 | path | authPattern | L3 | OPS | BP | LEARN | GROWTH | PTS | SYS | 备注 |
|------|------|------|-------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|------|
| 运营 | 提报内容管理 | `/operate/cognitionManage` | `cognition:operate:cognitionManage` | 审核上下架 | ⭐️ | ○ | — | ● | — | ○ | 含子页 JPC/分享详情 |
| 运营 | 发布内容管理 | `/operate/publishManage` | `…publishManage` | 官方运营位 | ⭐️ | — | — | — | — | ○ | 含创建/详情 |
| 运营 | 考试管理 | `/operate/examManage` | `…examManage` | 题库与组卷 | ○ | — | ⭐️ | — | — | ○ | 含创建/查看/编辑/复制 |
| 运营 | 课程管理 | `/operate/courseManage` | `…courseManage` | 课程编排 | ○ | — | ⭐️ | — | — | ○ | |
| 运营 | 考试主题管理 | `/operate/examThemeManage` | `…examThemeManage` | 题库与组卷 | ○ | — | ⭐️ | — | — | ○ | |
| 运营 | 试题管理 | `/operate/questionManage` | `…questionManage` | 题库与组卷 | ○ | — | ⭐️ | — | — | ○ | |
| 运营 | 话题管理 | `/operate/topicManage` | `…topicManage` | 话题标签 | ⭐️ | — | — | ● | — | ○ | |
| 运营 | BDA管理 | `/operate/bdaManage` | `…bdaManage` | 审核上下架 | ⭐️ | ⭐️ | — | — | — | ○ | 审核状态含上级/BP |
| 运营 | 活动管理 | `/operate/activityManage` | `…activityManage` | 官方运营位 | ⭐️ | — | — | — | — | ○ | |
| 用户 | 用户管理 | `/user/userManage` | `cognition:user:userManage` | 菜单鉴权/人 | ○ | — | — | — | — | ⭐️ | |
| 用户 | 提报统计 | `/user/statisticalReport` | `…statisticalReport` | 运营复盘 | ● | ○ | ○ | ● | — | ⭐️ | |
| 用户 | 目标管理 | `/user/targetManage` | `…targetManage` | 目标额度 | ○ | ○ | — | ⭐️ | — | ● | |
| 成长 | 勋章管理 | `/growth/medalManage` | `cognition:growth:medalManage` | 勋章铭牌 | — | — | — | ⭐️ | — | ○ | |
| 素材 | 素材管理 | `/material/materialMgr` | `cognition:material:materialMgr` | 审核上下架 | ● | — | — | ⭐️ | — | ○ | 含详情 |
| 角色价值 | 价值点管理 | `/role/valueMgr` | `cognition:role:valueMgr` | 导师资格/标签 | ○ | — | — | ⭐️ | — | ○ | |
| 考试 | AI试题生成 | `/exam/aiQuestion` | `cognition:exam:aiQuestion` | 题库与组卷 | — | — | ● | — | — | ○ | **缺口**：页在路由表，完整度以代码「桩/已实现」为准，本表不扩展能力 |
| 积分 | 商品管理 | `/points/productManage` | `cognition:points:productManage` | 兑换履约 | — | — | — | — | ⭐️ | ○ | |
| 积分 | 兑换订单 | `/points/redeemOrder` | `…redeemOrder` | 兑换履约 | — | — | — | — | ⭐️ | ○ | |
| 积分 | 积分明细 | `/points/pointsDetails` | `…pointsDetails` | 积分账户 | ○ | ● | — | ● | ⭐️ | ○ | |

不进侧栏、复用父页权限：JPC详情、分享详情、发布创建/详情、考试 CRUD 子路径、课程详情、素材详情、导入导出任务（`/user/importExportTask`，鉴权同提报统计）。

EMP / MENTOR **无后台菜单**（—），除非同一账号另授 `cognition:*` 管理码。

## 角色 × 一级模块快照

| 一级 | EMP | MENTOR | OPS | BP | LEARN | GROWTH | PTS | SYS |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 门户首页 | ⭐️ | ⭐️ | ○ | ○ | ○ | ○ | ○ | ○ |
| 门户提报 | ⭐️ BDA | ⭐️ 素材 | — | — | — | — | — | — |
| 门户考试 | ⭐️ | ● | ○ | — | ○ | — | — | — |
| 门户商城 | ● | ● | — | — | — | — | ○ | — |
| 后台运营 | — | — | ⭐️ | ● | ⭐️ 考课 | ● | — | ○ |
| 后台用户 | — | — | ● | ○ | ○ | ● | — | ⭐️ |
| 后台成长/素材/价值 | — | — | ● | — | — | ⭐️ | — | ○ |
| 后台积分 | — | — | ○ | ● | — | ● | ⭐️ | ○ |

## 与 L3 对照索引

| L3 二级能力 | L4 入口 |
|-------------|--------|
| 结构化提报 | 门户提报 BDA / 提报素材 |
| 审核上下架 | 提报内容管理、BDA管理、素材管理 |
| 官方运营位 | 发布内容管理、活动管理、首页官方发布 |
| 信息流聚合 / 检索筛选 | 首页四 Tab |
| 话题标签 | 话题管理 |
| 课程编排 | 课程管理、首页课程 |
| 题库与组卷 | 试题/主题/考试管理、AI试题生成、提报考题 |
| 考试执行 | 门户考试链路 |
| 内容互动 | 详情互动栏、我的互动 |
| 消息触达 | 消息中心 |
| 积分账户 | 积分明细、我的积分/奖金 |
| 兑换履约 | 商品/订单、积分商城 |
| 勋章铭牌 | 勋章管理、勋章墙/铭牌 |
| 目标额度 | 目标管理 |
| 身份会话 | 登录/SSO/钉钉 |
| 菜单鉴权 | ERP 菜单树 + 用户管理 |
| 导师资格 | 提报素材门槛、价值点管理 |

---

作者：@beynawoo-code
