import Lookup from "@/data/Lookup";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PricingModel = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const UpdateToken = useMutation(api.user.UpdateToken);

  const onPaymentSucess = async ({ pricing }) => {
    const token = userDetail?.token + Number(pricing?.tokens);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };
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
          {/* <Button className="mx-auto w-full p-1 cursor-pointer">
            Upgrade to {item.name}
          </Button> */}
          <PayPalButtons
            className="flex relative z-[-200] "
            disabled={!userDetail?.name}
            style={{ layout: "horizontal" }}
            onApprove={() => onPaymentSucess(item)}
            onCancel={() => console.log("payment canceled")}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: item.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
