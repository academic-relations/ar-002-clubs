"use client";

import Image from "next/image";

import myGif from "../assets/notImplementedChan.gif";

import type { NextPage } from "next";

const Custom404: NextPage = () => (
  <div>
    <Image src={myGif} alt="Not Implemented Yet" width={400} height={400} />
    아직 구현되지 않았어요!
    <h1>디</h1>
    <h1>자이너 구함!!</h1>
  </div>
);

export default Custom404;
