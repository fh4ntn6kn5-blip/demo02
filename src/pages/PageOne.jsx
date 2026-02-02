import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, ChevronDown, Sparkles, Zap, Send, Layers, Globe, Shield, Bot,
  MessageSquare, GitBranch, BookOpen, Video, FileText, Calendar, Phone, Bookmark, Mail, MoreHorizontal, Search
} from 'lucide-react'

const sugarOrb = new URL('../../img/downloaded-file.mp4', import.meta.url).href
const headAvatar = new URL('../../img/head.jpg', import.meta.url).href

// 超级助理图标
const iconSuperAssistant = new URL('../../img/超级助理.png', import.meta.url).href

// 侧边栏图标
const iconMessage = new URL('../../img/消息.svg', import.meta.url).href
const iconWorkflow = new URL('../../img/工作流.svg', import.meta.url).href
const iconKnowledge = new URL('../../img/知识.svg', import.meta.url).href
const iconMeeting = new URL('../../img/会议.svg', import.meta.url).href
const iconDocument = new URL('../../img/文档.svg', import.meta.url).href

// 左侧边栏菜单
const SIDEBAR_MENU = [
  { id: 'message', name: '消息', iconUrl: iconMessage },
  { id: 'workflow', name: '工作流', iconUrl: iconWorkflow },
  { id: 'knowledge', name: '知识', iconUrl: iconKnowledge },
  { id: 'meeting', name: '会议', iconUrl: iconMeeting },
  { id: 'document', name: '文档', iconUrl: iconDocument, active: true },
]

const SIDEBAR_BOTTOM = [
  { id: 'calendar', icon: Calendar },
  { id: 'phone', icon: Phone },
  { id: 'bookmark', icon: Bookmark },
  { id: 'mail', icon: Mail },
  { id: 'more', icon: MoreHorizontal },
]

const PROJECTS = [
  { id: 'suixinda', name: '随心搭', icon: Layers, color: 'bg-purple-100 text-purple-600' },
  { id: 'knowledge', name: '对外知识库', icon: Globe, color: 'bg-blue-100 text-blue-600' },
  { id: 'permission', name: '权限开放', icon: Shield, color: 'bg-green-100 text-green-600' },
  { id: 'webrpa', name: 'WebRPA', icon: Bot, color: 'bg-orange-100 text-orange-600' },
]

