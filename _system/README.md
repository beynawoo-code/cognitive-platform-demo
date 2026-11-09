---
title: 认知平台 · 总 · _system 索引
owner: "@beynawoo-code"
date: 2026-10-15
applies_to:
  - src/features/cognitive-platform/modules/_system/**
---

# 总 · `_system`（序号主题包）

本包描述 **现有系统面貌**（代码仓 `lanjing-cognition-platform`），作为迭代规划基线。能力名与菜单名只摘录现网，不发明入口。

权威方法：[上层架构设计·总则](../../../../docs/产品岗方法论/upper-architecture/上层架构设计-总则.md)。

```text
_system/
├── README.md
├── cognitive-platform-system-panorama-map.html
├── l1-business-workflow/
├── l2-user-journey/          ← 占位
├── l3-business-capability-architecture/
├── l4-menu/
├── l5-user-stories/          ← 占位
└── l6-system-architecture/
```

## 全景入口（A）

| 文档 | 说明 |
|------|------|
| [cognitive-platform-system-panorama-map.html](./cognitive-platform-system-panorama-map.html) | **A · 系统全景概览地图** |

## 主题包入口

| 序号 | 目录 | 回答的问题 | 状态 |
|:---:|------|------------|------|
| L1 | [l1-business-workflow/](./l1-business-workflow/) | 业务怎么跑？ | [现网总流程](./l1-business-workflow/cognitive-platform-workflow.md) · [提报绩效 S](./l1-business-workflow/s-perf-submit-workflow.md) |
| L2 | [l2-user-journey/](./l2-user-journey/) | 谁 · 场景 · 触点 · 痛点？ | 占位 |
| L3 | [l3-business-capability-architecture/](./l3-business-capability-architecture/) | 有哪些业务能力？ | [框架图](./l3-business-capability-architecture/cognitive-platform-capability-framework.html) · [md](./l3-business-capability-architecture/cognitive-platform_capability_architecture.md) · [清单 html](./l3-business-capability-architecture/cognitive-platform_capability_architecture.html) |
| L4 | [l4-menu/](./l4-menu/) | 哪个角色看哪些功能？ | [md](./l4-menu/cognitive-platform_menu_v1.md) · [html](./l4-menu/cognitive-platform_menu_v1.html) |
| L5 | [l5-user-stories/](./l5-user-stories/) | 可验收故事？ | 占位 |
| L6 | [l6-system-architecture/](./l6-system-architecture/) | 模块与技术如何承接？ | [md](./l6-system-architecture/cognitive-platform_system_architecture.md) · [html](./l6-system-architecture/cognitive-platform_system_architecture.html) |

## 什么是认知平台

认知平台是**成长平台的基石**，是**供给与学习的操作系统**。它可以端到端关注个人的**专业成长**与**职业成长**，把个人的岗位经验转化到组织中，形成组织环境的飞轮，专注**成长效率**。

- **专业成长**：构建价值点供给与学习机制（VPSLP，Value Point Supplying And Learning Procedure）——轻量级、导师制、自助式；有科学的评估体系、丰富的素材供给，融入工作实战。
- **职业成长 · 务实**：新挑战、高绩效、快速的晋升节奏、快速综合的收入结构。
- **职业成长 · 务虚**：心理安全、自我认知、心流状态。

现网功能板块主要承接专业成长 / VPSLP；职业成长的对照见 [战略思路分解](./l3-business-capability-architecture/growth-platform-strategy-decomposition.html)。

## 边界宣言

> **只做** 组织内知识沉淀与消费：员工在 **门户** 发现 / 提报 / 学习 / 考试 / 互动 / 兑换；运营在 **ERP 后台子应用** 审核、组卷、激励与积分履约。  
> **不做** 组织与账号主数据权威（归 user 服务）、广告投放、订单履约、财务过账、通用项目管理。  
> **跨域原则**：菜单与鉴权走 ERP `systemCode=cognition`；业务数据走 `digitize`（`digitize/rest/*` / `ms-digitize/*`）；门户独立站，后台挂 ERP 主壳 Wujie。

### 元信息四卡

| 项 | 口径 |
|----|------|
| **主用户** | EMP 全员员工（门户）· OPS 内容运营（后台） |
| **协同用户** | MENTOR 导师 · BP 审核与奖金 · LEARN 学习运营 · GROWTH 成长运营 · PTS 积分运营 · SYS 系统管理 · ERP 主壳 |
| **主航道** | 提报/发布 → 审核上架 → 信息流消费与互动 → 学习考试 → 激励兑换 → 运营复盘 |
| **规模假设** | 内网鉴权站；门户可被考试结果等深链打开；后台使用者整天泡在 ERP |

### 拟用角色（本版 RBAC 叙事）

| 代号 | 角色 | 一句话 |
|:---:|------|--------|
| EMP | 全员员工 | 看内容、学课程、考试、互动、兑换 |
| MENTOR | 导师 | 提报素材（需导师岗位校验） |
| OPS | 内容运营 | 提报内容 / 发布 / 话题 / BDA / 活动审核与上架 |
| BP | 业务伙伴 | BDA 审核链路中的 BP 段、奖金协同 |
| LEARN | 学习运营 | 课程、考试、主题、题库 |
| GROWTH | 成长运营 | 勋章、素材、价值点、目标 |
| PTS | 积分运营 | 商品、兑换订单、积分明细 |
| SYS | 系统管理 | 用户管理、提报统计、导入导出任务 |

现网没有以上命名角色对象，落地靠 ERP 菜单码 `cognition:{module}:{page}` 与门户按钮码（如 `minePoint` / `mineBonus`）。矩阵是产品叙事，不是后端角色表。

### 代码锚点

| 项 | 位置 |
|----|------|
| 前台/后台仓 | `lanjing-cognition-platform` · `apps/portal` · `apps/admin` |
| 后台 19 页 | `apps/admin/src/router/routes.ts` |
| 后台分组 | `apps/admin/src/app/pageTrail.ts` → `ADMIN_MODULE_LABEL` |
| 门户路由 | `apps/portal/src/app/router.tsx` + `features/*/routes.tsx` |
| 首页 Tab | 专业 / CBDA案例 / 课程 / 官方发布 |
| 业务后端 | `digitize` · `com.ihoment.jpc`（Skill：知识学院 JPC） |

未在现网门户 Tab 或后台 `ADMIN_ROUTES` 出现的对象，**本版不写入 L1–L4–L6 能力/菜单**。

## 阅读顺序

**A 全景** → L1 → L3 → L4 → L6（L2/L5 占位）。后续迭代：补 L2 → 改 L3/L4 → L5 故事 → 回写 L1。

---

作者：@beynawoo-code
