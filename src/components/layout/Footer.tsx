import Image from "next/image";

function Footer() {
  return (
    <>
      <footer className="mt-8 bg-neutral">
        <div className="container mx-auto py-16">
          <div className="flex flex-col items-center justify-between  text-left md:flex-row  md:items-start md:gap-[5rem]">
            <div className="flex w-1/2 flex-col gap-8 py-4 md:p-0">
              <Image
                src={"/image_processing20210620-5261-1izw9zf.png"}
                alt="footer_logo"
                width={150}
                height={150}
              />
              <p className="text-[15px] font-medium text-[#646464]">
                Take your health and body to the next level with our
                comprehensive program designed to help you reach your fitness
                goals.
              </p>
              <div className="flex justify-center gap-7 text-[18px] text-[#646464] md:justify-start">
                <div
                  className="rounded-full bg-[#efefef] p-2 text-2xl hover:bg-accent hover:text-white"
                  style={{ transition: "all 0.3s" }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 -2 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs></defs>
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-60.000000, -7521.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                            id="twitter-[#154]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div
                  className="rounded-full bg-[#efefef] p-2 text-2xl hover:bg-accent hover:text-white"
                  style={{ transition: "all 0.3s" }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="-5 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>facebook [#176]</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-385.000000, -7399.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                            id="facebook-[#176]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div
                  className="rounded-full bg-[#efefef] p-2 text-2xl hover:bg-accent hover:text-white"
                  style={{ transition: "all 0.3s" }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="#333333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="#333333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 6L18 6.01"
                      stroke="#333333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-[16px] font-medium text-[#646464]">
                Privacy Policy | © {new Date().getFullYear()} Gymate <br />{" "}
                Design by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.radiustheme.com/"
                >
                  RadiusTheme
                </a>
              </p>
            </div>
            <div className="relative flex w-fit flex-col gap-8 max-md:mt-5">
              <p className="footer-main text-[22px] font-bold">Our Classes</p>
              <span className="absolute top-[33px] h-[4px] w-[8rem] bg-accent"></span>
              <p className="singleLine cursor-pointer text-[16px] font-medium text-[#646464] hover:font-bold hover:text-accent">
                Fitness Classes
              </p>
              <p className="singleLine cursor-pointer text-[16px] font-medium text-[#646464] hover:font-bold hover:text-accent">
                Aerobics Classes
              </p>
              <p className="singleLine cursor-pointer text-[16px] font-medium text-[#646464] hover:font-bold hover:text-accent">
                Power Yoga
              </p>
              <p className="singleLine cursor-pointer text-[16px] font-medium text-[#646464] hover:font-bold hover:text-accent">
                Learn Machines
              </p>
              <p className="singleLine cursor-pointer text-[16px] font-medium text-[#646464] hover:font-bold hover:text-accent">
                Full-body Strength
              </p>
            </div>
            <div className="relative flex w-[8rem] flex-col gap-8 max-md:mt-5">
              <p className="footer-main text-[22px] font-bold">Horario</p>
              <span className="absolute top-[33px] h-[4px] w-[5rem] bg-accent"></span>
              <p className="text-[16px]  font-bold text-[#646464]">
                Monday - Friday:
              </p>
              <p className="text-[16px] font-medium text-[#646464]">
                7:00am - 21:00pm
              </p>
              <p className="text-[16px] font-bold text-[#646464]">Saturday:</p>
              <p className="text-[16px] font-medium text-[#646464]">
                7:00am - 19:00pm
              </p>
              <p className="text-[16px] font-bold text-[#646464] ">
                Sunday - Closed
              </p>
            </div>
            <span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
