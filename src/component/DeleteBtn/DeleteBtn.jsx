import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGlobalContext } from "../../context/GlobalContext";

const DeleteBtn = ({ row }) => {
  const data = row.original;
  const { data: globalData, setData } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {
    const result = globalData.filter((datum) => datum.id != data.id);
    setData(result);
  };

  return (
    <div className="flex items-center">
      <button
        className="text-2xl cursor-pointer text-red-600"
        onClick={() => setShowModal(true)}
      >
        <RiDeleteBin6Line />
      </button>

      {showModal && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-[20px] rounded-md shadow-md">
            <h2 className="mt-0">Delete Confirmation</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-5 flex justify-between items-center">
              <button
                className="bg-[#e53e3e] text-white hover:opacity-80 py-2 px-5 rounded-md"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
              <button
                className="bg-[#718096] text-white hover:opacity-80  py-2 px-5 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
