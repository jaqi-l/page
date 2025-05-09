# 14.4 MCP（模型上下文协议）
MCP 就像 AI 应用的 USB-C 接口       

正如 USB-C 为设备连接各种配件提供了标准化方案，MCP 也将 AI 应用连接到不同数据源和工具的方式标准化了     
![docker](/mcp-1.png)  

## 14.4.1 MCP 的核心组件：
![!docker](/mcp-2.webp)
- **Host**：代表任何提供 AI 交互环境、访问外部工具和数据源并运行 MCP Client 的 AI 应用（如 Claude 桌面版、Cursor）      
- **Client**：在 Host 内运行，实现与 MCP Servers 的通信     
![!docker](/mcp-3.webp)
- **Server**：对外开放特定能力，并提供对数据源的访问权限：       
> - **Tools**：使大语言模型能够通过你的 Server 执行操作     
> - **Resources**：将 Server 上的数据和内容开放给大语言模型     
> - **Prompts**：创建可复用的提示词模板和工作流程       

![!docker](/mcp-4.webp) 

## 14.4.2 Server 与 Client 的通信流程

- 1. 能力交换(Capability Exchange)
    - 1. Client 向 Server 发送请求，询问其可用的能力（Tools、Resources 和 Prompts）      
    - 2. Server 返回其能力列表，Client 选择要使用的能力并发送请求
- 2. 客户端确认连接成功，然后继续交换消息       