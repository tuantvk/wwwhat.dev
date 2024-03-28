import React, {
  ChangeEvent,
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react"
import { IconLocation, IconXCircle } from "@/icons"
import { countries } from "@/data/countries"

export type CountryRef = {
  getValue: () => string
}

export const Country = memo(
  forwardRef<CountryRef>((_, ref) => {
    const [value, setValue] = useState<string>("")

    const getValue = () => {
      return value
    }

    useImperativeHandle(ref, () => ({
      getValue,
    }))

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value)
    }

    const reset = () => {
      setValue("")
    }

    return (
      <div className="h-10 flex flex-row bg-neutral-200 px-2 rounded-lg w-full md:w-auto items-center">
        <IconLocation width={22} height={22} className="mr-2" />
        <select
          autoComplete="off"
          name="country"
          value={value}
          className="bg-neutral-200 outline-none text-sm font-semibold w-full appearance-none"
          onChange={onChange}
        >
          <option value="" disabled hidden>
            In the country...
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {!!value?.length ? (
          <IconXCircle
            width={20}
            height={20}
            className="cursor-pointer hover:scale-110 ease-in-out duration-300"
            onClick={reset}
          />
        ) : (
          <div className="w-[20px]" />
        )}
      </div>
    )
  }),
)
