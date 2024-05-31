interface Data {
    /** 事件发生的unix时间戳 */
    time: number;
    /** 收到事件的机器人的 QQ 号 */
    self_id: number;
    /** 表示该上报的类型, 消息, 消息发送, 请求, 通知, 或元事件 */
    post_type: "message" | "message_sent" | "request" | "notice" | "meta_event";
}

interface Anonymous {
    /** 匿名用户 ID */
    id: number;
    /** 匿名用户名称 */
    name: string;
    /** 匿名用户 flag, 在调用禁言 API 时需要传入 */
    flag: string;
}

// message消息
interface MessageType {
    type:
        | "face"
        | "record"
        | "video"
        | "rps"
        | "dice"
        | "shake"
        | "anonymous"
        | "share"
        | "contact"
        | "music"
        | "reply"
        | "redbag"
        | "poke"
        | "gift"
        | "forward"
        | "node"
        | "xml"
        | "json"
        | "cardimage"
        | "tts";
    data: {
        text?: string;
        id?: number | string;
        file?: string;
        magic?: 0 | 1;
        cache?: 0 | 1;
        cover?: string;
        c?: number;
        data?: string;
        resid?: number | string;
        proxy?: 0 | 1;
        at?: number;
        url?: string;
        title?: string;
        content?: string | MessageType;
        image?: string;
        ignore?: 0 | 1;
        type?: "qq" | "group" | "custom" | "flash" | "show";
        subType?: number;
        lat?: string | number;
        lon?: string | number;
        audio?: string;
        qq?: number;
        name?: string;
        time?: number;
        timeout?: number;
        uin?: number;
        seq?: MessageType;
        minwidth?: number;
        minheight?: number;
        maxwidth?: number;
        maxheight?: number;
        source?: string;
        icon?: string;
    };
}
interface Sender {
    /** 发送者 QQ 号 */
    user_id: number;
    /** 昵称 */
    nickname: string;
    /** 性别 */
    sex?: string;
    /** 年龄 */
    age?: number;
    /** 临时群消息来源群号 */
    group_id?: number;
    /** 群名片/备注 */
    card?: string;
    /** 地区 */
    area?: string;
    /** 成员等级 */
    level?: string;
    /** 角色 */
    role?: string;
    /** 专属头衔 */
    title?: string;
}

interface Message extends Data {
    group_id: number;
    /**消息类型 */
    message_type: "private" | "group";
    /**表示消息的子类型 */
    sub_type:
        | "group"
        | "friend"
        | "normal"
        | "anonymous"
        | "group_self"
        | "notice";
    message_id: number;
    /** QQ 号 */
    user_id: number;
    /**一个消息链*/
    message: string | MessageType[];
    raw_message: string;
    /**字体 */
    font: number;
    sender: Sender;
    target_id: number;
    anonymous: null | Anonymous;
    temp_source: number;
}

/** 群消息 */
interface GroupMessage extends Data {
    /** 消息子类型 */
    sub_type: string;
    /** 消息 ID */
    message_id: number;
    /** 发送者 QQ 号 */
    user_id: number;
    /** 消息内容 */
    message: string | MessageType[];
    /** 原始消息内容 */
    raw_message: string;
    /** 字体 */
    font: number;
    /** 发送者信息 */
    sender: Sender;
    /** 群号 */
    group_id: number;
    /** 匿名信息, 如果不是匿名消息则为 null */
    anonymous: null | Anonymous;
}
/** 私聊消息 */
interface PrivateMessage extends Data {
    /** 消息子类型 */
    sub_type: string;
    /** 消息 ID */
    message_id: number;
    /** 发送者 QQ 号 */
    user_id: number;
    /** 消息内容 */
    message: string | MessageType[];
    /** 原始消息内容  */
    raw_message: string;
    /** 字体 */
    font: number;
    /** 发送者信息 */
    sender: Sender;
    /** 接受者 QQ 号 */
    target_id: number;
    /** 临时会话来源 */
    temp_source: number;
}

// notice消息（通知上报）
interface Notice extends Data {
    notice_type: string;
    /** QQ 号 */
    user_id: number;
    group_id: number;
    sub_type: string;
    operator_id: number;
    message_id: number;
    file: file;
    duration: number;
    sender_id: number;
    target_id: number;
    honor_type: "talkative" | "performer" | "emotion";
    title: string;
    card_new: string;
    card_old: string;
    client: any;
    online: boolean;
}

