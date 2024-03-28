"use client"
import { useCallback, useRef } from "react"
import Image from "next/image"
import InfiniteScroll from "react-infinite-scroller"
import { observer } from "mobx-react-lite"
import { useIssuesStore } from "@/models/IssuesStore"
import {
  Header,
  Bookmark,
  Country,
  CountryRef,
  Label,
  LabelRef,
  Search,
  SearchRef,
  CardIssue,
  Technologies,
} from "@/components"

const Home = () => {
  const labelRef = useRef<LabelRef>(null)
  const searchRef = useRef<SearchRef>(null)
  const countryRef = useRef<CountryRef>(null)
  const headerRef = useRef<null | HTMLDivElement>(null)

  const { isLoading, issues, fetchIssues, loadMoreIssues } = useIssuesStore()

  const getQuery = (params = "") => {
    const text = params || searchRef.current?.getValue()
    const label = labelRef.current?.getValue()
    const country = countryRef.current?.getValue()
    const query = ((label ? `label:${label}` : "") + ` ${text} ${country}`)
      .split(" ")
      .filter(Boolean)
      .join(" ")
    return query
  }

  const handleSearch = () => {
    fetchIssues(getQuery())
  }

  const handleLoadMore = (page: number) => {
    loadMoreIssues(getQuery(), page)
  }

  const handleSearchTech = useCallback(
    (tech: string) => {
      fetchIssues(getQuery(tech))
      searchRef.current?.setValue(tech)
      headerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    },
    [fetchIssues],
  )

  const RenderList = () => {
    if (issues?.items?.length) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-12 pt-5 pb-10">
          {issues.items.map((item, index) => (
            <CardIssue
              key={`${item.node_id}${index}`}
              item={item}
              onSeach={handleSearchTech}
            />
          ))}
        </div>
      )
    }
    return (
      <Image
        src="/looking.svg"
        alt="looking"
        width={219}
        height={223}
        className="mx-auto mt-5"
      />
    )
  }

  const isHasMore =
    !isLoading && Boolean(issues && issues?.items?.length < issues?.total_count)

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={handleLoadMore}
      hasMore={isHasMore}
      loader={
        <div className="text-center mb-3" key={0}>
          Loading...
        </div>
      }
    >
      <main>
        <Header ref={headerRef} />
        <div className="px-4 md:px-8">
          <div className="flex flex-wrap gap-2 my-5 md:my-10 p-3 sticky top-2 z-40 bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_#FFCC00]">
            <Label ref={labelRef} />
            <Search ref={searchRef} />
            <Country ref={countryRef} />
            <div
              className="h-10 font-semibold text-sm cursor-pointer bg-primary py-1.5 px-4 rounded-md flex items-center justify-center"
              onClick={handleSearch}
            >
              Find
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-10">{RenderList()}</div>
            <div className="hidden lg:block col-span-2 pt-5">
              <Technologies onSearch={handleSearchTech} />
            </div>
          </div>
        </div>
      </main>
      <Bookmark onSeach={handleSearchTech} />
    </InfiniteScroll>
  )
}

export default observer(Home)
