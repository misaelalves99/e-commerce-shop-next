// "app/page.tsx"

"use client";

import Advertising from "./components/Home/Advertising/Advertising";
import Emphasis from "./components/Home/Emphasis/Emphasis";
import Evaluated from "./components/Home/Evaluated/Evaluated";
import Sale from "./components/Home/Sale/Sale";

export default function Home() {
  return (
    <div>
      <Advertising />
      <Emphasis />
      <Evaluated />
      <Sale />
    </div>
  );
}
