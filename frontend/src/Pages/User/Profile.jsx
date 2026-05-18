import React, { useState } from 'react'
import { useUserStore } from '@/Store/user.store'
import { useForm } from 'react-hook-form'
import { updateProfileApi } from '@/Api/user.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Upload, User } from 'lucide-react'

const Profile = () => {
  const { user } = useUserStore()
  const queryClient = useQueryClient()
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.fullName || ''
    }
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['getUser'])
      setPreviewImage(null)
      setSelectedFile(null)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('fullName', data.fullName)
    if (selectedFile) {
      formData.append('profilePhoto', selectedFile)
    }

    updateProfileMutation.mutate(formData)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6'>
      <div className='max-w-2xl mx-auto'>
        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader className='text-center pb-8'>
            <CardTitle className='text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent'>
              Profile Settings
            </CardTitle>
            <CardDescription className='text-lg text-slate-600'>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-8'>
            {/* Profile Picture Section */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='relative'>
                <Avatar className='w-32 h-32 ring-4 ring-slate-200 shadow-lg'>
                  <AvatarImage
                    src={previewImage || user?.profilePhoto || "https://github.com/shadcn.png"}
                    className='object-cover'
                  />
                  <AvatarFallback className='bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 text-2xl font-semibold'>
                    {user?.fullName ? user.fullName.slice(0,2).toUpperCase() : 'UN'}
                  </AvatarFallback>
                </Avatar>
                <label className='absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg transition-colors'>
                  <Upload className='w-5 h-5' />
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>
              </div>
              <p className='text-sm text-slate-500 text-center'>
                Click the upload icon to change your profile picture
              </p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='fullName' className='text-sm font-semibold text-slate-700'>
                  Full Name
                </Label>
                <Input
                  id='fullName'
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Full name must be at least 2 characters'
                    }
                  })}
                  className='w-full h-12 text-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Enter your full name'
                />
                {errors.fullName && (
                  <p className='text-sm text-red-600 mt-1'>{errors.fullName.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-semibold text-slate-700'>
                  Email Address
                </Label>
                <Input
                  id='email'
                  value={user?.email || ''}
                  disabled
                  className='w-full h-12 text-lg bg-slate-50 border-slate-200 text-slate-500'
                />
                <p className='text-xs text-slate-500'>
                  Email cannot be changed
                </p>
              </div>

              <div className='pt-4'>
                <Button
                  type='submit'
                  disabled={updateProfileMutation.isPending}
                  className='w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <User className='w-5 h-5 mr-2' />
                      Update Profile
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* User Info Display */}
            <div className='pt-8 border-t border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Account Information</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-slate-50 p-4 rounded-lg'>
                  <p className='text-sm font-medium text-slate-600'>Account Type</p>
                  <p className='text-lg font-semibold text-slate-800'>
                    {user?.admin ? 'Administrator' : 'Student'}
                  </p>
                </div>
                <div className='bg-slate-50 p-4 rounded-lg'>
                  <p className='text-sm font-medium text-slate-600'>Member Since</p>
                  <p className='text-lg font-semibold text-slate-800'>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile