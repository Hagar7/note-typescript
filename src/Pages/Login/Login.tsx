import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Joi from "joi";
import style from "./Login.module.scss";
import { loginUser } from "../../store/AuthSlice";

interface User {
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [userData, setuserData] = useState<User>({
    password: "",
    email: "",
  });
  const [errormsg, setErrorMsg] = useState<string[]>([]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let myData: any = { ...userData };
    myData[e.target.name] = e.target.value;
    setuserData(myData);
  };

  const formValidation = () => {
    let schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .messages({
          "string.pattern.base": "password length must be at least 6 characters long",
        }),
    });
    return schema.validate(userData, { abortEarly: false });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let validateResponse = formValidation();
    if (validateResponse.error) {
      setErrorMsg(validateResponse.error.details.map((item) => item.message));
    } else {
      dispatch(loginUser(userData));
    }
  };

  const showAlertMsg = (pram: string) => {
    let newMsgs = errormsg.filter((error) => error.includes(pram));
    if (newMsgs[0] !== undefined) {
      return <div className="alert alert-danger p-1">{newMsgs[0]}</div>;
    } else {
      return "";
    }
  };

  return (
    <div className="container">
      <div className={`${style.log} py-5 m-auto w-75`}>
        <div className="row">
          <div className={`${style.itm} col-lg-12 text-center`}>
            <div className={`${style.info} py-3 mb-2`}>
              <h4 className="text-muted m-4 ">GO to Your Account!</h4>

              <form onSubmit={submitHandler}>
                <div className={`${style.inputData} my-3 `}>
                  <input
                    type="email"
                    name="email"
                    className="form-control my-4"
                    placeholder="Email"
                    onChange={changeHandler}
                  />
                </div>
                {showAlertMsg("email")}
                <div className={`${style.inputData} my-3 `}>
                  <input
                    type="password"
                    name="password"
                    className="form-control my-4"
                    placeholder="Password"
                    onChange={changeHandler}
                  />
                </div>
                {showAlertMsg("password")}
                <div className={`${style.inputData} my-3 `}>
                  {loading ? (
                    <button className={`${style.myBtn} btn btn-primary w-100`}>
                      <i className="fa-solid fa-spinner"></i>
                    </button>
                  ) : (
                    <button className={`${style.myBtn} btn btn-primary w-100`}>
                      LogIn
                    </button>
                  )}
                </div>
              </form>
              <div className={`${style.brdr} mb-3`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
