import React, { useMemo } from "react";

const Hero = ({ scrollProgress = 0 }) => {
  // Calculate styles based on scroll progress
  const scrollStyles = useMemo(() => {
    // Section background transition
    let sectionBgColor;

    if (scrollProgress < 0.1) {
      // First phase: white to gray
      const grayness = scrollProgress / 0.1;
      const colorValue = 255 - 175 * grayness;
      sectionBgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else if (scrollProgress < 0.2) {
      // Second phase: gray to darker gray
      const darkness = (scrollProgress - 0.1) / 0.1;
      const colorValue = 80 - 80 * darkness;
      sectionBgColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else {
      // Final state: black
      sectionBgColor = "#0a0a0a";
    }

    // Text gradient transition
    let fromColor, toColor;

    if (scrollProgress < 0.1) {
      // First phase: default gradient to darker
      const darkness = scrollProgress / 0.1;
      fromColor = `rgb(${31 + 31 * (1 - darkness)}, ${
        41 + 31 * (1 - darkness)
      }, ${55 + 31 * (1 - darkness)})`;
      toColor = `rgb(${31 + 31 * (1 - darkness)}, ${
        41 + 31 * (1 - darkness)
      }, ${55 + 31 * (1 - darkness)})`;
    } else if (scrollProgress < 0.2) {
      // Second phase: darker gradient to black & gray
      const darkness = (scrollProgress - 0.1) / 0.1;
      fromColor = `rgb(${31 * (1 - darkness)}, ${41 * (1 - darkness)}, ${
        55 * (1 - darkness)
      })`;
      toColor = `rgb(${31 * (1 - darkness)}, ${41 * (1 - darkness)}, ${
        55 * (1 - darkness)
      })`;
    } else {
      // Final state: almost black gradient
      fromColor = "rgb(186, 186, 186)";
      toColor = "rgb(186, 186, 186)";
    }

    const textGradient = `linear-gradient(to right, ${fromColor}, ${toColor})`;

    // Grid items background transition
    const gridItemBgOpacity = Math.max(0, 1 - scrollProgress * 5); // Fade out faster than text
    const gridItemBackground = `rgba(255, 255, 255, ${gridItemBgOpacity})`;

    return {
      sectionBgColor,
      textGradient,
      gridItemBackground,
    };
  }, [scrollProgress]);

  return (
    <section className="pt-20 2xl:pt-28 pb-10 min-h-[1500px]">
      <div className="mx-auto fixed left-0 right-0 max-w-screen-2xl px-3 md:px-12 lg:px-28 2xl:px-2">
        <div
          className={`flex ${
            scrollProgress < 0.2
              ? "justify-start text-start"
              : "justify-end text-end"
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-12 2xl:mb-16">
            <span
              className="block font-normal text-transparent bg-clip-text"
              style={{
                backgroundImage: scrollStyles.textGradient,
                transition: "background-image 0.3s ease",
              }}
            >
              Remarkable
            </span>
            <span
              className="block font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage: scrollStyles.textGradient,
                transition: "background-image 0.3s ease",
              }}
            >
              {scrollProgress < 0.2
                ? "Mining Experience."
                : "Investment Solutions."}
            </span>
          </h1>
        </div>

        <div className="rounded-2xl relative">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <div className="relative w-full overflow-hidden rounded-2xl">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src="/videos/light.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div
                className="absolute inset-0 z-[2] bg-black"
                style={{
                  opacity: 0.5 + scrollProgress * 0.2, // Starts at 0.5, increases to 0.8
                  transition: "opacity 0.3s ease",
                }}
                aria-hidden="true"
              />

              {/* Grid content */}
              <div className="relative z-[3] w-full h-full">
                <div className="container mx-auto h-full">
                  <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-7 h-full">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const id = i + 1;
                      const isHidden = [2, 3, 4, 7, 8, 10, 11, 12, 14].includes(
                        id
                      )
                        ? "hidden md:block"
                        : "";
                      const isTextBlock = [5, 6, 8, 12, 14];

                      return (
                        <div
                          key={id}
                          data-id={id}
                          className={
                            i === 4 || i === 11
                              ? "relative overflow-hidden animate-item bg-white  aspect-square w-[30px] h-full hidden md:block col-span-1"
                              : `relative overflow-hidden animate-item aspect-square col-span-1 ${isHidden} ${
                                  isTextBlock
                                    ? "p-6 flex items-center justify-center"
                                    : ""
                                }`
                          }
                          style={{
                            backgroundColor: isTextBlock.includes(id)
                              ? scrollStyles.sectionBgColor
                              : "transparent",
                            border:
                              i == 0 ||
                              i == 1 ||
                              i == 5 ||
                              i == 4 ||
                              i == 6 ||
                              i == 11
                                ? ""
                                : `1px solid ${scrollStyles.sectionBgColor}`,
                            opacity: scrollStyles.gridOpacity,
                            transition:
                              "opacity 0.3s ease, background-color 0.3s ease",
                          }}
                        >
                          {id === 6 ? (
                            <p
                              className="text-sm text-start"
                              style={{
                                color:
                                  scrollProgress > 0.15 ? "white" : "#0a0a0a",
                                transition: "color 0.3s ease",
                              }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut.
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
