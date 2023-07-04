import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteNote, getNotes, selectedNote } from "../../store/NoteSlice";
import style from "./Home.module.scss";
import { BounceLoader } from "react-spinners";
import AddModal from "../../Components/AddModal/AddModal";
import EditModal from "../../Components/EditModal/EditModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const { notes, loading } = useAppSelector((state) => state.note);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            background: "#212428",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BounceLoader color="#EAC51F" loading />
        </div>
      ) : (
        <>
          <div className={`${style.home} container py-5`}>
            <div className="row">
              <div className="col-md-12 text-end">
                <button
                  className={`${style.btns}`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <i className="fas fa-plus-circle"></i> Add Note
                </button>
                <AddModal />
              </div>
            </div>
            {/* <!-- notes --> */}
            <div className="row py-5">
              {notes?.map((note, index) => (
                <div className="col-md-3" key={index}>
                  <div className={`${style.items}`}>
                    <div className={`${style.item}`}>
                      <div className={`${style.title}`}>
                        <h3>{note.title}</h3>
                      </div>
                      <div className={`${style.icons}`}>
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() => dispatch(deleteNote(note._id))}
                        ></i>
                        <i
                          className="fa-regular fa-pen-to-square"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop2"
                          onClick={() => dispatch(selectedNote(note))}
                        >
                        </i>
                        <EditModal /> 
                      </div>
                    </div>
                    <div className={`${style.desc}`}>
                      <p>{note.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </>
      )}
    </>
  );
};

export default Home;