//表情回应上报
interface EmojiLike extends Data {
    group_id: number;
    user_id: number;
    notice_type: "group_msg_emoji_like";
    message_id: number;
    likes: likes[];
}

interface likes {
    emoji_id: string;
    count: number;
}

interface file {
    /** 文件 ID */
    id?: string;
    /** 文件名 */
    name: string;
    /** 文件大小（字节数） */
    size: number;
    /** 下载链接 */
    url?: string;
    /** busid（目前不清楚有什么用） */
    busid?: number;
}

/** 私聊消息撤回 */
interface PrivateDeleteMsg extends Data {
    /** 好友 QQ 号 */
    user_id: number;
    /** 被撤回的消息 ID */
    message_id: number;
}
/** 群消息撤回 */
interface GroupDeleteMsg extends Data {
    /** 群号 */
    group_id: number;
    /** 操作者QQ号  */
    operator_id: number;
    /** 消息发送者QQ 号 */
    user_id: number;
    /** 被撤回的消息 ID */
    message_id: number;
}

/** 群成员增加 */
interface GroupMemberAdd extends Data {
    /** 事件子类型 */
    sub_type: "approve" | "invite";
    /** 加入者 QQ 号 */
    user_id: number;
    /** 群号 */
    group_id: number;
    /** 操作者QQ号  */
    operator_id: number;
}

/** 群成员减少 */
interface GroupMemberDecrease extends Data {
    /** 事件子类型 */
    sub_type: "leave" | "kick" | "kick_me";
    /** 群号 */
    group_id: number;
    /** 操作者 QQ 号 ( 如果是主动退群, 则和 user_id 相同 ) */
    operator_id: number;
    /** 离开者 QQ 号 */
    user_id: number;
}

/** 群管理员变动 */
interface GroupAdminChange extends Data {
    /** 事件子类型 */
    sub_type: "set" | "unset";
    /** 群号 */
    group_id: number;
    /** 管理员 QQ 号 */
    user_id: number;
}

/** 群文件上传 */
interface GroupFileUpload extends Data {
    /** 群号 */
    group_id: number;
    /** 发送者 QQ 号 */
    user_id: number;
    /** 文件信息 */
    file: file;
}

/** 群禁言 */
interface GroupBan extends Data {
    /** 事件子类型, 分别表示禁言、解除禁言 */
    sub_type: "ban" | "lift_ban";
    /** 群号 */
    group_id: number;
    /** 操作者 QQ 号 */
    operator_id: number;
    /** 被禁言 QQ 号 (为全员禁言时为0) */
    user_id: number;
    /** 禁言时长, 单位秒 (为全员禁言时为-1) */
    duration: number;
}

/** 好友添加 */
interface FrienAdd extends Data {
    /** 新添加好友 QQ 号 */
    user_id: number;
}

/** 戳一戳 */
interface Notify extends Data {
    /** （群内）发送者 QQ 号 */
    sender_id?: number;
    /** 发送者 QQ 号 */
    user_id: number;
    /** 被戳者 QQ 号 */
    target_id: number;
    /** 群号 */
    group_id?: number;
}

/** 群红包运气王提示 */
interface GroupRedbagLuckyKing extends Data {
    /** 群号 */
    group_id: number;
    /** QQ 号 */
    user_id: number;
    /** 运气王 ID */
    target_id: number;
}

/** 群成员荣誉变更提示 */
interface GroupMemberHonorChange extends Data {
    /** 群号 */
    group_id: number;
    /** 成员 ID */
    user_id: number;
    /** 荣誉类型 */
    honor_type: string;
}

/** 群成员头衔变更 */
interface GroupMemberTitleChange extends Data {
    /** 群号 */
    group_id: number;
    /** 变更头衔的用户 QQ 号 */
    user_id: number;
    /** 获得的新头衔 */
    title: string;
}

/** 群成员名片更新 */
interface GroupCardChange extends Data {
    /** 群号 */
    group_id: number;
    /** 成员 ID  */
    user_id: number;
    /** 新名片 */
    card_new: string;
    /** 旧名片 */
    card_old: string;
}

/** 接收到离线文件 */
interface ReceiveOfflineFile extends Data {
    /** 发送者 ID */
    user_id: number;
    /** 文件数据 */
    file: file;
}

/** 其他客户端在线状态变更 */
interface ClientStatusChange extends Data {
    /** 客户端信息 */
    client: { app_id: number; device_name: string; device_kind: string };
    /** 当前是否在线 */
    online: boolean;
}

/** 精华消息变更 */
interface EssenceMessageChange extends Data {
    /** 事件子类型 添加为add,移出为delete */
    sub_type: "add" | "delete";
    /** 群号 */
    group_id: number;
    /** 消息发送者 ID  */
    sender_id: number;
    /** 操作者 ID */
    operator_id: number;
    /** 消息 ID */
    message_id: number;
}

// request消息
interface Request extends Data {
    /**请求类型 */
    request_type: string;
    /** 发送请求的 QQ 号 */
    user_id: number;
    comment: string;
    /**请求 flag, 在调用处理请求的 API 时需要传入 */
    flag: string;
    sub_type: string;
    /** 群号 */ group_id: number;
}

/** 加好友请求 */
interface AddFriendRequest extends Data {
    /** 发送请求的 QQ 号 */
    user_id: number;
    /** 验证信息 */
    comment: string;
    /** 请求 flag, 在调用处理请求的 API 时需要传入 */
    flag: string;
}

/** 加群请求／邀请 */
interface AddGroupRequest extends Data {
    /** 发送请求的 QQ 号 */
    user_id: number;
    /** 群号 */
    group_id: number;
    /** 验证信息 */
    comment: string;
    /** 请求子类型 */
    sub_type: string;
    /** 请求 flag, 在调用处理请求的 API 时需要传入 */
    flag: string;
}

// meta_event
interface MetaEvent extends Data {
    meta_event_type: string;
    status: Status;
    interval: number;
    sub_type: string;
}

interface Status {
    /** 程序是否初始化完毕 */
    app_initialized: boolean;
    /** 程序是否可用 */
    app_enabled: boolean;
    /** 插件正常(可能为 null) */
    plugins_good: boolean;
    /** 程序正常 */
    app_good: boolean;
    /** 是否在线 */
    online: boolean;
    /** 统计信息 */
    stat: boolean;
}

/** 心跳包 */
interface HeartBeat extends MetaEvent {
    /** 应用程序状态 */
    status: Status;
    /** 距离上一次心跳包的时间(单位是毫秒) */
    interval: number;
}

/** 生命周期 */
interface LifeCycle extends MetaEvent {
    /** 子类型 */
    sub_type: string;
}

// echo
interface Returnecho {
    status: string;
    retcode: number;
    /** 根据响应数据不同可能有不同 */
    data: any;
    uuid: string;
}

declare namespace botEvent {
    /** 收到群聊消息 */
    function listen(
        event: "onReceiveGroupMessage",
        listener: (msg: GroupMessage) => void
    ): any;
    /** 收到私聊消息 */
    function listen(
        event: "onReceivePrivateMessage",
        listener: (msg: PrivateMessage) => void
    ): any;
    /** 私聊消息撤回 */
    function listen(
        Event: "onFriendRecallMsg",
        listener: (msg: PrivateDeleteMsg) => void
    ): any;
    /** 群聊消息撤回 */
    function listen(
        Event: "onGroupRecallMsg",
        listener: (msg: GroupDeleteMsg) => void
    ): any;
    /** 群聊成员增加 */
    function listen(
        Event: "onGroupMemberAdd",
        listener: (msg: GroupMemberAdd) => void
    ): any;
    /** 群聊成员减少 */
    function listen(
        Event: "onGroupMemberDecrease",
        listener: (msg: GroupMemberDecrease) => void
    ): any;
    /** 群聊管理员变动 */
    function listen(
        Event: "onGroupAdminChange",
        listener: (msg: GroupAdminChange) => void
    ): any;
    /** 群聊文件上传 */
    function listen(
        Event: "onGroupfileUpload",
        listener: (msg: GroupFileUpload) => void
    ): any;
    /**群禁言 */
    function listen(
        Event: "onGroupBan",
        listener: (msg: GroupBan) => void
    ): any;
    /**好友添加 */
    function listen(
        Event: "onFriendAdd",
        listener: (msg: FrienAdd) => void
    ): any;
    /**群内戳一戳 */
    function listen(Event: "onGroupPoke", listener: (msg: Notify) => void): any;
    /**好友戳一戳 */
    function listen(
        Event: "onFriendPoke",
        listener: (msg: Notify) => void
    ): any;
    /**加好友请求 */
    function listen(
        Event: "onAddFriendRequest",
        listener: (msg: AddFriendRequest) => void
    ): any;
    /**加群请求/邀请 */
    function listen(
        Event: "onAddGroupRequest",
        listener: (msg: AddGroupRequest) => void
    ): any;
    /**心跳包 */
    function listen(
        Event: "onHeartBeat",
        listener: (msg: HeartBeat) => void
    ): any;
    /**生命周期 */
    function listen(
        Event: "onLifeCycle",
        listener: (msg: GroupFileUpload) => void
    ): any;
    /** 表情回应上报*/
    function listen(
        Event: "onEmojiLike",
        listener: (msg: EmojiLike) => void
    ): any;
}

