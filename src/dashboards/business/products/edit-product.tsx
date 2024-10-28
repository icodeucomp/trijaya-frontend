"use client";

import * as React from "react";

import { useGetApi, usePost, useToggleState, useUpload } from "@/hooks";

import { AnimatePresence } from "framer-motion";

import { Modal } from "@/dashboards/modal";
import { Button, Img } from "@/components";

import { FaMinus } from "react-icons/fa6";

import { BusinessSectorTypes, ResponseBusinessSectorTypes } from "@/types";
import { UploadTypes } from "@/dashboards/types";

interface UploadsTypes {
  uploadedFiles: UploadTypes[];
}

export const EditProduct = ({ slugProduct, businessId, slug }: { slugProduct: string; businessId: number; slug: string }) => {
  const [ref, modal, toggleModal] = useToggleState();

  const initValue = { title: "", description: "", media: [] };

  const { response: resProduct } = useGetApi<ResponseBusinessSectorTypes>({ path: `/products/${slugProduct}` });
  const { execute, loading } = usePost("PATCH", `business/product/${slug}`);
  const { uploading, uploadFile, response: dataImage } = useUpload<UploadsTypes>();

  const [product, setProduct] = React.useState<Partial<BusinessSectorTypes>>(initValue);
  const [errors, setErrors] = React.useState<boolean>(false);

  const handleClose = () => {
    if (product.title !== resProduct?.data.title || product.description !== resProduct?.data.description) {
      if (confirm("Are you sure you want to close? Your data will not be saved!")) {
        setProduct(initValue);
        toggleModal();
        return;
      } else {
        return;
      }
    }
    toggleModal();
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    await uploadFile(files!, `type=business&category=${slug}&business-type=product`);

    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      slug: file.name,
    }));

    setProduct((prevProduct) => ({ ...prevProduct, media: [...(prevProduct.media || []), ...newMedia] }));
  };

  const handleDeleteImage = (index: number) => {
    setProduct((prevProduct) => ({ ...prevProduct, media: prevProduct.media?.filter((_, i) => i !== index) }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateFields: Partial<BusinessSectorTypes> = {};
    updateFields.businessId = businessId;

    const prevImage = product?.media?.filter((prev) => prev.url.includes("icodeu-storage")).map((upload) => ({ url: upload.url, slug: upload.slug }));
    const uploadImage = dataImage?.uploadedFiles.map((upload) => ({ url: upload.url, slug: upload.name }));
    const images = [...(prevImage || []), ...(uploadImage || [])];

    if (product.title !== resProduct?.data.title) {
      updateFields.title = product.title;
    }
    if (product.description !== resProduct?.data.description) {
      updateFields.description = product.description;
    }
    if (product.media !== resProduct?.data.media) {
      updateFields.media = images;
    }

    if (Object.keys(updateFields).length < 2) {
      setErrors(true);
      return;
    }

    execute(`/products/${slugProduct}`, updateFields);
  };

  React.useEffect(() => {
    if (resProduct) {
      setProduct({
        title: resProduct.data.title,
        media: resProduct.data.media,
        description: resProduct.data.description,
      });
    }
  }, [resProduct]);

  return (
    <div ref={ref}>
      <Button onClick={toggleModal} className="btn-primary">
        Edit
      </Button>

      <AnimatePresence>
        {modal && (
          <Modal isVisible={modal} onClose={handleClose} className="max-w-2xl">
            <h3 className="text-lg font-semibold text-center sm:text-start text-primary">Add Product</h3>
            <form onSubmit={handleSubmitForm} className="w-full mt-4 space-y-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="title"
                  className="floating-input peer"
                  placeholder=" "
                  value={product.title}
                  onChange={(e) => setProduct((prev) => ({ ...prev, title: e.target.value }))}
                />
                <label
                  htmlFor="title"
                  className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                  Title
                </label>
              </div>
              {errors && !product.title && <small className="w-full text-secondary">Enter title please!</small>}
              <div className="relative w-full">
                <input
                  type="text"
                  id="description"
                  className="floating-input peer"
                  placeholder=" "
                  value={product.description}
                  onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}
                />
                <label
                  htmlFor="description"
                  className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                  Description
                </label>
              </div>
              {errors && !product.description && <small className="w-full text-secondary">Enter description please!</small>}
              <div className="space-y-4">
                <div className="relative flex flex-row items-center overflow-hidden border rounded-lg border-gray/50">
                  <input type="file" id="images" hidden accept="image/*" multiple onChange={handleImagesChange} />
                  <label
                    htmlFor="images"
                    className="block px-4 py-2 mr-4 text-sm font-semibold border-0 cursor-pointer rounded-s-lg whitespace-nowrap bg-light-gray text-primary hover:bg-blue-200"
                  >
                    Choose file
                  </label>
                  <label className="text-sm text-slate-500 whitespace-nowrap">{product.media?.length} Images</label>
                  <small className="pr-2 ms-auto text-gray/70">Max 5mb. (aspect ratio of 1:1)</small>
                </div>
                {errors && !product.media?.length && <small className="w-full text-secondary">Enter images please!</small>}
                <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3">
                  {product?.media?.map((image, index) => (
                    <div key={index} className="relative">
                      <button
                        onClick={() => handleDeleteImage(index)}
                        type="button"
                        className="absolute flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-2 z-1 bg-secondary"
                      >
                        <FaMinus className="fill-light" />
                      </button>
                      <Img src={image.url || "/temp-business.webp"} alt={image.slug} className="w-48 mx-auto rounded-lg aspect-square" cover />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end p-2">
                {loading || uploading ? (
                  <div className="loader"></div>
                ) : (
                  <Button type="submit" className="btn-primary">
                    Submit Product
                  </Button>
                )}
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
