import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import MainSideBar from "./ui_components/MainSideBar";
import SecondSideBar from "./ui_components/SecondSideBar";


export default function Home() {
  return (
    <main className="flex overflow-x-hidden">
      <header className="flex">
        <MainSideBar/>
        <SecondSideBar/>
      </header>
      <section className="w-full flex-col">
        <nav className='flex justify-between items-center bg-gray-300 dark:bg-gray-900 pb-2 pl-2'>
          <Breadcrumb>
            <BreadcrumbList className='flex items-center mt-2'>
              <BreadcrumbItem>
                <Badge className='cursor-pointer'>
                  <h1>Home</h1>
                </Badge>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <div className="flex gap-4">
          <h1>Dashboard</h1>
        </div>
      </section>
    </main>
  );
}
