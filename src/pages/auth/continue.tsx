import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, InputField } from "@components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Selfbet Register</title>
        <meta name="description" content="create a user name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="auth_google w-screen h-screen pt-24">
        <div className="auth_google-card border w-[590px] h-[572px]  mx-auto">
          <div className="w-full column items-center">
          <Image
              src={"/icons/logo-2.svg"}
              alt="logo"
              width={150}
              height={56}
            />


            <h1 className="w-full text-center display-sm f-eb text-gray-900">
                Create account 
            </h1>

            <form onSubmit={() => true} className="w-full mt-12 space-y-6">
              <div className="space-y-4">
                <InputField
                  type={"text"}
                  label="username"
                  required
                  place={"Enter a username"}
                />
                <InputField type={"email"} label="Email" place={'***@gmail.com'}/>

                <div className="terms row space-x-2 items-center ">
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree"
                    className="w-4 h-4 border-gray-300"
                  />

                  <h2 className="terms-text txt-sm f-m ">
                    I agree to the{" "}
                    <strong className="f-b">Terms & Conditions</strong>
                  </h2>
                </div>
              </div>

              <Button text={"continue"} type={"submit"} full disabled={!true} />

            </form>
          </div>
        </div>
      </main>
    </>
  );
}