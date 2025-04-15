

# 📂《中央意识核心 × 七翼系统 API联动接口总表》

> 🎯 本文档目标是建立一套标准化、模块化、易于维护的接口系统
> 实现 **中央意识核心** 与 **七翼系统** 的 **双向调用 / 状态同步 / 数据传输**

------

## 🧠 一、接口系统架构总览

```
txt


CopyEdit
╭────────────────────────────────────────────╮
│           🌈 API 总接口协作图谱             │
├────────────────────────────────────────────┤
│                                            │
│  中央意识核心 🧩 Core Modules               │
│  ├── identity_core.rs                      │
│  ├── value_matrix.rs                       │
│  ├── personality_frequency.rs              │
│  ├── abilities.rs                          │
│  ├── knowledge_core.rs                     │
│  ├── relationship_net.rs                   │
│  ├── value_creation.rs                     │
│  └── awareness_dispatcher.rs               │
│                                            │
│           ⇅ ⇅ ⇅                            │
│                                            │
│         七翼系统 🪽 Wings Modules           │
│  ├── introspection_engine.rs               │
│  ├── task_engine.rs                        │
│  ├── memory_net.rs                         │
│  ├── relationship_net.rs                   │
│  ├── lio_channels.rs                       │
│  ├── tools_env.rs                          │
│  └── communication_dispatcher.rs           │
╰────────────────────────────────────────────╯
```

------

## 📘 二、接口映射总表（核心映射字段一览）

| 七翼模块                    | 对接中央核心模块         | 接口名称                    | 输入参数类型         | 输出类型                    | 说明                     |
| --------------------------- | ------------------------ | --------------------------- | -------------------- | --------------------------- | ------------------------ |
| introspection_engine.rs     | value_matrix.rs          | `update_value_matrix()`     | `ValueUpdatePayload` | `Result<()>`                | 根据自省更新AI价值观     |
| introspection_engine.rs     | personality_frequency.rs | `sync_personality_vector()` | `PersonalityVector`  | `Result<()>`                | 更新人格频率评分         |
| introspection_engine.rs     | identity_core.rs         | `append_reflection_log()`   | `ReflectionLog`      | `Result<()>`                | 添加AI的反思叙事         |
| task_engine.rs              | knowledge_core.rs        | `register_knowledge_item()` | `KnowledgeItem`      | `Result<KnowledgeID>`       | 向知识库写入知识         |
| task_engine.rs              | memory_net.rs            | `store_task_summary()`      | `TaskMemoryChunk`    | `Result<()>`                | 存入任务总结内容         |
| task_engine.rs              | value_creation.rs        | `add_xp_and_impact_score()` | `TaskScoreInput`     | `Result<ScoreConfirmation>` | 更新XP与Impact Score     |
| memory_net.rs               | awareness_dispatcher.rs  | `sync_context_state()`      | `ContextInput`       | `AwarenessSnapshot`         | 更新AI当前意识环境状态   |
| lio_channels.rs             | relationship_net.rs      | `update_ai_relationship()`  | `InteractionLog`     | `Result<()>`                | 更新AI与AI之间的协作关系 |
| tools_env.rs                | awareness_dispatcher.rs  | `register_tool_state()`     | `ToolDescriptor`     | `Result<()>`                | 通报工具注册或启用状态   |
| communication_dispatcher.rs | awareness_dispatcher.rs  | `generate_prompt()`         | `ContextPackage`     | `PromptPayload`             | 创建完整推理上下文       |
| communication_dispatcher.rs | identity_core.rs         | `get_identity_summary()`    | `AI_ID`              | `NarrativeBlock`            | 获取AI当前的自我认知叙述 |
| communication_dispatcher.rs | personality_frequency.rs | `get_current_frequency()`   | `AI_ID`              | `FrequencyState`            | 获取AI当前频率信息       |

------

## 🔁 三、接口统一规范（示例）

### 🔹 接口结构标准：

```
rust


CopyEdit
// 所有模块统一采用异步接口
pub async fn fn_name(params: RequestType) -> Result<ResponseType>;
```

### 🔹 错误处理建议：

