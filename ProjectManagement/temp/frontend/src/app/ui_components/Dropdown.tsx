import {
    Command,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from "@radix-ui/react-icons";

interface DropdownItem {
    key: any;
    label: string;
}

const Dropdown = (
    array: DropdownItem[],
    setValue: React.Dispatch<React.SetStateAction<string>>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant='outline' role='combobox' aria-expanded={isOpen} className="w-[200px] justify-between">
                    {array ? array.find((element) => element.label)?.label : "Select role..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {array.map((element) => (
                            <CommandItem
                                key={element.key}
                                value={element.label}
                                onSelect={(currentValue:any) => {
                                    setValue(currentValue)
                                    setIsOpen(false)
                                }}
                            ></CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default Dropdown;
