"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Category } from "~/interfaces/products";
import { supabase } from "~/lib/supabase";

interface FormValues {
  name: string;
  price: string;
  stock: string;
  secondaryImages: FileList[];
  description: string;
  categoryId: string;
  primaryImage: FileList;
}

interface IProps {
  onUploadSucces: () => void;
}

const ProductForm: React.FC<IProps> = ({ onUploadSucces }) => {
  const [upldState, setUpldState] = useState("stand_by");
  const [primaryImageSize, setPrimaryImageSize] = useState<number>();
  const [secondaryImagesSize, setSecondaryImagesSize] = useState<number[]>();
  const [isAddCategorySelected, setAddCategorySelected] = useState(false);
  const [isOtherStockSelected, setOtherStockSelected] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const res = await fetch("/api/categories");
    const data = (await res.json()) as Category[];
    setCategories(data);
  };

  useEffect(() => {
    void getCategories();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
    setValue,
    clearErrors,
    resetField,
  } = useForm<FormValues>();

  const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 5 MB
  const productNameRegex = /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/;

  const onSubmit2 = async (data: FormValues) => {
    if (upldState === "uploaded") {
      setPrimaryImageSize(undefined);
      setSecondaryImagesSize(undefined);
      setUpldState("stand_by");
      reset();
      return;
    }
    if (upldState === "error") {
      setUpldState("stand_by");
      return;
    }

    if (!data.primaryImage[0]) return;
    setUpldState("loading");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("primary_image", data.primaryImage[0]);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category_id", data.categoryId);
    formData.append("color", "red");

    for (const secondaryFile of Array.from(data.secondaryImages)) {
      if (!secondaryFile) continue;
      formData.append("secondary_images", secondaryFile as unknown as File);
      console.log("file appended");
    }

    //console.log(data.primaryImage[0]);
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
    setUpldState("uploaded");
  };

  return (
    <div className="flex justify-around max-md:justify-between">
      <label htmlFor="my-modal-5" className="btn btn-ghost btn-sm">
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Edit / Add_To_Queue">
            <path
              id="Vector"
              d="M3 9V19.4C3 19.9601 3 20.2399 3.10899 20.4538C3.20487 20.642 3.35774 20.7952 3.5459 20.8911C3.7596 21 4.0395 21 4.59846 21H15.0001M14 13V10M14 10V7M14 10H11M14 10H17M7 13.8002V6.2002C7 5.08009 7 4.51962 7.21799 4.0918C7.40973 3.71547 7.71547 3.40973 8.0918 3.21799C8.51962 3 9.08009 3 10.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07969 21.0002 6.19978L21.0002 13.7998C21.0002 14.9199 21.0002 15.48 20.7822 15.9078C20.5905 16.2841 20.2842 16.5905 19.9079 16.7822C19.4805 17 18.9215 17 17.8036 17H10.1969C9.07899 17 8.5192 17 8.0918 16.7822C7.71547 16.5905 7.40973 16.2842 7.21799 15.9079C7 15.4801 7 14.9203 7 13.8002Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </label>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal absolute">
        <form
          className="modal-box flex w-auto max-w-5xl flex-col"
          onSubmit={(event) => void handleSubmit(onSubmit2)(event)}
        >
          <h3 className="card-title">Sube un Producto!</h3>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Imágen Principal</span>
              <span className="label-text-alt">
                {primaryImageSize ? showSize(primaryImageSize) : ""}
              </span>
            </label>

            <input
              type="file"
              accept="image/*"
              onClick={() => {
                resetField("primaryImage");
                setPrimaryImageSize(undefined);
              }}
              {...register("primaryImage", {
                required: true,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return;
                  const file = e.target.files[0];
                  if (!file) return;
                  setPrimaryImageSize(file?.size);
                  if (file?.size > MAX_IMAGE_SIZE) {
                    setError("primaryImage", {
                      message: "muy grande 😥",
                    });
                    return;
                  }
                  // Use the file as needed
                },
              })}
              className="file-input file-input-bordered w-full max-w-xs"
            />

            {errors.primaryImage ? (
              <div className="badge  badge-warning my-[2px] gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {errors.primaryImage.message ?? "obligatorio"}
              </div>
            ) : primaryImageSize && primaryImageSize > 1 * 1024 * 1024 ? (
              <div className="badge  badge-warning my-[2px] gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {"muy grande 😥"}
              </div>
            ) : (
              <div className="h-6"></div>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Imágenes Secundarias</span>
              <span className="label-text">
                {secondaryImagesSize
                  ? showSize(secondaryImagesSize.reduce((a, b) => a + b))
                  : ""}
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onClick={() => {
                resetField("secondaryImages");
                setSecondaryImagesSize(undefined);
              }}
              {...register("secondaryImages", {
                onChange(event: React.ChangeEvent<HTMLInputElement>) {
                  const files = event.target.files;
                  if (!files) return;
                  const imagesArr = Array.from(files);

                  if (imagesArr.length === 0) return;

                  setSecondaryImagesSize(imagesArr.map((item) => item.size));

                  const isAnyImageBig = imagesArr.some(
                    (img) => img.size > MAX_IMAGE_SIZE,
                  );

                  if (isAnyImageBig) {
                    setError("secondaryImages", {
                      message: "una es muy grande 😥",
                    });
                  }

                  if (imagesArr.length > 3) {
                    setError("secondaryImages", {
                      message: "demasiadas",
                    });
                  }
                  // Use the file as needed
                },
              })}
              className="file-input file-input-bordered w-full max-w-xs"
            />
            {errors.secondaryImages ? (
              <div className="badge badge-warning my-[2px] gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {errors.secondaryImages.message ?? "obligatorio"}
              </div>
            ) : secondaryImagesSize &&
              secondaryImagesSize.some(
                (imgSize) => imgSize > 1 * 1024 * 1024,
              ) ? (
              <div className="badge  badge-warning my-[2px] gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                {"una es muy grande 😥"}
              </div>
            ) : (
              <div className="h-6"></div>
            )}
          </div>
          <div className="flex max-w-xs justify-between">
            <div className="flex w-[47%] flex-col">
              <input
                type="text"
                placeholder="Nombre"
                {...register("name", {
                  required: true,
                  pattern: productNameRegex,
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name ? (
                <div className="badge badge-warning my-[2px] gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  {errors.name.message ?? "obligatorio"}
                </div>
              ) : (
                <div className="h-6"></div>
              )}
            </div>
            <div className="flex w-[47%] flex-col">
              <input
                type="number"
                placeholder="Precio"
                {...register("price", { required: true })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.price ? (
                <div className="badge badge-warning my-[2px] gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  {errors.price.message ?? "obligatorio"}
                </div>
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
          <div className="flex max-w-xs justify-between">
            <div className="flex w-[47%] flex-col justify-around">
              <div className="flex flex-row items-center justify-between">
                <label htmlFor="stock-select">Cantidad: </label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  {...register("stock")}
                  defaultValue={"1"}
                  className={`${
                    !isOtherStockSelected ? "hidden" : ""
                  } input input-bordered w-[65px]`}
                />
                {!isOtherStockSelected && (
                  <select
                    id="stock-select"
                    onChange={(e) => {
                      if (e.target.value === "Otro") {
                        setValue("stock", "4");
                        setOtherStockSelected(true);
                        clearErrors("stock");
                        return;
                      }

                      setValue("stock", e.target.value);
                      clearErrors("stock");
                    }}
                    className="select select-bordered w-[65px]"
                  >
                    {[1, 2, 3].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                    <option value={"Otro"}>Otro</option>
                  </select>
                )}
              </div>

              <div className="h-6"></div>
            </div>
            <div className="flex w-[47%] flex-col">
              <input
                type="text"
                placeholder="Categoría"
                className={`${
                  !isAddCategorySelected ? "hidden" : ""
                } input input-bordered w-full max-w-xs`}
                {...register("categoryId", {
                  required: true,
                })}
              />
              {!isAddCategorySelected && (
                <select
                  onChange={(e) => {
                    if (e.target.value === "Añadir") {
                      setValue("categoryId", "");
                      setAddCategorySelected(true);
                      clearErrors("categoryId");
                      return;
                    }
                    setValue("categoryId", e.target.value);
                    clearErrors("categoryId");
                  }}
                  defaultValue={"category-default"}
                  className="select select-bordered"
                >
                  <option value={"category-default"} disabled>
                    Categoría
                  </option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                  <option value={"Añadir"} className="btn">
                    + Añadir
                  </option>
                </select>
              )}
              {errors.categoryId ? (
                <div className="badge badge-warning my-[2px] gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  {errors.categoryId.message ?? "obligatorio"}
                </div>
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
          <textarea
            className="textarea textarea-bordered w-full max-w-xs"
            placeholder="Descripción"
            {...register("description")}
          ></textarea>
          {errors.description ? (
            <div className="badge badge-warning my-[2px] gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              {errors.description.message}
            </div>
          ) : (
            <div className="h-6"></div>
          )}

          <div className={`modal-action mt-0`}>
            <button
              className={`btn ${upldState === "loading" ? "loading" : ""} ${
                upldState === "uploaded" ? "btn-success" : ""
              }
                ${upldState === "error" ? "btn-error" : ""}
                `}
              type="submit"
              disabled={upldState === "loading"}
            >
              {upldState}
            </button>
            <label
              onClick={() => {
                setPrimaryImageSize(undefined);
                setSecondaryImagesSize(undefined);
                setUpldState("stand_by");
                setAddCategorySelected(false);
                setOtherStockSelected(false);
                reset();
              }}
              htmlFor="my-modal-5"
              className="btn"
            >
              Cancelar
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

function showSize(sizeInBytes: number) {
  const sizeInMb = sizeInBytes / 1024;
  if (sizeInMb < 1000) return `${sizeInMb.toFixed(2)}Kb`;
  else return `${(sizeInMb / 1024).toFixed(2)}Mb`;
}

export default ProductForm;
