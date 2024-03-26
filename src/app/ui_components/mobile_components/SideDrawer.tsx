import { useState, ReactNode, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImMenu } from "react-icons/im";

interface SideDrawerProps {
    children: ReactNode;
}

const SideDrawer = ({ children }: SideDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden absolute top-0 left-0 m-4 z-50"
            >
                <ImMenu size={24} />
            </Button>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
            <aside
                ref={drawerRef}
                className={`w-64 h-full absolute top-0 left-0 bg-white shadow-lg z-50 transform lg:transform-none transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {children}
            </aside>
        </div>
    );
};

export default SideDrawer;
