"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/Input";
import { UserFormData, User } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addUser, setUsers } from "@/store/userSlice";
import { v4 as uuidv4 } from "uuid";
import FileUploader from "@/components/FileUploader";

const UserFormPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = searchParams.get("id");

  const users = useAppSelector((state) => state.users.users);
  const existingUser = users.find((user) => user.id === userId);

  const [preview, setPreview] = useState<string | null>(
    existingUser?.photo || null
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  useEffect(() => {
    if (existingUser) {
      reset({
        name: existingUser.name,
        email: existingUser.email,
      });
    }
  }, [existingUser, reset]);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setValue("photo", file);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("photo", file);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    let imageUrl = existingUser?.photo || "";

    if (data.photo && data.photo instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(data.photo);
      await new Promise((resolve) => (reader.onloadend = resolve));
      imageUrl = reader.result as string;
    }

    const user: User = {
      id: existingUser ? existingUser.id : uuidv4(),
      ...data,
      photo: imageUrl,
    };

    if (existingUser) {
      dispatch(
        setUsers(users.map((u) => (u.id === existingUser.id ? user : u)))
      );
    } else {
      dispatch(addUser(user));
    }

    router.push("/");
  };

  return (
    <div className="flex flex-col flex-1 items-start gap-5 py-16 px-5 md:px-8 lg:p-14">
      <h1 className="h1-bold">
        {existingUser ? "Atualizar " : "Cadastrar "} Usuário
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Foto</label>
          <FileUploader
            fieldChange={handleFileChange}
            mediaUrl={preview || ""}
          />
        </div>

        <div>
          <label className="block">Nome</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Nome é obrigatório" }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block">Email</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email é obrigatório" }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex justify-between">
          <Button className="bg-red" onClick={() => router.push("/")}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary">
            {existingUser ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserFormPage;
