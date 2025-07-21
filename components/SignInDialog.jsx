import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";

import React, { use, useContext } from "react";
import { Button } from "./ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.user.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log("userInfo", userInfo);
      setUserDetail(userInfo?.data);
      const user = userInfo?.data;
      // save it into the DB
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userInfo?.data));
      }
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-3 p-2">
              <h2 className="font-bold text-2xl text-center mb-2 text-white">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="text-center">{Lookup.SIGNIN_SUBHEADING}</p>
              <Button
                onClick={googleLogin}
                className="bg-blue-500 text-white flex mt-4 mx-auto"
              >
                Sign In With Google
              </Button>
              <p className="mt-4 text-center">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
