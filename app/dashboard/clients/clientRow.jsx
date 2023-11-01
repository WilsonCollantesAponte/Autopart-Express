"use client";

import { useState } from "react";
import Validations from "./validations";
import { MoonLoader } from "react-spinners";

export default function ClientRow({ clientValue, setClients, clients }) {
  // const [hiddenRow, setHiddenRow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [errors, setErrors] = useState({});

  const [initData, setInitData] = useState({
    name: clientValue.name,
    surname: clientValue.surname,
    email: clientValue.email,
    password: clientValue.password,
    status: clientValue.Accessibility.status,
  });

  function handleInitData(event) {
    const { name, value } = event.target;
    setErrors(Validations({ ...initData, [name]: value }));
    setInitData({ ...initData, [name]: value });
  }

  return (
    // {/* <div className={hiddenRow ? "hidden" : ""}> */}
    <div>
      {!edit ? (
        <div className=" flex divide-x-2 divide-gray-500 text-xs border-b-2 border-gray-500 font-medium overflow-auto">
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-52 h-fit">
              {clientValue.name}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-52 h-fit">
              {clientValue.surname}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto px-4 w-72 h-fit">
              {clientValue.email}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-72 h-fit">
              {clientValue.password}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 px-3 overflow-auto w-24 h-fit">
              {clientValue.Accessibility.status ? "Yes" : "No"}
            </div>
          </div>

          {willBeDeleted ? (
            <div className=" flex items-center">
              {!loadingDelete ? (
                <div className=" flex gap-4 px-6  ">
                  <button
                    className=" underline underline-offset-4"
                    onClick={() => {
                      setLoadingDelete(true);
                      fetch(`/dashboard/clients/api?id=${clientValue.id}`, {
                        method: "DELETE",
                      })
                        .then(() => {
                          // setHiddenRow(true);
                          setClients(
                            clients.filter((val) => val.id !== clientValue.id)
                          );
                          setWillBeDeleted(false);
                          setLoadingDelete(false);
                        })
                        .catch(() =>
                          alert("Error deleting, please try again or after")
                        );
                    }}
                  >
                    {/* ✅ */}
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
                  <button
                    className=" underline underline-offset-4"
                    onClick={() => setWillBeDeleted(!willBeDeleted)}
                  >
                    {/* ❌ */}
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
                <div className=" px-8 overflow-hidden">
                  <MoonLoader size={22} />
                </div>
              )}
            </div>
          ) : (
            <div className=" flex gap-4 px-6">
              <button
                className=" underline underline-offset-4"
                onClick={() => setEdit(!edit)}
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
              <button
                className=" underline underline-offset-4"
                onClick={() => setWillBeDeleted(!willBeDeleted)}
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
            </div>
          )}
        </div>
      ) : (
        <div className=" flex divide-x-2 divide-gray-500 text-xs border-b-2 border-gray-500 font-medium overflow-auto break-words">
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.name
                  ? " py-2.5 overflow-auto pl-4 w-52 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-52 h-fit"
              }
              value={initData.name}
              name="name"
              type="text"
              onChange={handleInitData}
            />
            {errors.name ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-40">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.surname
                  ? " py-2.5 overflow-auto pl-4 w-52 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-52 h-fit"
              }
              value={initData.surname}
              name="surname"
              onChange={handleInitData}
            />
            {errors.surname ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-44">
                {errors.surname}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.email
                  ? " py-2.5 overflow-auto pl-4 w-72 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-72 h-fit"
              }
              value={initData.email}
              name="email"
              onChange={handleInitData}
            />
            {errors.email ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-72">
                {/* <p> */}
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.password
                  ? " py-2.5 overflow-auto pl-4 w-72 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-72 h-fit"
              }
              value={initData.password}
              name="password"
              onChange={handleInitData}
            />
            {errors.password ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-24">
                {errors.password}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center bg-white">
            <input
              type="checkbox"
              className={
                errors.status
                  ? " py-2.5 overflow-auto pl-4 w-24 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-24 h-fit my-auto"
              }
              checked={initData.status}
              name="status"
              onChange={(e) => {
                setInitData({
                  ...initData,
                  [e.target.name]: !initData.status,
                });
              }}
            />
          </div>
          {!loadingUpdate ? (
            <div className=" flex gap-4 px-6  ">
              <button
                className=" underline underline-offset-4"
                onClick={() => {
                  if (!Object.keys(errors).length) {
                    setLoadingUpdate(true);
                    fetch(`/dashboard/clients/api?id=${clientValue.id}`, {
                      method: "PUT",
                      body: JSON.stringify(initData),
                    })
                      .then(() => {
                        const clientFound = clients.find(
                          (value) => value.id === clientValue.id
                        );
                        clientFound.name = initData.name;
                        clientFound.surname = initData.surname;
                        clientFound.email = initData.email;
                        clientFound.password = initData.password;
                        clientFound.Accessibility.status = initData.status;
                        setClients(clients);
                      })
                      .then(() => setEdit(false))
                      .then(() => setLoadingUpdate(false))
                      .catch(() => alert("Error, please try again or after"));
                  } else {
                    alert("There are some errors in your fields");
                  }
                }}
              >
                {/* ✅ */}
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
              <button
                className=" underline underline-offset-4"
                onClick={() => setEdit(!edit)}
              >
                {/* ❌ */}
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
            <div className=" py-1 px-8 mr-6 overflow-hidden">
              <MoonLoader size={22} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
