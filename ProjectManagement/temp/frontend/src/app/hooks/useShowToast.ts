import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

const useShowToast = () => {
    const { toast } = useToast();

    const showToast = useCallback(
        (title:string, description:any, variant:any) => {
            toast({
                title: title,
                description: description,
                variant: variant,
                duration: 2000,
            });
        },
    [toast]);

    return showToast;
}

export default useShowToast;
