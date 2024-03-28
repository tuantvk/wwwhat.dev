"use client"
import React, { memo, useState, forwardRef, useImperativeHandle } from "react"
import { SHOW_ALL, SHOW_EASY_APPLY } from "@/constants/labelFilters"

const tabs = [
  {
    id: SHOW_ALL,
    title: "All",
  },
  {
    id: SHOW_EASY_APPLY,
    title: "Easy Apply",
  },
]

export type LabelRef = {
  getValue: () => string
}

export const Label = memo(
  forwardRef<LabelRef>((_, ref) => {
    const [currentTab, setCurrentTab] = useState(SHOW_ALL)

    const getValue = () => {
      return currentTab === SHOW_ALL ? "" : currentTab
    }

    useImperativeHandle(ref, () => ({
      getValue,
    }))

    return (
      <div className="h-10 flex flex-row bg-neutral-200 rounded-lg p-0.5">
        {tabs.map((tab) => {
          const isSelected = tab.id === currentTab
          return (
            <div
              key={tab.id}
              className={`text-sm font-semibold py-1.5 px-4 rounded-md flex items-center justify-center uppercase cursor-pointer ${isSelected && "bg-white"}`}
              onClick={() => setCurrentTab(tab.id)}
            >
              {tab.title}
            </div>
          )
        })}
      </div>
    )
  }),
)
