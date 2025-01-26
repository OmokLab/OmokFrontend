'use client';

import { submitSignup } from '@/actions/submit-signup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    reset,
  } = useForm<SignupFormData>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
    mode: 'onChange',
  });
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    const result = await submitSignup(data);
    if (result.response && 'accessToken' in result.response) {
      reset();
      router.replace('/');
      return;
    }
    alert(result.error);
  };

  const preventEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-[80%]'>
      <label className='flex flex-col gap-4'>
        <span className='text-lg font-bold'>이메일</span>
        <input
          type='email'
          placeholder='이메일을 입력해주세요'
          className={`rounded-xl p-4 bg-gray-500 ${errors.email ? 'border-2 border-red-error outline-red-error' : 'outline-blue-100'}`}
          {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
          onKeyDown={preventEnterSubmit}
          autoComplete='email'
        />
        {errors?.email?.type === 'required' && <span className='text-red-error'>이메일을 입력해주세요.</span>}
        {errors?.email?.type === 'pattern' && <span className='text-red-error'>잘못된 이메일입니다.</span>}
      </label>
      <label className='flex flex-col gap-4'>
        <span className='text-lg font-bold'>닉네임</span>
        <input
          type='text'
          placeholder='닉네임을 입력해주세요'
          className={`rounded-xl p-4 bg-gray-500 ${errors.username ? 'border-2 border-red-error outline-red-error' : 'outline-blue-100'}`}
          {...register('username', { required: true, maxLength: 10 })}
          onKeyDown={preventEnterSubmit}
          autoComplete='username'
        />
        {errors?.username?.type === 'required' && <span className='text-red-error'>닉네임을 입력해주세요.</span>}
        {errors?.username?.type === 'maxLength' && <span className='text-red-error'>닉네임을 10자리 이하로 입력해주세요.</span>}
      </label>
      <label className='flex flex-col gap-4'>
        <span className='text-lg font-bold'>비밀번호</span>
        <input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          className={`rounded-xl p-4 bg-gray-500 ${errors.password ? 'border-2 border-red-error outline-red-error' : 'outline-blue-100'}`}
          {...register('password', { required: true, minLength: 8 })}
          onKeyDown={preventEnterSubmit}
          autoComplete='new-password'
        />
        {errors?.password?.type === 'required' && <span className='text-red-error'>비밀번호를 입력해주세요.</span>}
        {errors?.password?.type === 'minLength' && <span className='text-red-error'>비밀번호를 8자리 이상 입력해주세요.</span>}
      </label>
      <button
        className={`mt-4 rounded-full py-4 bg-blue-100 font-semibold text-xl text-white text-center ${isSubmitting || !isValid ? 'bg-gray-400' : 'bg-blue-100 hover:bg-blue-200'}`}
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? '회원가입 중입니다.' : '회원가입'}
      </button>
    </form>
  );
}
