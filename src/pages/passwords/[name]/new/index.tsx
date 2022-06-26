import { FormEvent, useId } from "react";
import Head from "../../../../components/shared/Head";

const New = () => {
  const id = useId();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("test");
  }

  function goBack(e: FormEvent) {
    e.preventDefault();
    console.log("back");
  }
  return (
    <>
      <Head title="Add new password" />
      <main className="grid justify-center pt-60">
        <form
          className="grid grid-cols-2 gap-y-4 max-w-xl"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor={id + "-name"}
            className="fit-content justify-self-center"
          >
            Name
          </label>
          <input
            id={id + "-name"}
            type="text"
            className="border-b-2 border-black"
          />
          <label
            htmlFor={id + "-email"}
            className="fit-content justify-self-center"
          >
            Email
          </label>
          <input
            id={id + "-email"}
            type="text"
            className="border-b-2 border-black"
          />
          <label
            htmlFor={id + "-password"}
            className="fit-content justify-self-center"
          >
            Password
          </label>
          <input
            id={id + "-password"}
            type="text"
            className="border-2 border-black"
          />
          <div className="col-span-2"></div>
          <button onClick={goBack}>Back</button>
          <button>Add</button>
        </form>
      </main>
    </>
  );
};

export default New;
