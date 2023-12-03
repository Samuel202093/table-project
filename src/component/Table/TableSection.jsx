"use client";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { columnData } from "./ColumnData";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { v4 } from "uuid";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useGlobalContext } from "../../context/GlobalContext";

export default function TableSection(props) {
  const { size } = props;
  const { data: mData } = useGlobalContext();
  const data = useMemo(() => mData, [mData]);
  const columns = useMemo(() => columnData, []);
  const [sorting, setSorting] = useState();
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    const handleSize = () => {
      table.setPageSize(size);
    };

    handleSize();
  }, [size]);

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          className="border py-1 px-2 w-[500px] rounded"
          placeholder="Search"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={v4()}>
              {headerGroup.headers.map((header) => (
                <th
                  key={v4()}
                  className="text-gray-500 font-semibold text-xs"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex gap-2 items-center cursor-pointer">
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    <span>
                      {
                        { asc: <BiCaretUp />, desc: <BiCaretDown /> }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={v4()}>
              {row.getVisibleCells().map((cell) => (
                <td key={v4()} className="text-sm font-medium text-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-y-3 flex justify-between items-center">
        <div className="paginationBtns space-x-2 flex justify-start">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            className="disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200 py-2 px-3 border border-gray-500 rounded-md text-sm text-subText capitalize"
          >
            first
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed py-2 px-3 border border-gray-500 rounded-md text-lg text-subText capitalize"
          >
            <GrFormPrevious />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="disabled:bg-gray-100 disabled:text-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed py-2 px-3 border  border-gray-500 rounded-md text-lg text-subText capitalize"
          >
            <GrFormNext />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 py-2 px-3 border border-gray-500 rounded-md text-sm text-subText capitalize"
          >
            Last
          </button>
        </div>
        <div className="noOfPages">
          <p className="text-sm">
            {" "}
            You are on page: {table.options.state.pagination.pageIndex + 1}
          </p>
          <p className="text-sm text-slate-400">
            Total pages : {table.getPageCount() - 1} page(s)
          </p>
        </div>
      </div>
    </div>
  );
}
