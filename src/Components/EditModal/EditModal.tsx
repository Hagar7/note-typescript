import React, { useState, ChangeEvent } from "react";
import style from "./EditModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Joi from "joi";
import { updateNote } from "../../store/NoteSlice";

const EditModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [title, setNoteTitle] = useState<string>("");
  const [desc, setNoteArea] = useState<string>("");
  const [errormsg, setErrorMsg] = useState<string[]>([]);
  const { note } = useAppSelector((state) => state.note);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
  };

  const changeAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteArea(e.target.value);
  };
  const formValidation = () => {
    let schema = Joi.object({
      title: Joi.string().max(10).messages({
        "string.max": "length must be less than or equal to 10 characters long",
      }),

      desc: Joi.string(),
    });
    return schema.validate({ title, desc }, { abortEarly: false });
  };

  const updateHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let validateResponse = formValidation();
    if (validateResponse.error) {
      setErrorMsg(validateResponse.error.details.map((item) => item.message));
    } else {
     
    //   dispatch(updateNote({note._id,title,desc}));
      setNoteTitle("");
      setNoteArea("");
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
    <>
      <div
        className={`${style.myModal} modal fade `}
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form onSubmit={updateHandler}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className={`${style.modalHeader} modal-header`}>
                <h1
                  className={`${style.myModalTitle} modal-title fs-5`}
                  id="exampleModalLabel"
                >
                  Update Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className={`${style.inputData} my-3`}>
                  <input
                    type="text"
                    placeholder="Enter Note Title"
                    name="title"
                    value={note?.title}
                    className="form-control py-3"
                    onChange={changeTitleHandler}
                  />
                </div>
                {showmsg("title")}
                <div className={`${style.inputData} my-3`}>
                  <textarea
                    value={note?.desc}
                    placeholder="Enter Note Content"
                    name="content"
                    className="form-control "
                    onChange={changeAreaHandler}
                  />
                </div>
                {showmsg("desc")}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className={`${style.btns} btn btn-primary`}
                  data-bs-dismiss="modal"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
