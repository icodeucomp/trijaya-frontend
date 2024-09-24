import { Button } from "@/components";
import { useToggleState } from "@/hooks";
import { GoTrash } from "react-icons/go";

export const DeleteArticle = () => {
  const [ref, modal, toggleModal] = useToggleState();

  return (
    <div ref={ref}>
      <button onClick={toggleModal} className="p-2 duration-300 border rounded-full border-secondary bg-light hover:bg-secondary group">
        <GoTrash size={20} className="text-secondary group-hover:text-light" />
      </button>

      {modal && (
        <form className="w-full space-y-4 sm:min-w-xs">
          <div className="">
            <h1 className="mb-4 text-sm font-semibold text-center sm:text-start text-primary-1 sm:text-lg">Delete Blog</h1>
            <p className="text-sm text-medium text-dark-1 sm:text-base">are you sure you want to permanently delete this blog?</p>
          </div>
          <Button type="submit" className="btn-primary">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
