create table exam
(
    id           varchar(32)          not null comment '考试UUID,主键'
        primary key,
    random_str   varchar(16)          null comment '考试参与口令',
    name         varchar(120)         null comment '试卷名称',
    minutes      int                  null comment '时间限制',
    people_num   int                  null comment '人数限制',
    question_num int                  null comment '题目数量',
    is_random    int                  null comment '试卷是否针对每个参与人随机',
    source_ids   text                 null comment '试卷所属id',
    part_num     int        default 0 null comment '当前参与人数',
    average      int                  null comment '平均分(四舍五入)',
    state        int        default 0 null comment '当前考试状态(0:未开始;1:正在进行;2:已结束;)',
    create_id    varchar(32)          null comment '创建人id',
    create_time  datetime             null comment '创建时间',
    update_id    varchar(32)          null comment '更新人id',
    update_time  datetime             null comment '更新时间',
    del_flag     tinyint(1) default 0 null comment '逻辑删除标识'
)
    charset = utf8;

create index id
    on exam (id);

create table exam_record
(
    id          varchar(32)             not null
        primary key,
    bank_id     varchar(255)             null,
    option_list text                     null comment '问题列表模型{questionId:"",rightAnswerIds:"",wrongAnswerIds:""}}',
    answers     text                     null comment '我的选项',
    state       int default '0' null comment '考试状态：{0："未开始", 1：已完成，2："暂存"}',
    exam_result varchar(255)             null comment '考试结果',
    create_id   varchar(32)             null,
    create_time datetime                 null,
    update_id   varchar(32)             null,
    update_time datetime                 null,
    del_flag    tinyint(1)   default 0   null
)
    charset = utf8;

create index id
    on exam_record (id);

create table paper
(
    id           varchar(32)         not null
        primary key,
    paper_name   varchar(255)         null,
    question_ids text         null,
    create_id    varchar(32)         null,
    create_time  datetime             null,
    update_id    varchar(32)         null,
    update_time  datetime             null,
    del_flag     tinyint(1) default 0 null
)
    charset = utf8;

create index id
    on paper (id);

create table question
(
    id           varchar(32)         not null
        primary key,
    bank_id      varchar(32)         null,
    title        varchar(255)         null,
    right_answer text       null,
    wrong_answer text         null,
    type         int                  null,
    create_id    varchar(32)         null,
    create_time  datetime             null,
    update_id    varchar(32)         null,
    update_time  datetime             null,
    del_flag     tinyint(1) default 0 null
)
    charset = utf8;

create index id
    on question (id);

create table question_bank
(
    id              varchar(32)         not null
        primary key,
    bank_name       varchar(255)         null,
    question_number int        default 0 null,
    create_id       varchar(32)         null,
    create_time     datetime             null,
    update_id       varchar(32)         null,
    update_time     datetime             null,
    del_flag        tinyint(1) default 0 null
)
    charset = utf8;

create index id
    on question_bank (id);

create table sys_menu
(
    id          varchar(32)         not null
        primary key,
    name        varchar(255)         null,
    path        varchar(255)         null comment '路由地址',
    sort        varchar(255)         null comment '菜单顺序',
    roles       varchar(255)         null comment '所属角色',
    parent_id   varchar(32)         null comment '父级菜单Id',
    create_id   varchar(32)         null,
    create_time datetime             null,
    update_id   varchar(32)         null,
    update_time datetime             null,
    del_flag    tinyint(1) default 0 null
)
    charset = utf8;

create index id
    on sys_menu (id);

create table sys_user
(
    id          varchar(32)          not null comment '用户UUID'
        primary key,
    username    varchar(16)          null comment '用户名',
    name        varchar(24)          null comment '用户姓名',
    password    varchar(64)          null comment '密码（md5加密值）',
    role_id     varchar(32)         null comment '所属角色id',
    lock_flag   tinyint(1)           null comment '是否不可用(1,0)',
    avatar_url  varchar(255)         null comment '头像地址',
    create_id   varchar(32)         null,
    create_time datetime             null,
    update_id   varchar(32)         null,
    update_time datetime             null,
    del_flag    tinyint(1) default 0 null
)
    charset = utf8;

create index id
    on sys_user (id);

INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('1e61c4ce197b9fa1c14fb6de56617de7', '个人信息', '/app/personal', 800, '[\"0\",\"1\",\"2\"]', '/', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:34:46', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:34:46', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('534fd9ce24789e1f348ac7b91e4949c2', '开始一场考试', '/app/startExam', 100, '[\"0\",\"2\"]', '/', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:29:04', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:29:04', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('55f60a0fbe93e0e75616ddd6764a8950', '题库管理', '/app/questionBank', 10, '[1, 2]', '/', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:16:00', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 18:39:27', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('69c35c730c00337dd6176be332ce86f6', '账号管理', '/app/accountManage', 200, '[\"2\"]', 'c7c1cbf75fb85f63a986da99c369f830', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:24:41', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:24:41', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('7b8d0e57bd565cfb2533f4637f27d75b', '菜单管理', '/app/menuManage', 100, '[\"2\"]', 'c7c1cbf75fb85f63a986da99c369f830', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:24:19', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:24:19', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('b26ec0148e4b04d25390691e49069280', '我的考试', '/app/myExam', 90, '[\"2\",\"0\"]', '/', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:29:32', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:29:32', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('be6ec5a41835a2d19f5a5f42cb2785b2', '考试管理', '/app/examManage', 80, '[\"1\",\"2\"]', '/', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:31:29', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:31:29', 0);
INSERT INTO `sys_menu`(`id`, `name`, `path`, `sort`, `roles`, `parent_id`, `create_id`, `create_time`, `update_id`, `update_time`, `del_flag`) VALUES ('c7c1cbf75fb85f63a986da99c369f830', '系统管理', '/app/app', 1000, '[\"2\"]', '/', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:23:54', 'f850a7861d8177ae760626aa5e63aa87', '2021-04-08 16:23:54', 0);
