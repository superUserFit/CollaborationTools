import { Card } from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink
} from '@/components/ui/breadcrumb';

import { SlashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

const CustomBreadcrumb = () => {
    return (
        <Card className="flex justify-between items-center pb-2 pl-4 m-2 rounded-md">
        <Breadcrumb>
            <BreadcrumbList className='flex items-center mt-2'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>
                        <strong>Home</strong>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <SlashIcon/>
                <BreadcrumbItem>
                    <Badge className='cursor-pointer'><h1>Settings</h1></Badge>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        </Card>
    );
}

export default CustomBreadcrumb;