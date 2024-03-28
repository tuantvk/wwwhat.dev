import React, {
  ChangeEvent,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
  Dispatch,
} from "react"
import { IconSearch, IconXCircle } from "@/icons"
import { cleanQuery } from "@/utils/cleanQuery"

export type SearchRef = {
  getValue: () => string
  setValue: Dispatch<React.SetStateAction<string>>
}

export const Search = memo(
  forwardRef<SearchRef>((_, ref) => {
    const [value, setValue] = useState<string>("")

    const getValue = () => {
      return cleanQuery(value)
    }

    useImperativeHandle(ref, () => ({
      getValue,
      setValue,
    }))

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const reset = () => {
      setValue("")
    }

    return (
      <div className="h-10 flex flex-row col-span-2 bg-neutral-200 px-2 rounded-lg w-full md:w-4/12 lg:w-6/12 items-center">
        <IconSearch width={16} height={16} className="mr-2" />
        <input
          name="search"
          value={value}
          placeholder="I'm looking for..."
          className="text-sm font-semibold bg-neutral-200 w-full h-full rounded-lg outline-none"
          onChange={onChange}
        />
        {!!value?.length && (
          <IconXCircle
            width={20}
            height={20}
            className="cursor-pointer hover:scale-110 ease-in-out duration-300"
            onClick={reset}
          />
        )}
      </div>
    )
  }),
)
