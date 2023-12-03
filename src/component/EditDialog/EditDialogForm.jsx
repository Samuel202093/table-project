import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../../context/GlobalContext";

const FormSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(5, { message: "Must be 5 or more characters long" }),
  email: z.string().email({ message: "Must be a valid email" }),
  role: z.string().min(5, { message: "Must be assigned a role" }),
});

const EditDialogForm = ({ data }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    },
  });

  const { data: globalData, setData } = useGlobalContext();

  const onSubmit = (values) => {
    const result = globalData.map((datum) => {
      if (datum.id == values.id) {
        return values;
      }
      return datum;
    });
    setData(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
          {/* ID */}
          <div className="id-container space-y-2">
            <p className="text-xs text-subText">ID</p>
            <input
              className="px-2 py-2 border rounded-md text-sm"
              placeholder={data.id}
              {...register("id")}
              disabled
              autofocus={false}
            />
            {errors.id && (
              <span className="text-red-600 text-xs font-medium">
                {errors.id.message}
              </span>
            )}
          </div>
          {/* Name */}
          <div className="id-container space-y-2">
            <p className="text-xs text-subText">Name</p>
            <input
              className="px-2 py-2 border w-full rounded-md text-sm"
              placeholder={data.name}
              {...register("name")}
              autofocus={true}
            />
            {errors.name && (
              <span className="text-red-600 text-xs font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
          {/* Email */}
          <div className="id-container space-y-2">
            <p className="text-xs text-subText">Email</p>
            <input
              className="px-2 py-2 border w-full rounded-md text-sm"
              placeholder={data.email}
              {...register("email")}
              autofocus={true}
            />
            {errors.email && (
              <span className="text-red-600 text-xs font-medium">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Role */}
          <div className="id-container space-y-2">
            <p className="text-xs text-subText">Role</p>
            <input
              className="px-2 py-2 border w-full rounded-md text-sm"
              placeholder={data.role}
              {...register("role")}
              autofocus={true}
            />
            {errors.role && (
              <span className="text-red-600 text-xs font-medium">
                {errors.role.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded py-3 bg-slate-800 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditDialogForm;
