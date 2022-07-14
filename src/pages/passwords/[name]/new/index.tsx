import React, { ChangeEvent, FormEvent, useId, useState, useRef } from "react";
import Head from "../../../../shared/components/Head";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useSnackbarDispatch } from "../../../../contexts/SnackbarContext";
import {
  useForm,
  UseFormRegisterReturn,
  FieldErrorsImpl,
  DeepRequired,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().max(255),
  email: z.string().email().max(255),
  password: z.string().max(255),
});

const New = () => {
  const id = useId();
  const router = useRouter();
  const dispatch = useSnackbarDispatch();
  const mutation = trpc.useMutation("site.createSite", {
    onError: (error) => {
      const errorCode = error.shape?.data?.code;
      dispatch({
        type: "QUEUE_NOTIFICATION",
        payload: { message: errorCode, type: "ERROR", id: Date.now() },
      });
    },
    onSuccess: () => {
      dispatch({
        type: "QUEUE_NOTIFICATION",
        payload: {
          message: "Successfully added!",
          type: "SUCCESS",
          id: Date.now(),
        },
      });
    },
  });
  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  function onSubmit(inputs: Inputs) {
    const user = session.data as Session & { id: string };
    mutation.mutate({ userId: user.id, ...inputs });
  }

  function goBack(e: FormEvent) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <Head title="Add new password" />
      <main className="">
        <form
          className="grid grid-cols-1 gap-2 mx-auto max-w-xs p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl">Add New Site</h1>
          <div className="h-8"></div>
          <Row
            type="name"
            register={register("name")}
            id={id + "-name"}
            label="Name"
            errors={errors}
          />
          <Row
            type="email"
            register={register("email")}
            id={id + "-email"}
            label="Email"
            errors={errors}
          />
          <Row
            type="password"
            register={register("password")}
            id={id + "-password"}
            label="Password"
            errors={errors}
          />
          <div className="h-5"></div>
          <div className="flex max-w-xs">
            <button className="flex-1" onClick={goBack}>
              Back
            </button>
            <button className="flex-1">Add</button>
          </div>
        </form>
      </main>
    </>
  );
};

const Row = ({
  id,
  label,
  type,
  register,
  errors,
}: {
  id: string;
  label: string;
  type: "name" | "email" | "password";
  register: UseFormRegisterReturn;
  errors: FieldErrorsImpl<DeepRequired<Inputs>>;
}) => {
  const message = errors[type]?.message;
  return (
    <>
      <div className="flex justify-between">
        <label htmlFor={id} className="w-32 self-center">
          <div>{label}</div>
        </label>
        <div className="relative">
          <input
            id={id}
            {...register}
            type="text"
            className={`border-b-2 border-black w-full bg-opacity-0 ${
              message ? "border-red-600" : ""
            }`}
          />
          <p
            className="h-2 text-xs text-red-600"
            style={{ backgroundColor: "transparent" }}
          >
            {errors[type]?.message}
          </p>
        </div>
      </div>
    </>
  );
};

export default New;
