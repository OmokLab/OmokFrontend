'use server';

interface SignupFormData {
  email: string;
  username: string;
  password: string;
}

export async function submitSignup(formData: SignupFormData) {
  try {
    const response = await fetch('http://localhost:8080/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseJson = await response.json();
    return {
      response: responseJson,
      status: true,
      error: '',
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: `회원가입을 실패했습니다. ${err instanceof Error ? err.message : err}`,
    };
  }
}
