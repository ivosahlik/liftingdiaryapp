"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker({ defaultDate }: { defaultDate: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateStr = searchParams.get("date") ?? defaultDate;
  const selected = parse(dateStr, "yyyy-MM-dd", new Date());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={
          buttonVariants({ variant: "outline", size: "default" }) +
          " w-48 justify-start"
        }
      >
        <CalendarIcon className="size-4" />
        {format(selected, "do MMM yyyy")}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => {
            if (d) {
              router.push(
                `/dashboard?date=${format(d, "yyyy-MM-dd")}`
              );
              setOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
