"use client";

import { useState } from "react";
import Validations from "./validations";
import { MoonLoader } from "react-spinners";

export default function ProductRow({ productValue, setProducts, products }) {
  // const [hiddenRow, setHiddenRow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [errors, setErrors] = useState({});

  const [initData, setInitData] = useState({
    name: productValue.name,
    price: productValue.price,
    availability: productValue.availability,
    brand: productValue.brand,
    model: productValue.model,
    rating: productValue.rating,
    image: productValue.image,
    status: productValue.status
  });

  function handleInitData(event) {
    const { name, value } = event.target;
    setErrors(Validations({ ...initData, [name]: value }));
    setInitData({ ...initData, [name]: value });
  }

  const stock = productValue.availability;

  return (
    // {/* <div className={hiddenRow ? "hidden" : ""}> */}
    <div>
      {!edit ? (
        <div className=" flex divide-x-2 divide-gray-500 text-xs border-b-2 border-gray-500 font-medium overflow-auto">
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-52 h-fit">
              {productValue.name}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-24 h-fit">
              {productValue.price}
            </div>
          </div>
          {/* <div className="flex items-center">
            <div className=" py-2.5 overflow-auto px-4 w-40 h-fit">
              {productValue.availability}
            </div>
          </div> */}
          <div className="flex items-center">
            <div className={`py-2.5 overflow-auto px-4 w-40 h-fit ${ stock === '0' ? 'bg-red-500': stock < 10 ? 'bg-yellow-500': ''}`}>
              {productValue.availability}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-52 h-fit">
              {productValue.brand}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-52 h-fit">
              {productValue.model}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-20 h-fit">
              {productValue.rating}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" w-28">
              <img
                className=" py-2.5 overflow-auto px-3 h-fit rounded-2xl"
                src={productValue.image}
                alt="not available"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className=" py-2.5 overflow-auto pl-4 w-20 h-fit">
              {productValue.status ? 'Yes' : 'No'}
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
                      fetch(`/dashboard/products/api?id=${productValue.id}`, {
                        method: "DELETE",
                      })
                        .then(() => {
                          // setHiddenRow(true);
                          setProducts(
                            products.filter((val) => val.id !== productValue.id)
                          );
                          setWillBeDeleted(false);
                          setLoadingDelete(false);
                        })
                        .catch(() => {
                          alert("Error deleting, please try again or after");
                          setLoadingDelete(false);
                        });
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
                errors.price
                  ? " py-2.5 overflow-auto pl-4 w-24 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-24 h-fit"
              }
              value={initData.price}
              name="price"
              onChange={handleInitData}
            />
            {errors.price ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-44">
                {errors.price}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.availability
                  ? " py-2.5 overflow-auto pl-4 w-40 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-40 h-fit"
              }
              value={initData.availability}
              name="availability"
              onChange={handleInitData}
            />
            {errors.availability ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-72">
                {/* <p> */}
                {errors.availability}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.brand
                  ? " py-2.5 overflow-auto pl-4 w-52 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-52 h-fit"
              }
              value={initData.brand}
              name="brand"
              onChange={handleInitData}
            />
            {errors.brand ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-24">
                {errors.brand}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.model
                  ? " py-2.5 overflow-auto pl-4 w-52 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-52 h-fit"
              }
              value={initData.model}
              name="model"
              onChange={handleInitData}
            />
            {errors.model ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-24">
                {errors.model}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.rating
                  ? " py-2.5 overflow-auto pl-4 w-20 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-20 h-fit"
              }
              value={initData.rating}
              name="rating"
              onChange={handleInitData}
            />
            {errors.rating ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-24">
                {errors.rating}
              </p>
            ) : null}
          </div>
          
          <div className="flex flex-col items-center">
            <input
              maxLength={45}
              className={
                errors.image
                  ? " py-2.5 overflow-auto pl-4 w-28 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-28 h-fit"
              }
              value={initData.image}
              name="image"
              onChange={handleInitData}
            />
            {errors.image ? (
              <p className=" mt-1 text-sm leading-6 text-red-600 px-3 w-24">
                {errors.image}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-center bg-white">
            <input
              type="checkbox"
              className={
                errors.status
                  ? " py-2.5 overflow-auto pl-4 w-20 h-fit ring-red-500 ring-inset ring-2"
                  : " py-2.5 overflow-auto pl-4 w-20 h-fit my-auto"
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
                    fetch(`/dashboard/products/api?id=${productValue.id}`, {
                      method: "PUT",
                      body: JSON.stringify(initData),
                    })
                      .then(() => {
                        const productFound = products.find(
                          (value) => value.id === productValue.id
                        );
                        productFound.name = initData.name;
                        productFound.price = initData.price;
                        productFound.availability = initData.availability;
                        productFound.brand = initData.brand;
                        productFound.model = initData.model;
                        productFound.rating = initData.rating;
                        productFound.image = initData.image;
                        productFound.status = initData.status;
                        setProducts(products);
                      })
                      .then(() => setEdit(false))
                      .then(() => setLoadingUpdate(false))
                      .catch(() => {
                        alert("Error, please try again or after");
                        setLoadingUpdate(false);
                      });
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
