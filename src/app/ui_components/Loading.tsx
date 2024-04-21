import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return(
        <section className="flex gap-4 px-4">
            <div className='flex items-center space-x-4 w-[45%]'>
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className='space-y-2'>
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
            </div>
            <div className='flex items-center space-x-4 w-[45%]'>
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className='space-y-2'>
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                </div>
            </div>
        </section>
    );
}

export default Loading;