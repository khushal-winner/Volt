import Lookup from "@/data/Lookup";
import React from "react";
import { Button } from "../ui/button";

const PricingModel = () => {
  return (
    <div className="w-full gap-4 justify-center items-center p-4 mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Lookup.PRICING_OPTIONS.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 rounded-xl border p-4 hover:bg-[#151515]/30"
        >
          <h2 className="font-bold text-4xl mx-auto text-center">
            {item.name}
          </h2>
          <h2 className="font-medium text-2xl mx-auto">{item.tokens} Token</h2>
          <p className="text-center">{item.desc}</p>
          <h2 className="text-4xl mx-auto font-bold">${item.price}</h2>
          <Button className="mx-auto w-full p-1 cursor-pointer">
            Upgrade to {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
