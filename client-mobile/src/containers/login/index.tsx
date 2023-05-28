import { useState, useContext } from "react";

import { Navigate } from "react-router-dom";
import instance from "../../auth";
import { Button, Input } from "antd";
import robo from "../../assets/robo.png";
import { authService } from "../../services/auth";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const loginUser = async (e: any) => {
    e.preventDefault();
    try {
      const res = await authService.login(email, password);
      setLoginError(false);
      setRedirect(true);
    } catch (e) {
      setLoginError(true);
      console.log(e);
    } finally {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-[100vh] h-fit flex items-center">
      <div className="w-full px-[15px] h-fit mx-auto flex flex-col justify-center items-center sm:flex-row sm:gap-[20px] pt-[15px]">
        <div
          className="w-[150px] h-[150px]"
          style={{
            background: `url(${robo}) center/cover`,
          }}
        ></div>
        <form
          className="px-8 pb-[30px] mb-4 mt-4 w-full max-w-[400px]"
          action=""
          onSubmit={(e) => loginUser(e)}
        >
          <h3 className="pt-4 text-2xl text-center mb-[20px]">Welcome Back!</h3>
          {loginError && (
            <div
              className="bg-red-200 text-sm text-red-700 mb-3 px-4 py-2 rounded-lg relative"
              role="alert"
            >
              LOGIN ERROR! something went wrong!
            </div>
          )}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Email
            </label>
            <Input
              className="w-full rounded-lg"
              id="email"
              type="email"
              size="large"
              placeholder="name@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              className="w-full mb-3 rounded-lg"
              id="password"
              type="password"
              size="large"
              placeholder="********"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6 text-center">
            <Button
              htmlType="submit"
              className="w-full bg-[#424f6f] text-white text-[1.2rem] h-fit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
