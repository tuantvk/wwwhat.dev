import { forwardRef, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { GITHUB_REPO } from "@/constants/github"
import { IconGithub } from "@/icons"

export const Header = memo(
  forwardRef<HTMLDivElement>((_, ref) => {
    return (
      <div ref={ref} className="bg-primary p-3 md:p-8 grid grid-cols-2 gap-8">
        <div className="flex flex-col justify-between">
          <Image
            src="/logo.svg"
            alt="wwwhat.dev"
            title="What are you Waiting For?"
            width={0}
            height={0}
            priority
            className="w-full"
          />
          <Link
            href={GITHUB_REPO}
            className="flex flex-row items-center self-start hover:scale-110 ease-in-out duration-300"
          >
            <IconGithub className="w-7 mr-1" />
            <p>Waiting For?</p>
          </Link>
        </div>
        <Image
          src="/banner.svg"
          alt="https://www.freepik.com/free-vector/web-development-isometric-landing-page-coding_8548819.htm"
          width={0}
          height={0}
          priority
          className="w-full hover:scale-105 ease-in-out duration-300"
        />
      </div>
    )
  }),
)
