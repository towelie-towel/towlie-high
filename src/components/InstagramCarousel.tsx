"use client";
import Image from "next/image";

const post = {
  date: "APRIL 2",
  author: {
    profileImg: "/277986527_432783865283666_92851521188512010_n.jpg",
    name: "loft.35",
  },
  likes: [
    {
      url: "/337377298_597071488987989_1925932562573866422_n.jpg",
      alt: "ch_morell42",
    },
    {
      url: "/328316511_1875642766103782_568815812536931801_n.jpg",
      alt: "morelito",
    },
    {
      url: "/315772307_523885029613327_5721715325604858981_n.jpg",
      alt: "pella",
    },
  ],
  images: [
    {
      src: "/339997063_235581592360952_5520683447546139236_n.jpg",
    },
    {
      src: "/340520251_765836468395090_670409969989095455_n.jpg",
    },
    {
      src: "/343440829_210798974997231_9015254215868255261_n.jpg",
    },
  ],
  message:
    "IF YOU CAN'T STOP THINKING \n ABOUT IT...BUY IT 🛍️ \n \n Es solo un consejo 😂",
  comments: [
    {
      message: "Abajo el comunismooooo",
      author: {
        name: "ruben_pella",
        profileImg: "/315772307_523885029613327_5721715325604858981_n.jpg",
      },
      date: "2d",
      likes: 1,
    },
    {
      message:
        "Cuando me caigan, \n caiganme en alicóptero tanke e guerra \n yo ando enfermo de los nervios",
      author: {
        name: "chocolate_mc",
        profileImg: "/345092294_164891576241502_2230723046969377882_n.jpg",
      },
      date: "12h",
      likes: 1,
    },
  ],
};

