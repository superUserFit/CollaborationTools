import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";

export default function Projects() {
  return (
    <main className="flex overflow-x-hidden">
      <header className="flex">
        <MainSideBar/>
        <SecondSideBar/>
      </header>
      <section className="w-full flex-col">
        <nav className="bg-gray-300 dark:bg-gray-900 h-10 mb-4"></nav>
        <div className="flex gap-4">
        </div>
      </section>
    </main>
  );
}
