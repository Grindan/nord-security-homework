import Input from '@/components/Input';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col h-auto max-w-md bg-white rounded-[24px] px-5 py-6 w-[568px]">
        <p className="text-2xl text-center mb-5 text-slate-800">Login Page</p>
        <Input
          name="username"
          label="Username"
          type="text"
          onChange={() => { }}
          className="mb-6"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          onChange={() => { }}
          className="mb-8"
        />
        <button className="rounded-full py-3 px-4 bg-blue-600 text-white font-semibold">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
