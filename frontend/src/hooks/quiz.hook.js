import { checkQuizApi, createQuiz, getQuizApi } from '@/Api/quiz.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateQuiz = ()=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:createQuiz,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['getPurchaseCourse'])
            toast.success(data.message)
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
            toast.error(err.response?.data?.message || 'Quiz creation failed')
        }
    })
}


export const useGetQuiz = (id)=>{
    return useQuery({
        queryFn:()=>getQuizApi(id),
        queryKey:['getQuiz', id]

    })
}

export const useCheckQuiz =(id)=>{
    return useQuery({
        queryFn:()=>checkQuizApi(id),
        queryKey:['checkQuiz', id],
        enabled:!!id
    })
}