/** 获取登录号信息 */
export function apiExecute_sync(
    action: "get_login_info",
    params: {},
    echo?: string
): Returnecho;

/** 获取陌生人信息 */
export function apiExecute_sync(
    action: "get_stranger_info",
    params: {
        /**QQ 号 */
        user_id: number;
        /**是否不使用缓存（使用缓存可能更新不及时，但响应更快） */
        no_cache: boolean;
    },
    echo?: string
): Returnecho;

/** 获取好友列表 */
export function apiExecute_sync(
    action: "get_friend_list",
    params: {},
    echo?: string
): Returnecho;

/**获取群信息 */
export function apiExecute_sync(
    action: "get_group_info",
    params: {
        /**群号 */
        group_id: number;
        /**是否不使用缓存（使用缓存可能更新不及时，但响应更快） */
        no_cache: boolean;
    },
    echo?: string
): Returnecho;

/**获取群列表 */
export function apiExecute_sync(
    action: "get_group_list",
    params: {},
    echo?: string
): Returnecho;

/**获取群成员列表 */
export function apiExecute_sync(
    action: "get_group_member_list",
    params: {
        /**群号 */
        group_id: number;
    },
    echo?: string
): Returnecho;

/**获取 Cookies */
export function apiExecute_sync(
    action: "get_cookies",
    params: {
        /**	需要获取 cookies 的域名 */
        domain: string;
    },
    echo?: string
): Returnecho;

/**发送消息 */
export function apiExecute_sync(
    action: "send_msg",
    params: {
        /**要发送的内容 */
        message: string;
        /**消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效 */
        auto_escape: boolean;
        /**消息类型, 支持 private、group , 分别对应私聊、群组, 如不传入, 则根据传入的 *_id 参数判断 */
        message_type?: string;
        /**对方 QQ 号 ( 消息类型为 private 时需要 ) */
        user_id?: number;
        /**群号 ( 消息类型为 group 时需要 ) */
        group_id?: number;
    },
    echo?: string
): Returnecho;

/**
 * 发送群消息
 */
export function apiExecute_sync(
    action: "send_group_msg",
    params: {
        /**群号 */
        group_id: number;
        /**发送的信息 */
        msg: string;
        /** auto_escape*/
        auto_escape: boolean;
    },
    echo?: string
): Returnecho;

/**
 * 发送私聊消息
 */
export function apiExecute_sync(
    action: "send_private_msg",
    params: {
        /**QQ号 */
        user_id: number;
        /** 发送的信息*/
        msg: string;
        /**消息内容是否作为纯文本发送 ( 即不解析 CQ 码 ) , 只在 message 字段是字符串时有效 */
        auto_escape: boolean;
    },
    echo?: string
): Returnecho;

/**
 * 获取消息
 */
export function apiExecute_sync(
    action: "get_msg",
    params: {
        /**消息id */
        message_id: number;
    },
    echo?: string
): Returnecho;

/**
 * 撤回消息
 * 该 API 无响应数据
 */
export function apiExecute_sync(
    action: "delete_msg",
    params: {
        /**消息id */
        message_id: number;
    },
    echo?: string
): Returnecho;

/**
 * 发送好友赞
 */
export function apiExecute_sync(
    action: "send_like",
    params: {
        /**对方 QQ 号 */
        user_id: number;
        /** 赞的次数，每个好友每天最多 10 次*/
        times: string;
    },
    echo?: string
): Returnecho;

