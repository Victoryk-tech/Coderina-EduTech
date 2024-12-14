"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Condition = ({ children }) => {
  const router = useRouter();
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    if (!router.isReady) return; // Wait until the router is ready

    const hiddenPaths = [
      "/",
      "/Media",
      "/Form",
      "/Couch",
      "/About",
      "/what",
      "/Events",
      "/Firstlego",
      "*",
    ];

    setDisplay(!hiddenPaths.includes(router.pathname));
  }, [router.isReady, router.pathname]);

  return <div>{display && children}</div>;
};

export default Condition;
