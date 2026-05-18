import { useGetPurchaseCourse } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useModuleStores } from '@/Store/module.store'
import { useCheckQuiz, useCreateQuiz } from '@/hooks/quiz.hook'
import { FileQuestion } from 'lucide-react'
import { toast } from 'sonner'

const SinglePurchasedCourse = () => {
  const navigate = useNavigate()

  const { setModule, module } = useModuleStores()
  const { id } = useParams()
  const { data } = useGetPurchaseCourse(id)
  
  const { data: CheckQuiz } = useCheckQuiz(module?._id)

  const getQuizHandler = (quizId) => {
    navigate(`/quiz/${quizId}`)
  }

  const { mutate: createQuiz } = useCreateQuiz()
  const createQuizHandler = (moduleData) => {
    createQuiz(
      {
        moduleId: moduleData._id,
        content: moduleData.title
      },
      {
        onSuccess: () => toast.success('Quiz created successfully!')
      }
    )
  }

  const selectModule = (moduleData) => {
    setModule(moduleData)
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left - Content */}
      <div className="w-1/2 flex flex-col border-r border-slate-200">
        
        <div className="flex-1 bg-white flex items-center justify-center p-6">
          {module?.content ? (
            <div className="w-full h-full bg-slate-50 rounded-xl p-6 overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {module.title}
              </h3>
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {module.content}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <FileQuestion className="w-20 h-20 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold">
                Select a module to read
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right - Modules */}
      <div className="w-1/2 bg-white overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Course Content
          </h2>
          
          <div className="space-y-3">
            {data?.modules?.map((item, index) => (
              <Accordion key={item._id || index} type="single" collapsible>
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all"
                >
                  <AccordionTrigger 
                    onClick={() => selectModule(item)}
                    className="px-5 py-4 bg-white hover:bg-slate-50 text-left transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-700">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-slate-900">
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-5 py-4 bg-slate-50 border-t border-slate-200">
                    <div className="flex gap-3">
                      {!item.quiz ? (
                        <button
                          onClick={() => createQuizHandler(item)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
                        >
                          <FileQuestion className="w-4 h-4" />
                          Create Quiz
                        </button>
                      ) : (
                        <button
                          onClick={() => getQuizHandler(item.quiz)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
                        >
                          <FileQuestion className="w-4 h-4" />
                          Take Quiz
                        </button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePurchasedCourse