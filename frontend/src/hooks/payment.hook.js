import { confirmPurchaseApi } from '@/Api/purchase.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useConfirmPurchase = ()=>{
    return useMutation({
        mutationFn:confirmPurchaseApi,
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(err)=>{
            console.log(err)
            toast.error(err.response?.data?.message || "Purchase failed")
        }
    })
}