export default function InstagramCarousel() {
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
      className="instagram-card-container flex w-[360px] max-w-2xl items-center justify-center overflow-hidden rounded-lg font-sans text-sm/[16px] shadow-lg max-[735px]:flex-col max-[360px]:w-full min-[735px]:w-2/3"
    >
      <div className="flex w-full justify-between p-3 min-[735px]:hidden">
        <div className="flex items-center">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <Image
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              src={post.author.profileImg}
              alt={post.author.name}
              width={28}
              height={28}
              unoptimized
            />
            <Image
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
              src="/stroke.png"
              alt="ig-ring"
              width={21}
              height={21}
              unoptimized
            />
          </div>
          <div className="ml-3 flex h-full items-center">
            <h2 className="text-sm font-semibold">{post.author.name}</h2>
          </div>
        </div>
        <div className="flex items-center">
          <svg
            aria-label="More options"
            className="_ab6-"
            color="currentColor"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </div>
      </div>
      <div className="carousel-item"></div>
      <div className="carousel relative h-full w-full">
        {post.images.map((image) => (
          <div
            key={image.src}
            className="item-1 carousel-item relative w-full pb-[140%]"
          >
            <Image
              src={image.src}
              fill
              unoptimized
              className="object-cover"
              alt={image.src}
            />
          </div>
        ))}
      </div>
      <div className="flex w-full min-w-[280px] flex-col justify-between min-[735px]:h-full min-[735px]:max-w-[300px]">
        <div className="flex h-full max-h-96 w-full flex-col max-[735px]:hidden">
          <div className="flex w-full justify-between px-3 pb-2 pt-3">
            <div className="flex items-center">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <Image
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  src={post.author.profileImg}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  unoptimized
                />
                <Image
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
                  src="/stroke.png"
                  alt="ig-ring"
                  width={21}
                  height={21}
                  unoptimized
                />
              </div>
              <div className="ml-3 flex h-full items-center">
                <h2 className="text-sm font-semibold">{post.author.name}</h2>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                aria-label="More options"
                className="_ab6-"
                color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
              </svg>
            </div>
          </div>
          <div className="divider my-0 w-full"></div>
          <div className="scrollbar-none flex h-full w-full flex-col overflow-y-auto">
            <div className="flex h-auto items-start px-3 py-2">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <Image
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  src={post.author.profileImg}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  unoptimized
                />
                <Image
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
                  src="/stroke.png"
                  alt="ig-ring"
                  width={21}
                  height={21}
                  unoptimized
                />
              </div>

              <div className="relative ml-3 inline-block h-full shrink whitespace-pre">
                <h2 className="inline-flex items-center text-sm font-semibold">
                  {post.author.name}
                </h2>
                <p className="inline whitespace-pre pl-1 text-xs">
                  {post.message}
                </p>
              </div>
            </div>
            {post.comments.map((comment) => (
              <div
                key={comment.author.name}
                className="my-2 flex h-auto items-start px-3"
              >
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <Image
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    src={comment.author.profileImg}
                    alt={comment.author.name}
                    width={28}
                    height={28}
                    unoptimized
                  />
                  <Image
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
                    src="/stroke.png"
                    alt="ig-ring"
                    width={21}
                    height={21}
                    unoptimized
                  />
                </div>

                <div className="relative ml-3 inline-block h-full shrink whitespace-pre">
                  <h2 className="inline-flex items-center text-sm font-semibold">
                    {comment.author.name}
                  </h2>
                  <p className="inline whitespace-pre pl-1 text-xs">
                    {comment.message}
                  </p>
                  <div className="my-2 flex w-1/2 justify-between">
                    <p className="text-xs text-[#737373]">{comment.date}</p>
                    <h2 className="text-xs font-medium text-[#737373]">
                      {comment.likes} like
                    </h2>
                    <h2 className="text-xs font-medium text-[#737373]">
                      Reply
                    </h2>
                  </div>
                  <div className="flex w-1/2 items-center">
                    <div className="divider my-0 w-1/4"></div>
                    <h2 className="mx-2 text-xs text-[#737373]">
                      View Replies
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex w-full justify-between p-3">
            <div className="flex">
              <svg
                aria-label="Like"
                className="mr-3"
                color="currentColor"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Like</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                <svg
                  aria-label="Like"
                  className="x1lliihq x1n2onr6"
                  color="currentColor"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Like</title>
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                </svg>
              </svg>
              <svg
                aria-label="Comment"
                className="mr-3"
                color="currentColor"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Comment</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <svg
                aria-label="Share Post"
                className="mr-3"
                color="currentColor"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Share Post</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"
                ></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
            </div>
            <div className="flex">
              <svg
                aria-label="Save"
                className="x1lliihq x1n2onr6"
                color="currentColor"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Save</title>
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
            </div>
          </div>
          {post.likes && post.likes.length !== 0 && (
            <div className="flex w-full pl-3">
              <div
                className={`relative h-5 w-[${
                  post.likes.length === 1 ? 20 : post.likes.length * 15 + 5
                }px]`}
              >
                {post.likes.map((image, index) => (
                  <Image
                    key={image.alt}
                    className={`absolute z-10 rounded-full left-[${
                      index * 15
                    }px]`}
                    src={image.url}
                    alt={image.alt}
                    width={20}
                    height={20}
                    unoptimized
                  />
                ))}
                <div className="left-[0px] left-[15px] left-[30px] w-[0px] w-[20px] w-[35px] w-[50px]"></div>
              </div>
              <div className="flex h-full items-center">
                <h2 className="ml-1 text-xs font-medium">
                  Liked by{" "}
                  <span className="font-semibold">{post.likes[0]?.alt}</span>{" "}
                  and <span className="font-bold">others</span>
                </h2>
              </div>
            </div>
          )}
          <div className="flex w-full pl-3 pt-2 max-[735px]:pb-3">
            <p className="font-[-apple-system,BlinkMacSystemFont,SegoeUI,Roboto,Helvetica,Arial,sans-serif] text-[10px] text-[#737373]">
              {post.date}
            </p>
          </div>
          <div className="flex h-10 w-full items-center justify-between px-3 max-[735px]:hidden">
            <svg
              aria-label="Emoji"
              color="currentColor"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Emoji</title>
              <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
            </svg>
            <input
              placeholder="Add a comment..."
              className="input input-ghost h-6 w-2/3 px-3 py-0"
            ></input>
            <h2 className="color-[rgb(179,219,255)] text-sm font-semibold">
              POST
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
