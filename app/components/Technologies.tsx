import { forwardRef, memo, useImperativeHandle, useState } from "react"
import { technologies } from "@/data/technologies"

export type TechnologiesRef = {
  getValue: () => string
}

interface Props {
  onSearch: (tech: string) => void
}

export const Technologies = memo(
  forwardRef<TechnologiesRef, Props>(({ onSearch }, ref) => {
    const [value, setValue] = useState<string>("")

    const getValue = () => {
      return value
    }

    useImperativeHandle(ref, () => ({
      getValue,
    }))

    const handleSearchTech = (tech: string) => {
      setValue(tech)
      onSearch(tech)
    }

    return (
      <div className="sticky top-24 bg-white p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_#FFCC00]">
        <h2 className="font-heading text-base text-xl font-bold text-center">
          Technologies
        </h2>
        <div className="flex flex-row flex-wrap col-span-5 gap-2 mt-5">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="rounded cursor-pointer bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200 ease-in-out duration-300"
              onClick={() => handleSearchTech(tech)}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    )
  }),
)
