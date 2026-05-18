import { createModuleApi, getModuleApi } from '@/Api/module.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreateModule=()=>{
    const queryClient  = useQueryClient()
    return useMutation({
        mutationFn:createModuleApi,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['getSingleCourse'])
        },

        onError:(err)=>{
            console.log(err)
        }
    })



}


export const useGetModule = (id)=>{
    return useQuery({
        queryFn:()=>getModuleApi(id),
        queryKey:['getModule',id]
    })
}