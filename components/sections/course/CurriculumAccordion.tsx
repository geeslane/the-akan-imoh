"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/sections/course/AccordionItem";

type Module = {
  index: string;
  title: string;
  body: string;
};

export function CurriculumAccordion({ modules }: { modules: readonly Module[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="course-outline" id="course-outline">
      <ul>
        {modules.map((item, index) => (
          <AccordionItem
            key={item.index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </ul>
    </div>
  );
}
