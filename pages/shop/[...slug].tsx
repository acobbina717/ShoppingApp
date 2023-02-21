import { Paper } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const { params } = router.query;
  return <div style={{ backgroundColor: "yellow", height: "500px" }}></div>;
}

export default Page;
