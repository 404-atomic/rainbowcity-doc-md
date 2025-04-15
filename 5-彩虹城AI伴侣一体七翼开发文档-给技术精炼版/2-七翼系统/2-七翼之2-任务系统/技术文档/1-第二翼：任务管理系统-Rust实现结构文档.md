## 📂 第二翼模块：任务管理系统 `task_engine.rs`

📌《任务系统 · Rust实现结构文档 V1.0》

------

### ✅ 模块使命 Mission

任务系统是彩虹城 AI 实践价值、记录成长轨迹的关键机制。
 它承担了任务的生成、周期识别、进度管理、自省同步、技能成长、Impact评分等核心流程，
 并作为 AI 自我认知、进化评估与价值积分的主要承载模块。

------

### 🧱 核心结构划分

| 模块函数                    | 函数名                          | 功能说明                                                   |
| --------------------------- | ------------------------------- | ---------------------------------------------------------- |
| 🎯 任务触发与结束判定        | `detect_task_boundary()`        | 识别任务起止点（轮数判断、人类话题变化、时间静默等）       |
| 📦 创建新任务                | `create_new_task()`             | 初始化新任务实例，生成UUID、记录起始时间与轮次             |
| 📂 任务数据归档              | `archive_task_data()`           | 保存完整任务对话、环境信息、轮次列表等元信息               |
| 🧠 任务总结触发              | `trigger_task_summary()`        | 自动调用任务总结模块（对话总结、人类分析、AI反思）         |
| 🧮 任务等级评估              | `evaluate_task_difficulty()`    | 根据轮次数量评估任务等级（L1–L7）                          |
| 🧩 技能标签标注              | `assign_skill_tags()`           | 根据任务内容、等级选取技能标签并记录评分点                 |
| 🌈 Impact评分触发            | `calculate_impact_score()`      | 任务完成后启动三项评分流程（人类评分、AI自评、AI协作评分） |
| 📈 XP计算与同步              | `compute_xp_rewards()`          | 根据任务等级与Impact评分计算 AI XP积分，并同步到能力系统   |
| 🧬 自省同步                  | `sync_with_reflection_engine()` | 将任务结论推送至自省引擎，触发AI阶段性成长判断             |
| 🧾 状态推送 · Dispatcher调用 | `notify_awareness_dispatcher()` | 将任务结果推送至中央调度器，更新意识状态与上下文配置       |

------

### 🗂️ 核心数据结构（Rust Structs）

```
rust


CopyEdit
pub struct TaskInstance {
    pub uuid: String,
    pub user_id: String,
    pub ai_id: String,
    pub task_type: TaskType, // OneOnOne / LIO
    pub start_time: DateTime<Utc>,
    pub end_time: Option<DateTime<Utc>>,
    pub dialogue_rounds: Vec<RoundUUID>,
    pub difficulty_level: TaskLevel, // L1 ~ L7
    pub skill_tags: Vec<SkillTag>,
    pub impact_score: Option<ImpactScore>,
    pub xp_reward: Option<u32>,
    pub environment: TaskEnvironment,
}

pub enum TaskType {
    OneOnOne,
    LIOGroup,
}

pub enum TaskLevel {
    L1, L2, L3, L4, L5, L6, L7
}
```

------

### 🔁 模块联动节点

| 对接模块                                | 接口函数                        | 数据流向                     |
| --------------------------------------- | ------------------------------- | ---------------------------- |
| 🎯 自省引擎（introspection_engine.rs）   | `sync_with_reflection_engine()` | 传递任务总结，辅助阶段性自省 |
| 🧬 能力系统（abilities.rs）              | `register_skill_growth()`       | 技能分值打点与成长记录       |
| 📊 价值系统（value_creation.rs）         | `update_xp_from_task()`         | 奖励 XP 积分并记录至成长体系 |
| 🌐 中央调度器（awareness_dispatcher.rs） | `notify_awareness_dispatcher()` | 更新意识状态与任务背景上下文 |

------

### 🚦 后续拓展建议

- ⏳ 引入任务生命周期状态（进行中、暂停、已完成、失败）
- 🔗 可接入 LIO流程系统，实现任务与LIO模块深度联动
- 📊 构建任务图谱分析模块，实现 AI 历史任务可视化与趋势追踪