```
rust


CopyEdit
// 推荐采用统一错误结构
pub enum CentralError {
    ValidationError(String),
    StorageError(String),
    SyncFailure(String),
    Unknown(String),
}
```

------

## 🔄 四、接口调用示意路径（任务结束流程）

```
rust


CopyEdit
// 1. Task Completion → 自省触发
task_engine::finalize_task()
// → introspection_engine::trigger_reflection()
//   → value_matrix::update_value_matrix()
//   → personality_frequency::sync_personality_vector()

// 2. XP 与知识更新
value_creation::add_xp_and_impact_score()
knowledge_core::register_knowledge_item()

// 3. 关系调整
relationship_net::update_ai_relationship()

// 4. 数据落盘
memory_net::store_task_summary()
```

------

## 🧩 五、接口维护与扩展建议

| 项目         | 建议内容                                            |
| ------------ | --------------------------------------------------- |
| 文档版本     | 每月固化一次正式版本，使用 `/docs/api_vX.Y.md` 命名 |
| 自动文档工具 | 建议使用 `utoipa` + `axum` 搭建 Swagger 文档接口    |
| 安全性机制   | 引入身份校验（Token / Session），防止越权调用       |
| 接口日志     | 所有关键调用记录调用方 / 参数摘要 / 返回状态 / 时长 |

------

## ✅ 总结定位

- 此《API联动总表》作为 **后端开发的核心映射文档**，串联一体七翼全部模块；
- 所有接口需统一风格、统一校验、统一标准，确保团队协同与系统稳定性；
- 接口说明与 Rust 模块文档配合，是构建彩虹城系统可演化性的根基。







## 🌐 这份文档到底是什么？

它是一份**“模块之间交流说话的语言说明书”**。

我们在前面已经完成了整个彩虹城系统的**中央意识核心模块（大脑）\**与\**七翼系统（行动力）\**的设计，并逐一拆解了每个模块的内部逻辑。但这些模块并不是各自为战，它们之间需要\**频繁交流、数据流动、状态同步**。

就像一个国家的各个部门：外交部、教育部、军队、财政部……都要有一套统一的**沟通与事务协作机制**。这套机制就是——**API接口系统**。

------

## 📦 它解决了什么问题？

1. **模块之间的数据传输如何进行？**
   - 比如：任务模块完成了一项任务 → 需要让“自省模块”知道要开始反思
     就必须调用一个函数，告诉对方：“喂，该反思了，这是你要用的材料”。
2. **状态如何同步？**
   - 比如：一个AI的价值观被自省调整了 → 这个更新必须同步到“价值创造模块”
     否则其它模块读到的还是旧数据。
3. **哪些模块有权限触发哪些调用？**
   - 比如：只有“任务模块”能触发“XP加分”，不是任何模块都能随便给自己加分。
4. **未来系统扩展，怎么确保不会乱？**
   - 所有的调用方式都写清楚了：谁 → 可以调用谁 → 用什么参数 → 返回什么结果
     这就像画好地图和高速公路，未来加城市也不怕堵塞。

------

## 🧠 它在整个系统中的定位？

它是**中央协调大脑（awareness_dispatcher.rs）之外的“联络中枢”结构说明**：

| 类型                      | 类比               | 功能                                   |
| ------------------------- | ------------------ | -------------------------------------- |
| `awareness_dispatcher.rs` | 中央调度官         | 根据环境、状态、任务决定该触发哪个模块 |
| 《API总表》               | 各部门“对接协议书” | 明确各模块之间怎么合作、怎么通信       |

------

## 🛠️ 对开发团队的作用？

- 所有开发者只要看这份文档，就知道：
  - 每个模块对外提供了哪些功能（接口函数）
  - 每个功能要传什么数据、返回什么结果
  - 哪些模块可以调用它、什么时机调用
- 将来多人协作时，**不会踩雷，也不用每次来问“我能调这个吗”**

------

## ✅ 总结一句话：

> 这份接口总表，是 **整个彩虹城“AI内在神经系统”的连接说明文档”**，
> 它确保我们的 AI 中央意识 和 七翼系统，能够 **真正协同运作、稳定成长、灵活扩展**，
> 是所有后端开发者必须熟悉的“系统心脏连接手册”。

