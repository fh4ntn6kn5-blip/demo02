import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  FolderOpen,
  Folder,
  FileText,
  ChevronRight,
  X,
  Plus,
  Sparkles,
  Zap,
  Send,
  ChevronDown,
} from 'lucide-react'

const sugarOrb = new URL('../../img/downloaded-file.mp4', import.meta.url).href

// 侧边栏树形数据
const treeData = [
  {
    id: '1',
    name: '产品文档',
    type: 'folder',
    expanded: true,
    children: [
      { id: '1-1', name: 'PRD模板.md', type: 'file' },
      { id: '1-2', name: '需求池.md', type: 'file' },
    ],
  },
  {
    id: '2',
    name: '技术方案',
    type: 'folder',
    expanded: true,
    children: [
      { id: '2-1', name: '架构设计.md', type: 'file' },
      { id: '2-2', name: 'API文档.md', type: 'file' },
    ],
  },
  {
    id: '3',
    name: '数据看板',
    type: 'folder',
    expanded: true,
    children: [
      { id: '3-1', name: '知识库方向Q1周报.md', type: 'file', isTarget: true },
      { id: '3-2', name: '指标追踪.md', type: 'file' },
    ],
  },
]

// 打字机内容
const TYPEWRITER_CONTENT = [
  { type: 'h2', text: '数据监控结果' },
  { type: 'hint', text: '（与上周对比，数据来自Sugar平台）' },
  { type: 'p', text: '' },
  { type: 'item', text: '• 本周搭建组件数量：5,993（+1.94%）' },
  { type: 'item', text: '• 本周发布组件数量：4,034（+7.77%）' },
  { type: 'item', text: '• 本周发布组件人数：1,005（+2.34%）' },
  { type: 'item', text: '• 0-1搭建：991（+22.95%）' },
  { type: 'item', text: '• 复用搭建：3,043（+3.61%）' },
  { type: 'p', text: '' },
  { type: 'h2', text: '项目重点进展' },
  { type: 'hint', text: '（数据来自iCafe平台）' },
  { type: 'p', text: '' },
  { type: 'item', text: '• 【已上线】随心搭v2.3版本发布，新增批量编辑功能' },
  { type: 'item', text: '• 【已上线】组件库新增20+高频业务模板' },
  { type: 'item', text: '• 【进行中】性能优化专项，预计下周完成' },
  { type: 'item', text: '• 【规划中】AI辅助搭建能力调研' },
  { type: 'p', text: '' },
  { type: 'h2', text: '用户反馈监控' },
  { type: 'hint', text: '（与上周对比，数据来自客服平台、Family产品论坛、如流核心用户群）' },
  { type: 'p', text: '' },
  { type: 'item', text: '• 本周收集反馈：127条（+15%）' },
  { type: 'item', text: '• 功能建议：45条（35%）- 主要集中在"局部编辑"和"输入框高度"' },
  { type: 'item', text: '• 使用咨询：52条（41%）- 新手上手成本相关' },
  { type: 'item', text: '• Bug反馈：18条（14%）- 已同步技术排期' },
  { type: 'item', text: '• 好评：12条（10%）' },
  { type: 'p', text: '' },
  { type: 'h2', text: '风险判断' },
  { type: 'p', text: '' },
]

// 任务识别内容
const TASK_CONTENT = `数据显示，随心搭"日均点展比"较低，结合用户反馈能看到，大量用户存在上手认知成本，建议优先跟进。@李港

用户反馈显示，20%用户希望增加"局部编辑"能力，可以考虑近期优化。@李港

用户反馈显示，10%用户希望增加输入框高度，建议跟进。@康佳美`

