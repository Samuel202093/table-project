import { RiDeleteBin6Line } from "react-icons/ri";
import { EditDialog } from "../EditDialog/EditDialog";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

const handleRowClick = (rowData) => {
  // Your custom logic here, using rowData as needed
  console.log("Row clicked:", rowData);
};

export const columnData = [
  {
    header: "Topic_ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: ({ row }) => (
      <div className="space-x-3 flex items-center justify-center">
        <EditDialog row={row} />
        <DeleteBtn row={row} />
      </div>
    ),
  },
];
