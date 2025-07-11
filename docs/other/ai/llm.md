# 14.2 LLM(大模型)

## 14.2.1 大模式设置

- **Temperature**：   
> 简单来说，`Temperature` 的参数值越小，模型就会返回越确定的一个结果。如果调高该参数值，大语言模型可能会返回更随机的结果，也就是说这可能会带来更多样化或更具创造性的产出。调小`Temperature`实质上，你是在增加其他可能的 `Token` 的权重。

> 在实际应用方面，对于质量保障（QA）等任务，我们可以设置更低的 `Temperature` 值，以促使模型基于事实返回更真实和简洁的结果。 对于诗歌生成或其他创造性任务，适度地调高 `Temperature` 参数值可能会更好。

> `Temperature`的范围建议
>> `0.1 ~ 0.3`：知识回答、技术文档生成、法律文书撰写    
>> `0.4 ~ 0.7`：故事续写、文章摘要生成、对话等    
>> `0.8 ~ 1.0`：诗歌科幻小说等创意写作、搞笑内容、文案广告创作    

- **Top_p**：   
> 同样，使用 `Top_p`（与 `Temperature` 一起称为核采样（nucleus sampling）的技术），可以用来控制模型返回结果的确定性。如果你需要准确和事实的答案，就把参数值调低。如果你在寻找更多样化的响应，可以将其值调高点。    

> 使用`Top_p`意味着只有词元集合（`Tokens`）中包含`Top_p`概率质量的才会被考虑用于响应，因此较低的`Top_p`值会选择最有信心的响应。这意味着较高的`Top_p`值将使模型考虑更多可能的词语，包括不太可能的词语，从而导致更多样化的输出。    

> 一般建议是改变 `Temperature` 和 `Top_p` 其中一个参数就行，不用两个都调整。

> `Top_p`的范围建议
>> `0.6 ~ 0.8`：技术学术文档或法律条文，需要高度的准确性和专业性    
>> `0.8 ~ 0.95`：新闻写作或日常对话，兼顾语言的流畅性和一定的可读性，又具有一定的灵活性和多样性   
>> `0.95 ~ 0.99`：创意写作或广告营销文案     

- **Max Length**：
> 您可以通过调整 `max length` 来控制大模型生成的 `Token` 数。指定 `Max Length` 有助于防止大模型生成冗长或不相关的响应并控制成本。

- **Stop Sequences**：
> `Stop Sequences` 是一个字符串，可以阻止模型生成 `Token`，指定 `Stop Sequences` 是控制大模型响应长度和结构的另一种方法。例如，您可以通过添加 “11” 作为 `Stop Sequences` 来告诉模型生成不超过 10 个项的列表。

- **Frequency Penalty**：
> `Frequency Penalty` 是对下一个生成的 `Token` 进行惩罚，这个惩罚和 `Token` 在响应和提示中已出现的次数成比例， `Frequency Penalty` 越高，某个词再次出现的可能性就越小，这个设置通过给重复数量多的 `Token` 设置更高的惩罚来减少响应中单词的重复。

- **Presence Penalty**
> `Presence Penalty` 也是对重复的 `Token` 施加惩罚，但与 `Frequency Penalty` 不同的是，惩罚对于所有重复 `Token` 都是相同的。出现两次的 `Token` 和出现 10 次的 `Token` 会受到相同的惩罚。 此设置可防止模型在响应中过于频繁地生成重复的词。 如果您希望模型生成多样化或创造性的文本，您可以设置更高的 `Presence Penalty`，如果您希望模型生成更专注的内容，您可以设置更低的 `Presence Penalty`。

> 与 `Temperature` 和 `Top_p` 一样，一般建议是改变 `Frequency Penalty` 和 `Presence Penalty` 其中一个参数就行，不要同时调整两个。