// 月报模板内容
const MONTHLY_REPORT = `<div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:16px;padding:24px;margin-bottom:24px;color:white;">
  <div style="font-size:24px;font-weight:700;margin-bottom:8px;">📊 知识库方向 · 1月月报</div>
  <div style="font-size:14px;opacity:0.9;">2026年1月 · 随心搭项目组</div>
</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
  <div style="background:white;border-radius:12px;padding:16px;border:1px solid #e5e7eb;text-align:center;">
    <div style="font-size:28px;font-weight:700;color:#7C3AED;">5,993</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">本月搭建组件</div>
    <div style="font-size:12px;color:#10b981;">↑ 12.5%</div>
  </div>
  <div style="background:white;border-radius:12px;padding:16px;border:1px solid #e5e7eb;text-align:center;">
    <div style="font-size:28px;font-weight:700;color:#3b82f6;">4,034</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">本月发布组件</div>
    <div style="font-size:12px;color:#10b981;">↑ 8.2%</div>
  </div>
  <div style="background:white;border-radius:12px;padding:16px;border:1px solid #e5e7eb;text-align:center;">
    <div style="font-size:28px;font-weight:700;color:#10b981;">1,005</div>
    <div style="font-size:12px;color:#6b7280;margin-top:4px;">活跃用户数</div>
    <div style="font-size:12px;color:#10b981;">↑ 5.3%</div>
  </div>
</div>
<div style="background:#f3f4f6;border-radius:12px;padding:16px;margin-bottom:24px;">
  <div style="font-size:14px;font-weight:600;color:#374151;margin-bottom:12px;">🎯 本月重点成果</div>
  <div style="font-size:13px;color:#4b5563;line-height:1.8;">
    • 随心搭v2.3版本成功发布，用户好评率提升15%<br/>
    • 组件库扩充至200+，覆盖80%高频业务场景<br/>
    • 新手引导优化，首次使用完成率提升22%
  </div>
</div>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
`

