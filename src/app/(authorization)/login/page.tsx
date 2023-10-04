'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import { Text, Password } from '@/components/inputs';
import { LoginFormValues } from '@/types/form';
import { required } from '@/utils/validators';
import authApi from '@/api/auth';
import { useAuthContext } from '@/context/AuthContext';
import { useNotificationsContext } from '@/context/NotificationsContext';

const LoginPage = () => {
  const router = useRouter();
  const { setToken } = useAuthContext();
  const { add } = useNotificationsContext();

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
        if (err?.response?.status === 401) {
          add('Wrong username or password.');
          actions.resetForm();
        } else {
          add(`Something went wrong when login:\n${err.message}`);
        }
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <section className="flex flex-col h-auto max-w-md bg-white rounded-[16px] md:rounded-[24px] px-5 py-6 w-full md:w-[568px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h1 className="text-2xl font-medium text-center mb-5 text-slate-800">
        Login Page
      </h1>
      <Formik
        initialValues={{ username: '', password: '' } as LoginFormValues}
        onSubmit={onSubmit}
      >
        {({ errors, isValid, dirty, touched, handleSubmit, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                name="username"
                label="Username"
                component={Text}
                validate={required}
                error={touched.username && errors.username}
                className="mb-2"
                tabIndex={0}
                aria-label="Username"
              />

              <Field
                name="password"
                label="Password"
                type="password"
                component={Password}
                validate={required}
                error={touched.password && errors.password}
                className="mb-2"
                tabIndex={0}
                aria-label="Password"
              />

              <button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                className="rounded-full w-full py-3 px-4 text-white font-semibold
                bg-gradient-to-br from-teal-400 to-indigo-400 disabled:from-teal-100 disabled:to-indigo-100
                hover:scale-105 ease-in-out duration-75 disabled:scale-100"
                tabIndex={0}
                aria-label="Login"
                aria-hidden={false}
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default LoginPage;
