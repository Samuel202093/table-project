import {Dialog} from "@radix-ui/themes"
import { FaRegEdit } from "react-icons/fa";
import  EditDialogForm from './EditDialogForm';


export function EditDialog({row}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="text-2xl cursor-pointer text-blue-600"
        //   onClick={() => handleRowClick(row)}
        >
          <FaRegEdit />
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px] lg:max-w-[525px] h-fit">
          <Dialog.Title className="pb-4 border-b border-b-slate-400">
            Add New Exam
          </Dialog.Title>
        <EditDialogForm data={row.original}/>
      </Dialog.Content>
    </Dialog.Root>
  );
}