const TEMPLATES = [
  { id: 't1', name: '收集各平台相关数据总结周报', desc: '自动汇总Sugar、iCafe等平台数据', iconColor: 'text-blue-500', iconBg: 'bg-blue-50', iconType: 'chart' },
  { id: 't2', name: '结合数据和反馈整理需求', desc: '基于数据趋势和用户声音规划迭代', iconColor: 'text-violet-500', iconBg: 'bg-violet-50', iconType: 'doc' },
  { id: 't3', name: 'Sugar数据分析', desc: '深度分析搭建量、发布量等核心指标', iconColor: 'text-orange-500', iconBg: 'bg-orange-50', iconType: 'analytics' },
  { id: 't4', name: '各渠道用户反馈总结', desc: '汇总客服、论坛、用户群反馈', iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', iconType: 'feedback' },
  { id: 't5', name: '本月项目月会材料总结', desc: '整理项目进展、风险、下月计划', iconColor: 'text-rose-500', iconBg: 'bg-rose-50', iconType: 'calendar' },
  { id: 't6', name: '本周项目相关文档汇总', desc: '汇总PRD、技术方案、会议纪要', iconColor: 'text-indigo-500', iconBg: 'bg-indigo-50', iconType: 'folder' },
]

const TEMPLATE_PROMPTS = {
  t1: `请基于"随心搭"项目，帮我在知识库方向Q1周报里，总结本周内容。包含：数据监控：总结Sugar平台本周数据、累计数据，并与上周形成对比；项目重点进展：总结iCafe平台相关项目上线情况、本周进展；用户反馈监控：总结客服平台、Family产品论坛、如流核心用户群所有用户反馈，并进行分类和图表展示；风险判断：结合数据监控和用户反馈识别高优问题，结合iCafe平台信息判断项目进展风险；任务识别：请基于风险判断和iCafe平台项目进展，@项目组相关同学关注和跟进。`,
  t2: `请基于"随心搭"项目，结合Sugar数据监控和用户反馈，帮我撰写产品需求规划文档。`,
  t3: `请帮我分析Sugar平台"随心搭"项目的核心数据指标，包括DAU、搭建数量、发布数量等。`,
  t4: `请帮我汇总"随心搭"项目在各渠道的用户反馈，包括客服平台、Family产品论坛、如流核心用户群。`,
  t5: `请帮我整理"随心搭"项目本月项目月会所需材料，包括项目进展、数据表现、风险项等。`,
  t6: `请帮我汇总本周与"随心搭"项目相关的所有文档，包括PRD、技术方案、会议纪要等。`,
}

export default function PageOne() {
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const handleProjectClick = (project) => {
    setSelectedProject(selectedProject?.id === project.id ? null : project)
    setSelectedTemplate(null)
    setInputValue('')
  }

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template)
    setInputValue(TEMPLATE_PROMPTS[template.id] || '')
  }

  const handleSend = () => {
    console.log('Send clicked!')
    // 直接使用 window.location 导航
    window.location.href = '/processing'
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#F6F7FB]">
      {/* 顶部导航栏 - 通栏 */}
      <header className="h-12 shrink-0 flex items-center px-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative z-20">
        {/* 搜索框 + 操作按钮 */}
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索 (command + F)"
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 rounded-full border border-gray-200/60 outline-none placeholder:text-gray-400 focus:border-blue-300 focus:bg-white transition-colors"
            />
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <Plus size={18} />
          </button>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <img src={iconSuperAssistant} alt="超级助理" className="w-5 h-5 object-contain" />
              <span className="text-sm text-gray-600">超级助理</span>
            </div>
        </div>
      </header>

      {/* 下方内容区：侧边栏 + 主内容 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧边栏 */}
        <aside className="w-[68px] shrink-0 bg-[#EBEFF5] flex flex-col items-center py-4 border-r border-gray-200/60">
          {/* 头像 */}
          <div className="relative mb-5">
            <img 
              src={headAvatar} 
              alt="头像" 
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-[#EBEFF5]" />
          </div>
          
          {/* 主菜单 */}
          <div className="flex-1 flex flex-col items-center gap-0.5 w-full px-2">
            {SIDEBAR_MENU.map((item) => (
              <button
                key={item.id}
                className="w-full py-2.5 flex flex-col items-center justify-center rounded-lg transition-all"
              >
                <img 
                  src={item.iconUrl} 
                  alt={item.name} 
                  className="w-[26px] h-[26px]"
                  style={item.active ? { filter: 'brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(1234%) hue-rotate(201deg) brightness(97%) contrast(101%)' } : {}}
                />
                <span 
                  className="text-[10px] mt-0.5 font-medium"
                  style={{ color: item.active ? '#3377ff' : '#9ca3af' }}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
          
          {/* 底部图标 */}
          <div className="flex flex-col items-center gap-1 pt-3 border-t border-gray-200/60 w-full px-2">
            {SIDEBAR_BOTTOM.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full py-2.5 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </button>
              )
            })}
          </div>
        </aside>

        {/* 主内容区 */}
        <div className="flex-1 overflow-auto relative">
          {/* 背景渐变 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-radial from-purple-200/40 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-[10%] right-[-15%] w-[50%] h-[50%] bg-gradient-radial from-blue-200/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-gradient-radial from-pink-200/30 to-transparent rounded-full blur-3xl" />
          </div>

          {/* 居中内容 */}
          <div className="min-h-full flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Logo 区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg mb-4">
            <video
              src={sugarOrb}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">智能创作</h1>
          <p className="text-sm text-gray-500 mt-1">让工作更高效</p>
        </motion.div>

        {/* 输入框区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] px-4 pt-4 pb-2.5">
            {/* 输入框 */}
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="我已经熟悉了你的工作习惯,下方选择项目快速帮你完成工作"
              className="w-full min-h-[50px] max-h-[200px] text-sm bg-transparent outline-none resize-none placeholder:text-gray-400 text-gray-700 leading-relaxed mb-0"
            />
            
            {/* 工具栏 */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                <Plus size={18} />
              </button>
              <div className="h-5 w-px bg-gray-200" />
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600">
                <Sparkles size={14} className="text-accent-purple" />
                <span>GPT-4o</span>
                <ChevronDown size={12} />
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600">
                <Zap size={14} className="text-amber-500" />
                <span>能力</span>
                <ChevronDown size={12} />
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => {
                  console.log('Button clicked directly')
                  window.location.href = '/processing'
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors bg-accent-purple text-white hover:bg-accent-purple-dark cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 项目推荐 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl mt-8"
        >
          <div className="text-sm font-medium text-gray-500 mb-3">你的项目</div>
          <div className="flex flex-wrap gap-3">
            {PROJECTS.map((project) => {
              const Icon = project.icon
              const isSelected = selectedProject?.id === project.id
              return (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-accent-purple text-white shadow-lg shadow-purple-200'
                      : 'bg-white/70 hover:bg-white text-gray-700 border border-white/60 shadow-sm'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{project.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* 模板列表 */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mt-4 overflow-visible"
            >
              <div className="grid grid-cols-3 gap-3 p-1">
                {TEMPLATES.map((template) => {
                  const isSelected = selectedTemplate?.id === template.id
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateClick(template)}
                      className={`relative bg-white rounded-2xl p-4 text-left transition-all hover:shadow-lg ${
                        isSelected
                          ? 'shadow-lg bg-gray-50'
                          : 'shadow-sm hover:shadow-md'
                      }`}
                    >
                      {/* 图标 */}
                      <div className={`w-9 h-9 ${template.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                        <svg className={`w-5 h-5 ${template.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {template.iconType === 'chart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                          {template.iconType === 'doc' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                          {template.iconType === 'analytics' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />}
                          {template.iconType === 'feedback' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />}
                          {template.iconType === 'calendar' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                          {template.iconType === 'folder' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />}
                        </svg>
                      </div>
                      
                      {/* 标题 */}
                      <h3 className="text-[13px] font-medium text-gray-900 leading-snug mb-1.5">
                        {template.name}
                      </h3>
                      
                      {/* 描述 */}
                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                        {template.desc}
                      </p>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
