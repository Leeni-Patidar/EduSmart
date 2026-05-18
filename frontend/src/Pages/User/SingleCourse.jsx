import { Spinner } from '@/components/ui/spinner'
import { useGetSingleCourseHook } from '@/hooks/course.hook'
import { useConfirmPurchase } from '@/hooks/payment.hook'
import { useGetUserHook } from '@/hooks/User.hook'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const SingleCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useGetSingleCourseHook(id)
  const { data: userData } = useGetUserHook()
  const { mutate, isPending } = useConfirmPurchase()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const isPurchased = userData?.purchasedCourse?.includes(id)

  const purchaseHandler = () => {
    setShowConfirmDialog(true)
  }

  const confirmPurchase = () => {
    mutate(id, {
      onSuccess: () => {
        setShowConfirmDialog(false)
        // Optionally refresh user data or navigate
        window.location.reload() // Simple way to refresh
      }
    })
  }

  const goToModules = () => {
    navigate(`/YourCourse/${id}`)
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">

        {/* Course Image */}
        <div className="flex items-center justify-center">
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="w-full max-h-[320px] object-contain rounded-xl"
          />
        </div>

        {/* Course Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {data?.title}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {data?.description || "Upgrade your skills with this professional course."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-emerald-600">
                ₹{data?.amount}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{Number(data?.amount) + 999}
              </span>
            </div>
          </div>

          {/* CTA */}
          {isPurchased ? (
            <button
              onClick={goToModules}
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg
              hover:bg-blue-700 transition-all flex items-center justify-center"
            >
              Go to Modules
            </button>
          ) : (
            <button
              disabled={isPending}
              onClick={purchaseHandler}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold text-lg
              hover:bg-emerald-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isPending ? <Spinner /> : 'Buy Now'}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
          </DialogHeader>
          <p>Do you want to buy this course?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              No
            </Button>
            <Button onClick={confirmPurchase} disabled={isPending}>
              {isPending ? <Spinner /> : 'Yes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SingleCourse