/**
 * 获取合并转发消息
 */
export function apiExecute_sync(
    action: "get_forward_msg",
    params: {
        /**合并转发 ID */
        id: string;
    },
    echo?: string
): Returnecho;

/**
 * 群组踢人
 */
export function apiExecute_sync(
    action: "set_group_kick",
    params: {
        /**	群号 */
        group_id: number;
        /** 	要踢的 QQ 号*/
        user_id: number;
        /**拒绝此人的加群请求 默认为false */
        reject_add_request: boolean;
    },
    echo?: string
): Returnecho;

/**
 * 群组单人禁言
 */
export function apiExecute_sync(
    action: "set_group_ban",
    params: {
        /**	群号 */
        group_id: number;
        /** 要禁言的 QQ 号*/
        user_id: string;
        /**禁言时长，单位秒，0 表示取消禁言 */
        duration: boolean;
    },
    echo?: string
): Returnecho;

export function apiExecute_sync(
    action: "set_group_whole_ban",
    params: {
        /**	群号 */
        group_id: number;
        /** 是否禁言*/
        enable: boolean;
    },
    echo?: string
): Returnecho;

/**
 * 群组设置管理员
 */
export function set_group_admin(
    action: "set_group_admin",
    params: {
        /**群号 */
        group_id: number;
        /** 要设置管理员的 QQ 号*/
        user_id: number;
        /**true 为设置，false 为取消 */
        enable: boolean;
    },
    echo?: string
): Returnecho;

/**
 * 设置群名片（群备注）
 */
export function apiExecute_sync(
    action: "set_group_card",
    params: {
        /**群号 */
        group_id: number;
        /** 要设置的 QQ 号*/
        user_id: number;
        /**群名片内容，不填或空字符串表示删除群名片 */
        auto_escape: boolean;
    },
    echo?: string
): Returnecho;

export function apiExecute_sync(
    action: "set_group_name",
    params: {
        /**群号 */
        group_id: number;
        /** 新群名*/
        group_name: string;
    },
    echo?: string
): Returnecho;

/**
 * 退出群组
 */
export function apiExecute_sync(
    action: "set_group_leave",
    params: {
        /**群号 */
        group_id: number;
        /** 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散*/
        is_dismiss: boolean;
    },
    echo?: string
): Returnecho;

/**
 * 处理加好友请求
 */
export function apiExecute_sync(
    action: "set_friend_add_request",
    params: {
        /**加好友请求的 flag（需从上报的数据中获得） */
        flag: string;
        /** 是否同意请求*/
        approve: boolean;
        /**添加后的好友备注（仅在同意时有效） */
        remark: string;
    },
    echo?: string
): Returnecho;

export function apiExecute_sync(
    action: "set_group_add_request",
    params: {
        /**QQ号 */
        flag: string;
        /**add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符） */
        sub_type?: string;
        /**add 或 invite，请求类型（需要和上报消息中的 sub_type 字段相符） */
        type?: string;
        /** 是否同意请求／邀请*/
        approve: boolean;
        /**	拒绝理由（仅在拒绝时有效） */
        reason: string;
    },
    echo?: string
): Returnecho;

/**获取语音 提示：要使用此接口，通常需要安装 ffmpeg，请参考 OneBot 实现的相关说明。*/
export function apiExecute_sync(
    action: "get_record",
    params: {
        /**收到的语音文件名（消息段的 file 参数），如 0B38145AA44505000B38145AA4450500.silk */
        file: string;
        /** 	要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac*/
        out_format: string;
    },
    echo?: string
): Returnecho;

/**获取图片 */
export function apiExecute_sync(
    action: "get_image",
    params: {
        /**收到的图片文件名（消息段的 file 参数），如 6B4DE3DFD1BD271E3297859D41C530F5.jpg */
        file: string;
    },
    echo?: string
): Returnecho;

/**检查是否可以发送图片 */
export function apiExecute_sync(
    action: "can_send_image",
    params: {},
    echo?: string
): Returnecho;

/**检查是否可以发送语音 */
export function apiExecute_sync(
    action: "can_send_record",
    params: {},
    echo?: string
): Returnecho;

/**获取运行状态 */
export function apiExecute_sync(
    action: "get_status",
    params: {},
    echo?: string
): Returnecho;

