"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { useGet, usePost, useUpload } from "@/hooks";

import { Products, Projects, Services } from "./adding-business";
import { Button, Img } from "@/components";

import { PiCaretLeftLight } from "react-icons/pi";

import { UploadTypes } from "../types";
import { BusinessesTypes, ResponseBusinessTypes } from "@/types";

export const EditBusiness = ({ slug }: { slug: string }) => {
  const { back } = useRouter();

  // set data
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imageHeader, setImageHeader] = React.useState<UploadTypes>();
  const [productHeader, setProductHeader] = React.useState<UploadTypes>();

  // get one business by slug, patch data, and upload image api
  const { response: business, loading } = useGet<ResponseBusinessTypes>(`/business/${slug}`);
  const { execute, loading: loadData } = usePost("PATCH", `/business`);
  const { uploading: uploadingImageHeader, uploadFile: uploadImageHeader, response: dataImageHeader } = useUpload<UploadTypes>();
  const { uploading: uploadingImageProduct, uploadFile: uploadImageProduct, response: dataImageProduct } = useUpload<UploadTypes>();

  // handle back route
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      title !== business?.data.title ||
      description !== business?.data.description ||
      imageHeader?.url !== business?.data.imageHeader.url ||
      productHeader?.url !== business?.data.productHeader.url
    ) {
      if (confirm("Are you sure to back to previous page? Your data will not be saved!")) {
        setTitle(business?.data.title || "");
        setDescription(business?.data.description || "");
        setImageHeader({ url: business?.data.imageHeader.url || "", name: business?.data.imageHeader.slug || "", size: "" });
        setProductHeader({ url: business?.data.productHeader.url || "", name: business?.data.productHeader.slug || "", size: "" });
        back();
        return;
      } else {
        return;
      }
    }
    back();
  };

  // handle image header upload
  const handleFileImageHeader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    await uploadImageHeader(file!, `type=business&category=${slug}`);
    setImageHeader({ url: URL.createObjectURL(file!), name: file?.name || "", size: "" });
  };

  // handle image product upload
  const handleFileImageProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    await uploadImageProduct(file!, `type=business&category=${slug}`);
    setProductHeader({ url: URL.createObjectURL(file!), name: file?.name || "", size: "" });
  };

  // handle edit data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateFields: Partial<BusinessesTypes> = {};

    if (title !== business?.data.title) {
      updateFields.title = title;
    }
    if (title !== business?.data.description) {
      updateFields.description = description;
    }
    if (imageHeader?.name !== business?.data.imageHeader?.slug) {
      updateFields.imageHeader = {
        ...updateFields.imageHeader,
        slug: dataImageHeader?.name as string,
        url: dataImageHeader?.url as string,
      };
    }
    if (productHeader?.name !== business?.data.productHeader?.slug) {
      updateFields.productHeader = {
        ...updateFields.productHeader,
        slug: dataImageProduct?.name as string,
        url: dataImageProduct?.url as string,
      };
    }

    if (Object.keys(updateFields).length < 0) {
      return;
    }

    execute(`/business/${slug}`, updateFields);
  };

  React.useEffect(() => {
    if (business?.data !== null) {
      setTitle(business?.data.title || "");
      setDescription(business?.data.description || "");
      setImageHeader({ url: business?.data.imageHeader.url || "", name: business?.data.imageHeader.slug || "", size: "" });
      setProductHeader({ url: business?.data.productHeader.url || "", name: business?.data.productHeader.slug || "", size: "" });
    }
  }, [business]);

  return (
    <>
      <div className="px-2 py-4">
        <span className="flex items-center gap-2">
          <button onClick={handleBack}>
            <PiCaretLeftLight size={24} />
          </button>
          <h1 className="heading">Edit Category</h1>
        </span>
      </div>
      {loading || loadData ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-screen-md px-4 pt-8 mx-auto space-y-8 sm:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 place-items-center">
              {uploadingImageHeader ? (
                <div className="flex justify-center py-16">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="relative text-center">
                  <small className="w-full">maximum image size 5mb. (aspect ratio of 1:1)</small>
                  <Img src={imageHeader?.url || "/temp-business.webp"} alt={title} className="rounded-lg w-80 aspect-square" cover />

                  <label htmlFor="image-header" className="duration-300 cursor-pointer md:text-xl text-primary hover:text-primary/80">
                    Upload Image Header
                  </label>
                  <input type="file" accept="image/*" id="image-header" className="sr-only" onChange={handleFileImageHeader} />
                </div>
              )}
              {uploadingImageProduct ? (
                <div className="flex justify-center py-16">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="relative text-center">
                  <small className="w-full">maximum image size 5mb. (aspect ratio of 1:1)</small>
                  <Img src={productHeader?.url || "/temp-business.webp"} alt={title} className="rounded-lg w-80 aspect-square" cover />

                  <label htmlFor="image-product" className="duration-300 cursor-pointer md:text-xl text-primary hover:text-primary/80">
                    Upload Photo Product
                  </label>
                  <input type="file" accept="image/*" id="image-product" className="sr-only" onChange={handleFileImageProduct} />
                </div>
              )}
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="title"
                value={title}
                className="floating-input peer"
                placeholder=" "
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="title"
                className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                title
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="description"
                value={description}
                className="floating-input peer"
                placeholder=" "
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="description"
                className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
              >
                description
              </label>
            </div>
            {/* {error && !business?.data.title && <small className="text-secondary">Enter document name</small>} */}
            {uploadingImageHeader && uploadingImageProduct ? (
              <div className="flex justify-center py-16">
                <div className="loader"></div>
              </div>
            ) : (
              <Button type="submit" className="btn-primary">
                Submit Business
              </Button>
            )}
          </form>
          <Products data={business?.data.Product} slugBusiness={slug} id={business?.data.id || 0} />
          <Projects data={business?.data.Project} slugBusiness={slug} id={business?.data.id || 0} />
          <Services data={business?.data.Service} slugBusiness={slug} id={business?.data.id || 0} />
        </>
      )}
    </>
  );
};
