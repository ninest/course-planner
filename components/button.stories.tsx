import { Button } from "./button";

export const ButtonsDemo = () => {
  return (
    <div className="space-y-10">
      <section className="flex flex-col space-y-5">
        <Button variant={"primary"}>Primary button</Button>
        <Button variant={"primary-danger"}>Primary danger button</Button>
        <Button variant={"secondary"}>Secondary button</Button>
        <Button variant={"secondary-success"}>Secondary success</Button>
        <Button variant={"secondary-danger"}>Secondary danger</Button>
        <Button variant={"ghost"}>Ghost button</Button>
      </section>
      <section className="flex space-x-5">
        <Button variant={"primary"}>Primary one</Button>
        <Button variant={"ghost"}>Ghost one</Button>
        <Button variant={"secondary"}>Secondary one</Button>
      </section>
    </div>
  );
};
