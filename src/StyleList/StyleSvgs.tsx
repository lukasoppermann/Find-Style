import * as React from "react";

const styleSvgs = {
  grid: `<path d="M2 2H4.4V4.4H2V2ZM6.8 2H9.2V4.4H6.8V2ZM11.6 2H14V4.4H11.6V2ZM2 6.8H4.4V9.2H2V6.8ZM6.8 6.8H9.2V9.2H6.8V6.8ZM11.6 6.8H14V9.2H11.6V6.8ZM2 11.6H4.4V14H2V11.6ZM6.8 11.6H9.2V14H6.8V11.6ZM11.6 11.6H14V14H11.6V11.6Z"/>`,
  effect: `<path
          fill-opacity="1"
          fill-rule="nonzero"
          d="M8.5.5h-1v3h1v-3zM3.05 2.343l-.707.707 2.122 2.122.707-.708-2.122-2.12zm10.607.707-.707-.707-2.121 2.121.707.708 2.121-2.122zM.5 7.5v1h3v-1h-3zm12 0v1h3v-1h-3zm-7.328 4.036-.707-.708-2.122 2.122.707.707 2.122-2.121zm6.363-.708-.707.708 2.122 2.12.707-.706-2.122-2.122zM8.5 12.5h-1v3h1v-3z"
        ></path>
        <path
          fill-opacity="1"
          fill-rule="evenodd"
          d="M10.498 7.998c0 1.38-1.12 2.5-2.5 2.5-1.38 0-2.5-1.12-2.5-2.5 0-1.38 1.12-2.5 2.5-2.5 1.38 0 2.5 1.12 2.5 2.5zm-1 0c0 .828-.672 1.5-1.5 1.5-.829 0-1.5-.672-1.5-1.5 0-.829.671-1.5 1.5-1.5.828 0 1.5.671 1.5 1.5z"
        ></path>`,
  text: `<path d="M11.8242 14.4375C10.1777 14.4375 9.09961 13.7168 8.98242 12.6152H10.4414C10.5352 13.0664 11.0508 13.3535 11.8477 13.3535C12.8438 13.3535 13.4238 12.873 13.4238 12.0586V10.8398H13.3242C12.9551 11.5312 12.2578 11.9062 11.3672 11.9062C9.75 11.9062 8.74219 10.6523 8.74219 8.73047C8.74219 6.76758 9.75586 5.49023 11.3906 5.49023C12.2637 5.49023 13.0254 5.92383 13.377 6.62109H13.4766V5.5957H14.877V12.0352C14.877 13.5059 13.6934 14.4375 11.8242 14.4375ZM11.8242 10.752C12.8379 10.752 13.4473 9.9668 13.4473 8.73047C13.4473 7.48828 12.832 6.70312 11.8242 6.70312C10.8105 6.70312 10.2363 7.48828 10.2363 8.72461C10.2363 9.9668 10.8105 10.752 11.8242 10.752Z"/>
  <path d="M6.49805 12L5.7832 9.81445H2.67188L1.94531 12H0.416016L3.41602 3.54492H5.11523L8.12109 12H6.49805ZM4.18359 5.13281L3.02344 8.64844H5.43164L4.2832 5.13281H4.18359Z"/>`,
  broken: `
    <path d="M5.00052 1V3.99998H6.00052V1H5.00052Z"/>
    <path d="M14.1036 1.89647C12.9418 0.734699 11.0582 0.734709 9.89641 1.89648L7.14651 4.64641L7.85361 5.35351L10.6035 2.60361C11.3748 1.83234 12.6252 1.83234 13.3965 2.60361C14.1677 3.37481 14.1677 4.62521 13.3965 5.39641L10.6465 8.14641L11.3536 8.85351L14.1036 6.10361C15.2653 4.94181 15.2653 3.05821 14.1036 1.89647Z"/>
    <path d="M1.89662 14.1035C0.734859 12.9418 0.734859 11.0582 1.89662 9.89636L4.6466 7.14636L5.3537 7.85346L2.6037 10.6035C1.83249 11.3748 1.83249 12.6252 2.6037 13.3964C3.375 14.1677 4.6254 14.1677 5.3966 13.3964L8.1466 10.6464L8.8537 11.3535L6.1037 14.1035C4.942 15.2653 3.0584 15.2653 1.89662 14.1035Z"/>
    <path d="M15 11H12V10H15V11Z"/>
    <path d="M11.0006 12V15H10.0006V12H11.0006Z"/>
    <path d="M4.00001 5H1V6H4.00001V5Z"/>`,
  paint: `<path d="M11.5375 5.5107L8 2L4.4625 5.5107C3.4875 6.4805 3 7.77315 3 9.0154C3 10.2589 3.4875 11.5707 4.4625 12.5393C5.4375 13.5091 6.71875 14 8 14C9.28125 14 10.5625 13.5091 11.5375 12.5393C12.5125 11.5707 13 10.2589 13 9.0166C13 7.77315 12.5125 6.4805 11.5375 5.5119V5.5107ZM4.25 9.23985C4.25625 7.9964 4.6375 7.20784 5.35 6.5057L8 3.81476L10.65 6.53691C11.3625 7.23305 11.7438 7.9964 11.75 9.23985H4.25Z" />`,
};

type Props = {
  type?: "EFFECT" | "PAINT" | "GRID" | "TEXT";
  className?: string;
};

const StyleSvg = ({ type }: Props) => (
  <svg
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    style={{ fill: "var(--figma-color-text-secondary)" }}
    dangerouslySetInnerHTML={{
      __html: styleSvgs[type?.toLowerCase() || "broken"],
    }}
  />
);

export default StyleSvg;