/**获取版本信息 */
export function apiExecute_sync(
    action: "get_version_info",
    params: {},
    echo?: string
): Returnecho;

/**清理缓存 */
export function apiExecute_sync(
    action: "clean_cache",
    params: {},
    echo?: string
): Returnecho;

/**发送合并转发 ( 好友 ) */
export function apiExecute_sync(
    action: "send_private_forward_msg",
    params: {
        /**好友QQ号 */
        user_id: number;
        /**类型forward node[] 自定义转发消息, 详见https://docs.go-cqhttp.org/cqcode/#%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF%E8%8A%82%E7%82%B9 */
        messages: any;
    },
    echo?: string
): Returnecho;

/**发送合并转发 ( 群聊 ) */
export function apiExecute_sync(
    action: "send_group_forward_msg",
    params: {},
    echo?: string
): Returnecho;

/**获取群消息历史记录 */
export function apiExecute_sync(
    action: "get_group_msg_history",
    params: {
        /**起始消息序号, 可通过 get_msg 获得 */
        message_seq: number;
        /**群号 */
        group_id: number;
    },
    echo?: string
): Returnecho;

/**上传群文件 */
export function apiExecute_sync(
    action: "upload_group_file",
    params: {
        /**群号 */
        group_id: number;
        /**本地文件路径 */
        file: string;
        /**储存名称 */
        name: string;
        /**父目录ID */
        folder: string;
    },
    echo?: string
): Returnecho;

/**设置头像api */
export function apiExecute_sync(
    action: "set_qq_avatar",
    params: {
        /**本地文件路径 */
        file: string;
    },
    echo?: string
): Returnecho;

/**获取已过滤的加群通知 */
export function apiExecute_sync(
    action: "get_group_ignore_add_request",
    params: {},
    echo?: string
): Returnecho;

/**下载文件到缓存目录 详见https://docs.go-cqhttp.org/api/#%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E5%88%B0%E7%BC%93%E5%AD%98%E7%9B%AE%E5%BD%95 */
export function apiExecute_sync(
    action: "download_file",
    params: {
        /**链接地址 */
        url: string;
        /**下载线程数 */
        thread_count: number;
        /**自定义请求头 */
        headers: string | any[];
    },
    echo?: string
): Returnecho;

/**转发单条信息到好友 */
export function apiExecute_sync(
    action: "forward_friend_single_msg",
    params: {
        /**好友QQ号 */
        user_id: number;
        /**消息ID */
        message_id: number;
    },
    echo?: string
): Returnecho;

/**转发单条信息到群 */
export function apiExecute_sync(
    action: "forward_group_single_msg",
    params: {
        /**群号 */
        group_id: number;
        /**消息ID */
        message_id: number;
    },
    echo?: string
): Returnecho;

/** 发送表情回应*/
export function apiExecute_sync(
    action: "set_msg_emoji_like",
    params: {
        /**消息ID */
        message_id: string;
        /** 表情ID　见https://bot.q.qq.com/wiki/develop/api-v2/openapi/emoji/model.html#EmojiType*/
        emoji_id: string;
    },
    echo?: string
): Returnecho;

/**获取带分组好友信息列表 */
export function apiExecute_sync(
    action: "get_friends_with_category",
    params: {},
    echo?: string
): Returnecho;

/**
 * 异步地调用一个API（回调）
 * @param action 欲调用API的名称，可加后缀进行异步调用或限速调用，文档中有写的应该都可调
 * 详见文档： https://llonebot.github.io/zh-CN/develop/api
 * @param params 调用时传入的参数
 * 详见文档：https://llonebot.github.io/zh-CN/develop/api
 *          https://github.com/botuniverse/onebot-11/blob/master/api/public.md
 * @param callback API执行成功之后自动调用的回调函数，原型：
 * (param: { status: "failed"; retcode: 1404; data: null; echo: "123" }) => {};
 * 详见文档： https://github.com/botuniverse/onebot-11/tree/master/api
 * @param echo 用于唯一标识一次请求，若不填会自动生成一个随机数，防止请求回复的结果撞车
 * @returns {APIreturns} API请求结果
 */
export function apiExecute(
    action: string,
    params: any,
    callback: Function,
    echo?: string
): { success: boolean; reason: string | null };
