"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const navLink =
    "relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/65 backdrop-blur-xl border-b border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-popover-foreground">
        <Link href="/" className="text-2xl font-semibold tracking-[-0.04em]">
          PastaHouse
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#hero" className={navLink}>
            Home
          </a>
          <a href="#menu" className={navLink}>
            Menu
          </a>
          <a href="#testimonials" className={navLink}>
            Reviews
          </a>
          <motion.div whileHover={{ rotate: 1.08 }}>
            <Button className="rounded-full px-6 py-5 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20">
              Contact
            </Button>
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer px-auto">
              <div className="cursor-pointer">
                <Menu className="w-7 h-7" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 rounded-2xl mt-3 p-2 bg-accent-foreground"
            >
              <DropdownMenuItem>
                <a href="#hero">Home</a>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <a href="#menu">Menu</a>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <a href="#reviews">Reviews</a>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <a href="#footer">Contact</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
