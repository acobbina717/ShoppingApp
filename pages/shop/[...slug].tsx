import { Paper } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

function Page({}: Props) {
  const products = new Array(30).fill(1);
  const router = useRouter();
  const { params } = router.query;
  return (
    <div style={{ height: "500px" }}>
      <div>{params}</div>
      kshdgjhsj
    </div>
  );
}

export default Page;
