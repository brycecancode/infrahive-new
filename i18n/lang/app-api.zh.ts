const translation = {
    apiServer: "API 服务器",
    apiKey: "API 密钥",
    status: "状态",
    disabled: "已停用",
    ok: "运行中",
    copy: "复制",
    copied: "已复制",
    never: "从未",
    apiKeyModal: {
        apiSecretKey: "API 密钥",
        apiSecretKeyTips: "如果不想你的应用 API 被滥用，请保护好你的 API Key :) 最佳实践是避免在前端代码中明文引用。",
        createNewSecretKey: "创建密钥",
        secretKey: "密钥",
        created: "创建时间",
        lastUsed: "最后使用",
        generateTips: "请将此密钥保存在安全且可访问的地方。"
    },
    actionMsg: {
        deleteConfirmTitle: "删除此密钥？",
        deleteConfirmTips: "删除密钥无法撤销，正在使用中的应用会受影响。",
        ok: "好的"
    },
    completionMode: {
        title: "文本生成型应用 API",
        info: "可用于生成高质量文本的应用，例如生成文章、摘要、翻译等，通过调用 completion-messages 接口，发送用户输入得到生成文本结果。用于生成文本的模型参数和提示词模版取决于开发者在 InfraHive 提示词编排页的设置。",
        createCompletionApi: "创建文本补全消息",
        createCompletionApiTip: "创建文本补全消息，支持一问一答模式。",
        inputsTips: "（选填）以键值对方式提供用户输入字段，与提示词编排中的变量对应。Key 为变量名称，Value 是参数值。如果字段类型为 Select，传入的 Value 需为预设选项之一。",
        queryTips: "用户输入的文本正文。",
        blocking: "blocking 阻塞型，等待执行完毕后返回结果。（请求若流程较长可能会被中断）",
        streaming: "streaming 流式返回。基于 SSE（**[Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)**）实现流式返回。",
        messageFeedbackApi: "消息反馈（点赞）",
        messageFeedbackApiTip: "代表最终用户对返回消息进行评价，可以点赞与点踩，该数据将在“日志与标注”页中可见，并用于后续的模型微调。",
        messageIDTip: "消息 ID",
        ratingTip: "like 或 dislike， 空值为撤销",
        parametersApi: "获取应用配置信息",
        parametersApiTip: "获取已配置的 Input 参数，包括变量名、字段名称、类型与默认值。通常用于客户端加载后显示这些字段的表单或填入默认值。"
    },
    chatMode: {
        title: "对话型应用 API",
        info: "可用于大部分场景的对话型应用，采用一问一答模式与用户持续对话。要开始一个对话请调用 chat-messages 接口，通过继续传入返回的 conversation_id 可持续保持该会话。",
        createChatApi: "发送对话消息",
        createChatApiTip: "创建会话消息，或基于此前的对话继续发送消息。",
        inputsTips: "（选填）以键值对方式提供用户输入字段，与提示词编排中的变量对应。Key 为变量名称，Value 是参数值。如果字段类型为 Select，传入的 Value 需为预设选项之一。",
        queryTips: " 用户输入/提问内容",
        blocking: "blocking 阻塞型，等待执行完毕后返回结果。（请求若流程较长可能会被中断）",
        streaming: "streaming 流式返回。基于 SSE（**[Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)**）实现流式返回。",
        conversationIdTip: "（选填）会话标识符，首次对话可为空，如果要继续对话请传入上下文返回的 conversation_id",
        messageFeedbackApi: "消息反馈（点赞）",
        messageFeedbackApiTip: "代表最终用户对返回消息进行评价，可以点赞与点踩，该数据将在“日志与标注”页中可见，并用于后续的模型微调。",
        messageIDTip: "消息 ID",
        ratingTip: "like 或 dislike， 空值为撤销",
        chatMsgHistoryApi: "获取会话历史消息",
        chatMsgHistoryApiTip: "滚动加载形式返回历史聊天记录，第一页返回最新 `limit` 条，即：倒序返回。",
        chatMsgHistoryConversationIdTip: "会话 ID",
        chatMsgHistoryFirstId: "当前页第一条聊天记录的 ID，默认 none",
        chatMsgHistoryLimit: "一次请求返回多少条聊天记录",
        conversationsListApi: "获取会话列表",
        conversationsListApiTip: "获取当前用户的会话列表，默认返回最近的 20 条。",
        conversationsListFirstIdTip: " 当前页最前面一条记录的 ID，默认 none",
        conversationsListLimitTip: "一次请求返回多少条记录",
        conversationRenamingApi: "会话重命名",
        conversationRenamingApiTip: "对会话进行重命名，会话名称用于显示在支持多会话的客户端上。",
        conversationRenamingNameTip: "新的名称",
        parametersApi: "获取应用配置信息",
        parametersApiTip: "获取已配置的 Input 参数，包括变量名、字段名称、类型与默认值。通常用于客户端加载后显示这些字段的表单或填入默认值。"
    },
    develop: {
        requestBody: "Request Body",
        pathParams: "Path Params",
        query: "Query"
    }
}

export default translation
