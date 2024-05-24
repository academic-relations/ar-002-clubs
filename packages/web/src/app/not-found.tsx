"use client";

import type { NextPage } from "next";
import Image from "next/image";
import myGif from "../assets/notImplementedChan.gif";

const Custom404: NextPage = () => (
  <div>
    <Image src={myGif} alt="Not Implemented Yet" width={400} height={400} />
    아직 구현되지 않았어요!
  </div>
);

export default Custom404;
