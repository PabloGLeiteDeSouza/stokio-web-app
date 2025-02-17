"use client";

import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import React from "react";

const quantidades = createListCollection({
    items: [
      { label: "10", value: "10" },
      { label: "25", value: "25" },
      { label: "50", value: "50" },
      { label: "100", value: "100" },
    ],
  })

type SelectQuantidadePaginasProps = {
    onChange?: (value: string) => void;
    value?: string;
}

const SelectQuantidadePaginas: React.FC<SelectQuantidadePaginasProps> = ({ onChange, value }) => {
    return (
        <SelectRoot suppressHydrationWarning defaultValue={value ? [value] : undefined} onValueChange={onChange ? (v) => onChange(v.value[0]) : undefined} w="20" collection={quantidades} >
            <SelectTrigger>
                <SelectValueText />
            </SelectTrigger>
            <SelectContent>
                {quantidades.items.map((quantidade) => (
                    <SelectItem item={quantidade} key={quantidade.value}>{quantidade.label}</SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    )
}

export default SelectQuantidadePaginas;