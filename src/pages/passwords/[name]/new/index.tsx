import React, { ChangeEvent, FormEvent, useId, useState, useRef } from "react";
import Head from "../../../../shared/components/Head";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useSnackbarDispatch } from "../../../../contexts/SnackbarContext";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

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
  });
  const session = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

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
          />
          <Row
            type="email"
            register={register("email")}
            id={id + "-email"}
            label="Email"
          />
          <Row
            type="password"
            register={register("password")}
            id={id + "-password"}
            label="Password"
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
}: {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn;
}) => {
  return (
    <div className="flex justify-between">
      <label htmlFor={id} className="w-32 grid ">
        <div>{label}</div>
      </label>
      <input
        id={id}
        {...register}
        type="text"
        className=" border-b-2 border-black w-full"
      />
    </div>
  );
};

export default New;
