export default function LoadingResults() {

  return (
    <section className="
      mt-24
      pb-24
    ">

      {/* Title Skeleton */}

      <div className="
        text-center
        mb-14
      ">

        <div className="
          h-12
          w-80

          mx-auto

          rounded-2xl

          bg-slate-200
          dark:bg-white/[0.05]

          animate-pulse
        " />

      </div>

      {/* Cards */}

      <div className="
        flex
        flex-col
        gap-10
      ">

        {
          Array.from({ length: 2 }).map((_, i) => (

            <div
              key={i}
              className="
                bg-white/80
                dark:bg-white/[0.03]

                border
                border-slate-200
                dark:border-white/10

                backdrop-blur-xl

                rounded-[32px]

                p-8

                shadow-[0_10px_40px_rgba(15,23,42,0.06)]
                dark:shadow-2xl
              "
            >

              {/* Header */}

              <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-start
                lg:justify-between

                gap-8

                mb-10
              ">

                <div>

                  <div className="
                    h-12
                    w-180
                    max-w-full

                    rounded-2xl

                    bg-slate-200
                    dark:bg-white/[0.06]

                    animate-pulse

                    mb-4
                  " />

                  <div className="
                    h-5
                    w-24

                    rounded-xl

                    bg-slate-200
                    dark:bg-white/[0.05]

                    animate-pulse
                  " />

                </div>

                <div className="
                  h-14
                  w-44

                  rounded-full

                  bg-cyan-400/15
                  dark:bg-cyan-400/10

                  animate-pulse
                " />

              </div>

              {/* Analytics Skeleton */}

              <div className="
                grid
                grid-cols-1
                lg:grid-cols-3

                gap-5

                mb-8
              ">

                {
                  Array.from({ length: 3 }).map((_, j) => (

                    <div
                      key={j}
                      className="
                        rounded-[28px]

                        border
                        border-slate-200
                        dark:border-white/10

                        bg-slate-100/80
                        dark:bg-white/[0.04]

                        h-[170px]

                        px-5
                        py-5

                        animate-pulse
                      "
                    >

                      <div className="
                        flex
                        items-center
                        gap-4

                        mb-6
                      ">

                        <div className="
                          w-12
                          h-12

                          rounded-2xl

                          bg-slate-200
                          dark:bg-white/[0.06]
                        " />

                        <div>

                          <div className="
                            h-4
                            w-24

                            rounded-lg

                            bg-slate-200
                            dark:bg-white/[0.06]

                            mb-2
                          " />

                          <div className="
                            h-7
                            w-20

                            rounded-lg

                            bg-slate-300
                            dark:bg-white/[0.08]
                          " />

                        </div>

                      </div>

                      <div className="
                        h-3
                        w-full

                        rounded-full

                        bg-slate-200
                        dark:bg-white/[0.05]

                        mb-4
                      " />

                      <div className="
                        h-4
                        w-4/5

                        rounded-lg

                        bg-slate-200
                        dark:bg-white/[0.05]
                      " />

                    </div>

                  ))
                }

              </div>

              {/* Footer */}

              <div className="
                flex
                items-center
                justify-between

                gap-6
              ">

                <div className="
                  h-5
                  w-64
                  max-w-full

                  rounded-xl

                  bg-slate-200
                  dark:bg-white/[0.05]

                  animate-pulse
                " />

                <div className="
                  h-12
                  w-44

                  rounded-full

                  bg-slate-200
                  dark:bg-white/[0.05]

                  animate-pulse
                " />

              </div>

            </div>
          ))
        }

      </div>

    </section>
  )
}