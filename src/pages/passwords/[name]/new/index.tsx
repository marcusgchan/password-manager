import React, {
  ChangeEvent,
  FormEvent,
  useId,
  useState,
  useEffect,
} from "react";
import Head from "../../../../shared/components/Head";
import { useSession } from "next-auth/react";
import { trpc } from "../../../../utils/trpc";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import Notifier from "../../../../shared/components/Notifier";
import type { Notifier as NotifierType } from "../../../../shared/types";

const New = () => {
  const id = useId();
  const router = useRouter();
  const mutation = trpc.useMutation("site.createSite", {
    onError: (error) => {
      const errorCode = error.shape?.data?.code;
      setMessageQueue((prev) => [
        { message: errorCode, type: "ERROR" },
        ...prev,
      ]);
    },
  });
  const session = useSession();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const [messageQueue, setMessageQueue] = useState([] as NotifierType[]);
  useEffect(() => {
    if (messageQueue.length > 0) {
      const id = setInterval(() => {
        setMessageQueue((prev: NotifierType[]) => {
          const [, ...rest] = prev;
          return rest;
        });
      }, 2000);
    }
    return () => clearInterval(id);
  }, [messageQueue, id]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = session.data as Session & { id: string };
    mutation.mutate({ userId: data.id, ...inputs });
  }

  function goBack(e: FormEvent) {
    e.preventDefault();
    router.back();
  }

  function handleInputs(e: ChangeEvent<HTMLInputElement>, type: string) {
    setInputs({
      ...inputs,
      [type]: e.currentTarget.value,
    });
  }

  return (
    <>
      <Head title="Add new password" />
      <main className="">
        <Notifier messageQueue={messageQueue} />
        <form
          className="grid grid-cols-1 gap-2 mx-auto max-w-xs p-2"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl">Add New Site</h1>
          <div className="h-8"></div>
          <Row
            type="name"
            input={inputs.name}
            handleInputs={handleInputs}
            id={id + "-name"}
            label="Name"
          />
          <Row
            type="email"
            input={inputs.email}
            handleInputs={handleInputs}
            id={id + "-email"}
            label="Email"
          />
          <Row
            type="password"
            input={inputs.password}
            handleInputs={handleInputs}
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
  input,
  label,
  type,
  handleInputs,
}: {
  id: string;
  label: string;
  type: string;
  input: string;
  handleInputs: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
}) => {
  return (
    <div className="flex justify-between">
      <label htmlFor={id} className="w-32 grid ">
        <div>{label}</div>
      </label>
      <input
        id={id}
        value={input}
        onChange={(e) => handleInputs(e, type)}
        type="text"
        className=" border-b-2 border-black w-full"
      />
    </div>
  );
};

export default New;
