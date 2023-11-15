import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function OneComment({
  value, //item commentario {..}
  newDateTime,
  lengthComments, //1
  setallComments, //setCommentClient
  allComments, //item
}) {
  //Estados de carga
  const [edit, setEdit] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  //Comentario
  const [comment, setComment] = useState("");

  //Inicializar el comentairo al empezar
  useEffect(() => {
    setComment(value.comment);
  }, [lengthComments]);

  console.log("value" , { })
  return (
    <div className=" flex flex-col border-2 border-gray-900/80 my-3 rounded-lg">
      <div className=" flex gap-4 border-b-2 border-gray-900/70 text-xs font-bold text-black justify-end px-1.5 py-0.5">
        <div className=" flex-1">{value.emailClient}</div>
        {/* Para dar más espacio entre día y hora */}
        <span>{newDateTime.replace(" ", " - ")}</span>
      </div>
      {!edit ? (
        <div className=" flex">
          <div className=" text-lg font-medium p-2 mx-2 w-full border-r-2 border-gray-800/70">
            {value.comment}
          </div>
          {!willBeDeleted ? (
            <div className="p-2 flex gap-2 self-center w-20">
                {/* editar boton cambia estado edit*/}
              <button 
                onClick={() => {
                  if (value.emailClient !== localStorage.getItem("email"))
                    return alert("You are not the owner of this comment");

                  setEdit(true);
                }}
              >
                {/* ✏️ */}
                <svg
                  class="with-icon_icon__MHUeb"
                  data-testid="geist-icon"
                  fill="none"
                  height="22"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="22"
                  // style="color:var(--geist-foreground);width:24px;height:24px"
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
                {/* eliminar boton - cambia estado willbedeleted */}
              <button
                onClick={() => {
                  if (value.emailClient !== localStorage.getItem("email"))
                    return alert("You are not the owner of this comment");

                  setWillBeDeleted(true);
                }}
              >
                {/* 🗑️ */}
                <svg
                  class="with-icon_icon__MHUeb"
                  data-testid="geist-icon"
                  fill="none"
                  height="22"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="22"
                  // style="color:var(--geist-foreground);width:24px;height:24px"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div> /* desde aca si lo quiero eliminar */
          ) : (
            // <div className="p-2 flex gap-2">
            <div className="p-2 self-center w-20">
              {!loadingDelete ? (
                <div className="flex gap-2 my-auto">
                  <button
                    onClick={() => {
                      setLoadingDelete(true);
                      fetch(`/detail/api?idReview=${value.id}`, {
                        method: "DELETE",
                      })
                        .then((r) => r.json())
                        .then((r) => {
                          setallComments(
                            allComments.filter(
                              (value_2) => value_2.id !== value.id
                            )
                          );

                          setLoadingDelete(false);
                          setWillBeDeleted(false);
                          console.log(r);
                        });
                    }}
                  >
                    {/* ✅ 🗑️ */}
                    <svg
                      class="with-icon_icon__MHUeb"
                      data-testid="geist-icon"
                      fill="none"
                      height="22"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="22"
                      // style="color:var(--geist-foreground);width:24px;height:24px"
                    >
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                      <path d="M18 9l-6 6" />
                      <path d="M12 9l6 6" />
                    </svg>
                  </button>
                  <button onClick={() => setWillBeDeleted(false)}>
                    {/* ❌ 🗑️*/}
                    <svg
                      class="with-icon_icon__MHUeb"
                      data-testid="geist-icon"
                      fill="none"
                      height="22"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="22"
                      // style="color:var(--geist-foreground);width:24px;height:24px"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="self-center h-fit">
                  <PulseLoader className="  mx-auto" size={10} />
                </div>
              )}
            </div>
          )}
        </div> /* desde aca si lo quiero editar */
      ) : (
        <div className=" flex">
          <textarea
            className=" text-lg font-medium mr-4 p-2 w-full rounded-md "
            type="text"
            value={comment}
            onChange={(e) => {
              console.log(e.target.value);
              setComment(e.target.value);
            }}
          />

          {!loadingUpdate ? (
            // <div className=" flex self-center">
            <div className=" p-2 flex gap-2 self-center w-20">
              <button
                onClick={() => {
                  if (!comment)
                    return alert("The new comment can not be empty");

                  setLoadingUpdate(true);
                  fetch("/detail/api", {
                    method: "PUT",
                    body: JSON.stringify({ idReview: value.id, comment }),
                  })
                    .then((r) => r.json())
                    .then((r) => {
                      const commentFound = allComments.find(
                        (value_1) => value_1.id === value.id
                      );

                      commentFound.comment = comment;
                      setallComments(allComments);

                      setLoadingUpdate(false);
                      setEdit(false);
                    });
                }}
              >
                {/* ✅ ✏️ */}
                <svg
                  class="with-icon_icon__MHUeb"
                  data-testid="geist-icon"
                  fill="none"
                  height="22"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="22"
                  // style="color:var(--geist-foreground);width:24px;height:24px"
                >
                  <path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
                </svg>
              </button>
              <button onClick={() => setEdit(false)}>
                {/* ❌ ✏️ */}
                <svg
                  class="with-icon_icon__MHUeb"
                  data-testid="geist-icon"
                  fill="none"
                  height="22"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="22"
                  // style="color:var(--geist-foreground);width:24px;height:24px"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            // </div>
            <div className=" self-center w-20">
              <PulseLoader className=" mx-auto" size={10} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
