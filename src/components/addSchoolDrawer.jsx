/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { addNewSchool } from "@/api/schools";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "School name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

const AddSchoolDrawer = ({ fetchSchools }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddSchool,
    error: errorAddSchool,
    data: dataAddSchool,
    fn: fnAddSchool,
  } = useFetch(addNewSchool);

  const onSubmit = async (data) => {
    fnAddSchool({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddSchool?.length > 0) {
      fetchSchools();
    }
  }, [loadingAddSchool]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">
          Add School
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New School</DrawerTitle>
        </DrawerHeader>
        <form className="flex gap-2 p-4 pb-0">
          {/* School Name */}
          <Input placeholder="School name" {...register("name")} />

          {/* School Logo */}
          <Input
            type="file"
            accept="image/*"
            className=" file:text-gray-500"
            {...register("logo")}
          />

          {/* Add Button */}
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            variant="destructive"
            className="w-40"
          >
            Add
          </Button>
        </form>
        <DrawerFooter>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
          {errorAddSchool?.message && (
            <p className="text-red-500">{errorAddSchool?.message}</p>
          )}
          {loadingAddSchool && <BarLoader width={"100%"} color="#36d7b7" />}
          <DrawerClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddSchoolDrawer;
