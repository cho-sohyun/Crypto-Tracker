/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // 기본 제공 테마
    darkTheme: "dark", // 다크 모드 시 적용할 테마
  },
};