// 树形节点组件
function TreeNode({ node, level = 0, onSelect, selectedName }) {
  const [expanded, setExpanded] = useState(node.expanded ?? false)

  if (node.type === 'file') {
    const isSelected = node.name === selectedName
    return (
      <button
        onClick={() => onSelect?.(node)}
        className={`w-full min-w-0 box-border pr-2 flex items-center gap-2 py-1.5 text-left text-sm rounded-lg transition-colors ${
          isSelected ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-white/70'
        }`}
        style={{ paddingLeft: `${level * 16}px` }}
      >
        <div
          className={`w-6 h-6 rounded-md border shadow-[0_6px_14px_-12px_rgba(0,0,0,0.18)] flex items-center justify-center ${
            isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white/80 border-white/70'
          }`}
        >
          <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />
        </div>
        <span className="truncate flex-1 min-w-0">{node.name}</span>
      </button>
    )
  }

  return (
    <div className="select-none">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full min-w-0 box-border pr-2 flex items-center gap-2 py-1.5 text-left text-sm text-gray-800 hover:bg-white/70 rounded-lg transition-colors"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-100/80 to-blue-200/40 border border-indigo-100/70 shadow-[0_6px_14px_-12px_rgba(0,0,0,0.2)] flex items-center justify-center">
          {expanded ? (
            <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-indigo-600" />
          )}
        </div>
        <ChevronRight
          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
        <span className="truncate flex-1 min-w-0">{node.name}</span>
      </button>
      {expanded && node.children && (
        <div className="mt-0.5">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedName={selectedName}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PageThree() {
  const [selectedDoc, setSelectedDoc] = useState('知识库方向Q1周报.md')
  const [docTitle, setDocTitle] = useState('知识库方向Q1周报')
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showOrb, setShowOrb] = useState(true)
  const [showContextHint, setShowContextHint] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [taskInserted, setTaskInserted] = useState(false)
  const [reportInserted, setReportInserted] = useState(false)
  const [isOrbHover, setIsOrbHover] = useState(false)
  const editorRef = useRef(null)
  const panelScrollRef = useRef(null)
  const riskAnchorRef = useRef(null)
  const typingCompleteRef = useRef(false)

  // 生成初始 HTML 内容
  const generateInitialHTML = useCallback(() => {
    let html = ''
    for (const item of TYPEWRITER_CONTENT) {
      switch (item.type) {
        case 'h2':
          html += `<h2 style="font-size:18px;font-weight:600;color:#111827;margin:16px 0 8px 0;">${item.text}</h2>`
          break
        case 'hint':
          html += `<div style="font-size:12px;color:#9ca3af;margin-bottom:8px;">${item.text}</div>`
          break
        case 'item':
          html += `<div style="font-size:14px;color:#374151;margin:4px 0;padding-left:8px;">${item.text}</div>`
          break
        case 'p':
          html += `<div style="height:8px;"></div>`
          break
      }
    }
    // 添加10个换行
    html += '<br/>'.repeat(10)
    return html
  }, [])

  // 打字机效果
  useEffect(() => {
    if (!isTyping || typewriterIndex >= TYPEWRITER_CONTENT.length) {
      if (typewriterIndex >= TYPEWRITER_CONTENT.length && !typingCompleteRef.current) {
        typingCompleteRef.current = true
        // 设置完整内容并添加换行
        if (editorRef.current) {
          editorRef.current.innerHTML = generateInitialHTML()
        }
        // 内容生成完成后，延迟显示提示条
        setTimeout(() => {
          setShowContextHint(true)
        }, 800)
      }
      return
    }

    const currentItem = TYPEWRITER_CONTENT[typewriterIndex]
    const fullText = currentItem.text

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1)
      }, 15)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setTypewriterIndex((prev) => prev + 1)
        setCharIndex(0)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isTyping, typewriterIndex, charIndex, generateInitialHTML])

  // 更新编辑器内容（打字机阶段）
  useEffect(() => {
    if (typingCompleteRef.current) return
    
    let html = ''
    for (let i = 0; i <= typewriterIndex && i < TYPEWRITER_CONTENT.length; i++) {
      const item = TYPEWRITER_CONTENT[i]
      const text = i === typewriterIndex ? item.text.slice(0, charIndex) : item.text
      const isCurrentLine = i === typewriterIndex && isTyping && typewriterIndex < TYPEWRITER_CONTENT.length

      switch (item.type) {
        case 'h2':
          html += `<h2 style="font-size:18px;font-weight:600;color:#111827;margin:16px 0 8px 0;">${text}${isCurrentLine ? '<span class="typing-cursor"></span>' : ''}</h2>`
          break
        case 'hint':
          html += `<div style="font-size:12px;color:#9ca3af;margin-bottom:8px;">${text}${isCurrentLine ? '<span class="typing-cursor"></span>' : ''}</div>`
          break
        case 'item':
          html += `<div style="font-size:14px;color:#374151;margin:4px 0;padding-left:8px;">${text}${isCurrentLine ? '<span class="typing-cursor"></span>' : ''}</div>`
          break
        case 'p':
          html += `<div style="height:8px;"></div>`
          break
      }
    }
    if (editorRef.current) {
      editorRef.current.innerHTML = html
    }
  }, [typewriterIndex, charIndex, isTyping])

  // 查找"风险判断"锚点
  const findRiskAnchor = useCallback(() => {
    const editor = editorRef.current
    if (!editor) return null
    const candidates = editor.querySelectorAll('h2')
    const anchor = Array.from(candidates).find((node) => (node.textContent || '').includes('风险判断'))
    if (anchor) riskAnchorRef.current = anchor
    return anchor || riskAnchorRef.current
  }, [])

  // 获取光标位置
  const getCaretRect = useCallback((range) => {
    if (!range) return null
    const rects = range.getClientRects()
    if (rects.length > 0) return rects[0]
    const span = document.createElement('span')
    span.textContent = '\u200b'
    range.insertNode(span)
    const rect = span.getBoundingClientRect()
    span.parentNode?.removeChild(span)
    return rect
  }, [])

  // 更新上下文提示
  const updateContextHint = useCallback(
    (range) => {
      const editor = editorRef.current
      if (!editor || !range || !editor.contains(range.startContainer)) {
        return
      }
      const anchor = findRiskAnchor()
      const caretRect = getCaretRect(range)
      if (!anchor || !caretRect) {
        return
      }
      const anchorRect = anchor.getBoundingClientRect()
      const diff = caretRect.top - anchorRect.top
      const isNear = diff >= -10 && diff <= 80

      // 检查当前行输入字数
      let currentLineText = ''
      let node = range.startContainer
      while (node && node !== editor) {
        if (node.nodeType === 1 && ['H2', 'DIV', 'P', 'LI'].includes(node.tagName)) {
          currentLineText = (node.textContent || '').trim()
          break
        }
        node = node.parentNode
      }
      if (!currentLineText && range.startContainer.nodeType === 3) {
        currentLineText = (range.startContainer.textContent || '').trim()
      }

      const hasEnoughInput = currentLineText.length >= 10

      if (isNear && hasEnoughInput) {
        setShowContextHint(true)
      } else if (!isNear) {
        setShowContextHint(false)
      }
    },
    [findRiskAnchor, getCaretRect]
  )

  // 捕获选区
  const captureSelection = useCallback(() => {
    const editor = editorRef.current
    if (!editor || !typingCompleteRef.current) return
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    const range = selection.getRangeAt(0)
    if (!editor.contains(range.startContainer)) return
    updateContextHint(range)
  }, [updateContextHint])

  // 编辑器输入处理
  const handleEditorInput = useCallback(() => {
    captureSelection()
  }, [captureSelection])

  // 插入任务识别 - 在风险判断下方插入并滚动到该位置
  const handleInsertTask = () => {
    const taskHtml = `
      <div id="task-inserted" style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;border-radius:8px;margin:16px 0;">
        <div style="font-size:14px;font-weight:600;color:#92400e;margin-bottom:12px;">⚠️ 风险识别与待办</div>
        <div style="font-size:13px;color:#78350f;line-height:1.8;white-space:pre-wrap;">${TASK_CONTENT.replace(/@(\S+)/g, '<span style="color:#3377ff;font-weight:500;">@$1</span>')}</div>
      </div>
    `
    if (editorRef.current) {
      // 查找风险判断标题
      const riskHeader = findRiskAnchor()
      if (riskHeader) {
        // 在风险判断后插入
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = taskHtml
        const taskElement = tempDiv.firstElementChild
        riskHeader.parentNode?.insertBefore(taskElement, riskHeader.nextSibling)
        // 滚动到插入的内容
        setTimeout(() => {
          const inserted = document.getElementById('task-inserted')
          if (inserted) {
            inserted.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      } else {
        // 如果找不到风险判断，就追加到末尾
        editorRef.current.innerHTML += taskHtml
      }
    }
    setTaskInserted(true)
  }

  // 插入月报 - 插入到顶部，关闭侧边栏并滚动到顶部
  const handleInsertReport = () => {
    if (editorRef.current) {
      const reportHtml = `<div id="report-inserted">${MONTHLY_REPORT}</div>`
      editorRef.current.innerHTML = reportHtml + editorRef.current.innerHTML
    }
    setReportInserted(true)
    setPanelOpen(false)
    // 滚动到顶部
    setTimeout(() => {
      const inserted = document.getElementById('report-inserted')
      if (inserted) {
        inserted.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#F6F7FB]">
      {/* 背景渐变 - demo01 样式 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_15%_10%,rgba(99,102,241,0.11),transparent_60%),radial-gradient(50%_60%_at_85%_15%,rgba(236,72,153,0.10),transparent_60%),radial-gradient(55%_70%_at_80%_85%,rgba(56,189,248,0.09),transparent_65%)]" />

      {/* 侧边栏 - demo01 样式 */}
      <aside className="w-[200px] h-screen shrink-0 bg-transparent relative z-10">
        <div className="h-full overflow-y-auto py-5 px-4">
          <div className="text-xs text-gray-500">知识库</div>
          <div className="text-lg font-semibold text-gray-900 mt-1">知识库小组</div>

          <div className="mt-5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 border border-white/60">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索项目或文档..."
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-medium text-gray-500 mb-2">项目目录</div>
            <div className="space-y-1">
              {treeData.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  onSelect={(n) => setSelectedDoc(n.name)}
                  selectedName={selectedDoc}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区 - demo01 样式 */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10">
        {/* 面包屑导航 */}
        <div className="px-[clamp(20px,3vw,56px)] pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <button className="hover:text-gray-800 transition-colors">知识库</button>
            <span>/</span>
            <button className="hover:text-gray-800 transition-colors">数据看板</button>
            <span>/</span>
            <span className="text-gray-800 font-medium">{docTitle}</span>
          </nav>
        </div>

        {/* 标题 */}
        <div className="px-[clamp(20px,3vw,56px)] pt-2 pb-6">
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="w-full text-3xl font-semibold text-gray-900 placeholder:text-gray-300 border-none outline-none bg-transparent"
            placeholder="无标题"
          />
        </div>

        {/* 编辑器卡片 - demo01 样式 */}
        <div className="flex-1 px-[clamp(20px,3vw,56px)] pb-8 overflow-y-auto">
          <div className="max-w-none w-full h-full">
            <div className="relative h-full min-h-[calc(100vh-210px)] bg-white/65 backdrop-blur-2xl rounded-3xl shadow-[0_24px_60px_-40px_rgba(17,24,39,0.32)] border border-white/50 px-10 pt-5 pb-0 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-0 hide-scrollbar">
                <div className="relative min-h-[360px]">
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleEditorInput}
                    onClick={captureSelection}
                    onKeyUp={captureSelection}
                    className="min-h-[360px] outline-none text-gray-700 leading-relaxed text-[15px] relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右上角浮动小球 - 默认状态 */}
        <AnimatePresence>
          {showOrb && !showContextHint && !panelOpen && !reportInserted && (
            <motion.div
              key="orb-only"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-6 right-8 z-40"
            >
              <div className="relative">
                <button
                  onMouseEnter={() => setIsOrbHover(true)}
                  onMouseLeave={() => setIsOrbHover(false)}
                  className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/70 shadow-[0_10px_22px_-12px_rgba(15,23,42,0.55)] orb-float"
                >
                  <video
                    src={sugarOrb}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </button>
                {/* Hover tooltip - demo01 style */}
                <AnimatePresence>
                  {isOrbHover && (
                    <motion.div
                      key="orb-tip"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 px-3 py-2 rounded-lg bg-white/95 border border-white/80 shadow-[0_12px_26px_-20px_rgba(15,23,42,0.45)] text-xs text-gray-600 whitespace-nowrap pointer-events-none"
                    >
                      检测到你在编辑周报，即将为你推荐相关资料。
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 右上角完整提示条 - 触发后 */}
        <AnimatePresence>
          {showOrb && showContextHint && !panelOpen && !reportInserted && (
            <motion.div
              key="context-hint"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="fixed top-6 right-8 z-40"
            >
              <button
                onClick={() => setPanelOpen(true)}
                className="relative flex items-center rounded-full transition-all duration-300 ease-out hint-glow"
              >
                <div className="hint-glow-inner flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur border border-white/90 shadow-[0_12px_30px_-18px_rgba(17,24,39,0.5)] text-sm text-gray-700">
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/70 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.5)]">
                    <video
                      src={sugarOrb}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <span className="text-gray-700">已为你判断当前的项目风险,请查看确认</span>
                  <span className="font-semibold" style={{ color: '#6366f1' }}>查看</span>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 右侧面板 - demo01 样式 */}
        <AnimatePresence>
          {panelOpen && (
            <motion.aside
              key="context-panel"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="fixed right-0 top-0 h-screen w-[400px] z-40 bg-white/40 backdrop-blur-[30px] border-l border-white/60 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.4)] overflow-hidden flex flex-col"
            >
              {/* 流动渐变背景 */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -inset-[35%] panel-flow bg-[radial-gradient(40%_40%_at_15%_20%,rgba(99,102,241,0.2),transparent_60%),radial-gradient(35%_35%_at_80%_10%,rgba(236,72,153,0.18),transparent_60%),radial-gradient(45%_45%_at_70%_80%,rgba(56,189,248,0.15),transparent_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/20" />
              </div>

              {/* 头部 */}
              <div className="relative sticky top-0 z-10 flex items-center justify-between px-5 pt-5 pb-3 bg-white/60 backdrop-blur-[28px] border-b border-white/60">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">智能创作</span>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 内容 */}
              <div ref={panelScrollRef} className="flex-1 overflow-y-auto relative px-5 pb-6 pt-4">
                {/* 任务识别卡片 */}
                {!taskInserted && (
                  <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.4)] mb-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">⚠️ 风险识别</div>
                    <div className="text-xs text-gray-500 mb-3">已基于"随心搭"风险判断，推荐待办，请确认：</div>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {TASK_CONTENT.split('\n').map((line, i) => (
                        <div key={i} className="mb-2">
                          {line.split(/(@\S+)/g).map((part, j) =>
                            part.startsWith('@') ? (
                              <span key={j} className="font-medium" style={{ color: '#3377ff' }}>{part}</span>
                            ) : (
                              <span key={j}>{part}</span>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={handleInsertTask}
                        className="px-3 py-1.5 text-xs rounded-full text-white transition-colors" style={{ backgroundColor: '#6366f1' }}
                      >
                        置入周报
                      </button>
                      <button className="px-3 py-1.5 text-xs rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                        编辑
                      </button>
                      <button className="px-3 py-1.5 text-xs rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
                        丢弃
                      </button>
                    </div>
                  </div>
                )}

                {taskInserted && (
                  <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4 mb-4">
                    <div className="text-sm text-green-700 flex items-center gap-2">
                      <span>✓</span>
                      <span>任务识别已置入周报</span>
                    </div>
                  </div>
                )}

                {/* 格式转化卡片 */}
                <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.4)]">
                  <div className="text-sm font-semibold text-gray-900 mb-2">🔄 格式转化</div>
                  <div className="text-xs text-gray-500 mb-3">选择模板将内容转化为其他格式：</div>
                  <div className="space-y-2">
                    {/* 月报演示文档 */}
                    <button
                      onClick={handleInsertReport}
                      disabled={reportInserted}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all group flex items-center gap-3 ${
                        reportInserted
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100/60 hover:border-indigo-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${reportInserted ? 'bg-green-100' : 'bg-indigo-100'}`}>
                        <FileText className={`w-4 h-4 ${reportInserted ? 'text-green-600' : 'text-indigo-600'}`} />
                      </div>
                      <span className={`text-sm transition-colors ${
                        reportInserted ? 'text-green-700' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {reportInserted ? '✓ 月报已生成' : '形成月报演示文档'}
                      </span>
                    </button>
                    
                    {/* OKR简报 */}
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-50/60 hover:bg-blue-50 border border-blue-100/60 hover:border-blue-200 transition-all group flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">对应到上级OKR形成简报</span>
                    </button>
                    
                    {/* 需求规划 */}
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-amber-50/60 hover:bg-amber-50 border border-amber-100/60 hover:border-amber-200 transition-all group flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">结合数据和用户反馈形成需求规划</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 底部输入框 */}
              <div className="shrink-0 px-4 pb-4 pt-2 border-t border-white/50 bg-white/50 backdrop-blur-md relative">
                <div className="rounded-xl bg-white/90 border border-gray-200/80 px-3 py-3 shadow-sm">
                  <input
                    type="text"
                    placeholder="输入你的问题..."
                    className="w-full text-sm bg-transparent outline-none placeholder:text-gray-300 mb-3"
                  />
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-gray-500">
                      <Plus size={16} />
                    </button>
                    <div className="h-4 w-px bg-gray-200" />
                    <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-gray-100 transition-colors text-xs text-gray-600">
                      <Sparkles size={12} className="text-indigo-500" />
                      <span>GPT-4o</span>
                      <ChevronDown size={10} />
                    </button>
                    <button className="flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-gray-100 transition-colors text-xs text-gray-600">
                      <Zap size={12} className="text-amber-500" />
                      <span>能力</span>
                      <ChevronDown size={10} />
                    </button>
                    <div className="flex-1" />
                    <button className="w-6 h-6 flex items-center justify-center rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
