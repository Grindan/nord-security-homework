'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import { Text, Password } from '@/components/inputs';
import { LoginFormValues } from '@/types/form';
import { required } from '@/utils/validators';
import authApi from '@/api/auth';
import { useAuthContext } from '@/context/AuthContext';

const LoginPage = () => {
  const router = useRouter();
  const { setToken } = useAuthContext();

  const onSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    authApi
      .login(values)
      .then(({ token }) => {
        setToken(token);
        router.push('/dashboard');
      })
      .catch((err) => {
        // todo: add notification/alert
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col h-auto max-w-md bg-white rounded-[24px] px-5 py-6 w-[568px]">
        <p className="text-2xl text-center mb-5 text-slate-800">Login Page</p>
        <Formik
          initialValues={{ username: '', password: '' } as LoginFormValues}
          onSubmit={onSubmit}
        >
          {({
            errors,
            isValid,
            dirty,
            touched,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  label="Username"
                  component={Text}
                  validate={required}
                  error={touched.username && errors.username}
                  className="mb-2"
                />

                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={Password}
                  validate={required}
                  error={touched.password && errors.password}
                  className="mb-2"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="rounded-full w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold"
                >
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
