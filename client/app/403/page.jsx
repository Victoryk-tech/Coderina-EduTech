"use client";

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default page;
