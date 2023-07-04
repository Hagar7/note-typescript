import React, { ChangeEvent, useState } from "react";
import style from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser } from "../../store/AuthSlice";
import Joi from "joi";

interface User {
  name: string;
  phone: string;
  password: string;
  email: string;
}

const Register: React.FC = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [userData, setuserData] = useState<User>({
    name: "",
    phone: "",
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
      name: Joi.string().min(2).max(10).required().messages({
        "string.max": "length must be less than or equal to 10 characters long",
      }),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .messages({
          "string.pattern.base": "password must contains number and symbols",
        }),
      phone: Joi.string().required(),
    });
    return schema.validate(userData, { abortEarly: false });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let validateResponse = formValidation();
    if (validateResponse.error) {
      setErrorMsg(validateResponse.error.details.map((item) => item.message));
    } else {
      dispatch(addUser(userData));
    }
  };

  const showmsg = (pram: string) => {
    let newMsgs = errormsg.filter((error) => error.includes(pram));
    if (newMsgs[0] !== undefined) {
      return <div className="alert alert-danger p-1">{newMsgs[0]}</div>;
    } else {
      return "";
    }
  };

  return (
    <div className="container">
      <div className={`${style.reg} py-5 m-auto w-75`}>
        <div className="row">
          <div className={`${style.itm} col-lg-12 text-center`}>
            <div className={`${style.info} py-3 mb-2`}>
              <h4 className="text-muted m-3 ">Create My Account!</h4>

              <form onSubmit={submitHandler}>
                <div className={`${style.inputData} my-3`}>
                  <input
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    className="form-control my-3"
                    placeholder="Name"
                  />
                </div>
                {showmsg("name")}
                <div className={`${style.inputData} my-3 `}>
                  <input
                    type="email"
                    name="email"
                    className="form-control my-3"
                    placeholder="Email"
                    onChange={changeHandler}
                  />
                </div>
                {showmsg("email")}
                <div className={`${style.inputData} my-3 `}>
                  <input
                    type="password"
                    name="password"
                    className="form-control my-3"
                    placeholder="Password"
                    onChange={changeHandler}
                  />
                </div>
                {showmsg("password")}
                <div className={`${style.inputData} my-3 `}>
                  <input
                    type="text"
                    name="phone"
                    className="form-control my-3"
                    placeholder="Phone Number"
                    onChange={changeHandler}
                  />
                </div>
                {showmsg("phone")}
                <div className={`${style.inputData} my-3 `}>
                  {loading ? (
                    <button className={`${style.myBtn} btn btn-primary w-100`}>
                      <i className="fa-solid fa-spinner"></i>
                    </button>
                  ) : (
                    <button className={`${style.myBtn} btn btn-primary w-100`}>
                      Create Account
                    </button>
                  )}
                </div>
              </form>
              <div className={`${style.brdr} mb-3`}></div>
              <span className={`${style.alertSpan}`}>
                Already a member ?{" "}
                <Link
                  style={{ textDecoration: "none", color: "#F9004D" }}
                  to="/login"
                >
                  Log in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
