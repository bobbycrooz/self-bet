import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className=" middle space-x-4">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex w-9 h-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        {/* <span className="sr-onlyntext-gray-700">Use setting</span> */}
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>

      <h1 className="save capitalize t-subtitle text-[##344054]">save account</h1>
    </div>
  );
}
