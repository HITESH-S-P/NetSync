import Image from "next/image";

import { SITE_NAME } from "@/lib/constants";

const WelcomeMsg = () => (
  <div className="mb-4 space-y-2">
    <div className="flex items-center gap-2 text-green-500"></div>
    <div className="text-green-500">
      ------------------------------------------------------------------------------------------------------------------------------------
    </div>
    <div>OUTPUT:</div>
  </div>
);

export { WelcomeMsg };
