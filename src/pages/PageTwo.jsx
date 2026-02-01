import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Plus, Search, MessageSquare, GitBranch, BookOpen, Video, FileText, Calendar, Phone, Bookmark, Mail, MoreHorizontal } from 'lucide-react'

const sugarOrb = new URL('../../img/downloaded-file.mp4', import.meta.url).href
const headAvatar = new URL('../../img/head.jpg', import.meta.url).href
const iconSuperAssistant = new URL('../../img/超级助理.png', import.meta.url).href

// 侧边栏图标
const iconMessage = new URL('../../img/消息.svg', import.meta.url).href
const iconWorkflow = new URL('../../img/工作流.svg', import.meta.url).href
const iconKnowledge = new URL('../../img/知识.svg', import.meta.url).href
const iconMeeting = new URL('../../img/会议.svg', import.meta.url).href
const iconDocument = new URL('../../img/文档.svg', import.meta.url).href

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

const LOADING_STEPS = [
  { id: 1, text: '开始收集"随心搭"项目本周信息', duration: 2000 },
  { id: 2, text: '正在总结Sugar数据', duration: 2500 },
  { id: 3, text: '正在总结iCafe项目进展', duration: 2000 },
  { id: 4, text: '正在总结客服平台、Family产品论坛、如流核心用户群所有用户反馈', duration: 3000 },
]

export default function PageTwo() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [showRedirect, setShowRedirect] = useState(false)

  useEffect(() => {
    let timer

    const runStep = (stepIndex) => {
      if (stepIndex >= LOADING_STEPS.length) {
        setShowRedirect(true)
        timer = setTimeout(() => {
          navigate('/editor')
        }, 5000)
        return
      }

      setCurrentStep(stepIndex)
      
      timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, stepIndex])
        runStep(stepIndex + 1)
      }, LOADING_STEPS[stepIndex].duration)
    }

    timer = setTimeout(() => runStep(0), 500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#F6F7FB]">
      {/* 顶部导航栏 */}
      <header className="h-12 shrink-0 flex items-center px-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] relative z-20">
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

      {/* 下方内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧边栏 */}
        <aside className="w-[68px] shrink-0 bg-[#EBEFF5] flex flex-col items-center py-4 border-r border-gray-200/60">
          <div className="relative mb-5">
            <img 
              src={headAvatar} 
              alt="头像" 
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-[#EBEFF5]" />
          </div>
          
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
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl mb-4">
                <video
                  src={sugarOrb}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Sugar 正在为你处理</h1>
            </motion.div>

            {/* 步骤列表 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-lg"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] p-6">
                <div className="space-y-4">
                  {LOADING_STEPS.map((step, index) => {
                    const isCompleted = completedSteps.includes(index)
                    const isCurrent = currentStep === index && !isCompleted
                    const isPending = index > currentStep

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start gap-3 ${isPending ? 'opacity-40' : ''}`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-accent-purple text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <Check size={14} />
                          ) : isCurrent ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className={`text-sm ${
                            isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {step.text}
                            {isCurrent && (
                              <span className="inline-flex ml-1">
                                <span className="loading-dot">.</span>
                                <span className="loading-dot">.</span>
                                <span className="loading-dot">.</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* 跳转提示 */}
                <AnimatePresence>
                  {showRedirect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 pt-6 border-t border-gray-100"
                    >
                      <div className="flex items-center gap-3 text-accent-purple">
                        <Loader2 size={18} className="animate-spin" />
                        <span className="text-sm font-medium">即将跳转知识库并创建周报文档...</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">请稍候，约5秒后自动跳转</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
