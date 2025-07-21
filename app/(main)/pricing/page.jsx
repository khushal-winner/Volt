"use client";
import PricingModel from "@/components/custom/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { Loader2Icon } from "lucide-react";
import React, { useContext } from "react";

const page = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="w-full min-h-[calc(100vh-176px)] flex flex-col mt-20  items-center gap-4">
      <h2 className="font-bold text-5xl">Pricing</h2>
      <p className="text-gray-500 max-w-xl text-center">
        {Lookup?.PRICING_DESC}
      </p>

      <div
        style={{ backgroundColor: Colors.BACKGROUND }}
        className="max-w-5xl w-3xl min-w-xl flex justify-between border p-4 items-center rounded-2xl"
      >
        <h2 className="flex gap-2">
          {!userDetail?.token ? (
            <>
              <Loader2Icon className="animate-spin" />
            </>
          ) : (
            <span className="font-bold">{userDetail?.token}</span>
          )}
          Token Left
        </h2>

        <div>
          <h2>Need more token?</h2>
          <p>Upgrader your plan below</p>
        </div>
      </div>

      <PricingModel />
    </div>
  );
};

export default page;
