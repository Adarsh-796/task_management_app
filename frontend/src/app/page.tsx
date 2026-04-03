import Image from "next/image";
import RegistrationForm from "./components/registration-form";
import CreateTask from "./components/create-task";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <RegistrationForm />
      <CreateTask />
    </div>
  );
}
