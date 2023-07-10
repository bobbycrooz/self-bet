import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Toggle({text, toggler, state} : {text?:string, toggler?:any, state?:boolean}) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className=" middle space-x-4">
      <Switch
        checked={state ||enabled}
        onChange={toggler ||setEnabled}
        className={`${state ||enabled ? "bg-gray-900" : "bg-gray-500"}
          relative inline-flex w-9 h-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        {/* <span className="sr-onlyntext-gray-700">Use setting</span> */}
        <span
          aria-hidden="true"
          className={`${state ||enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>

     {text && <h1 className="save capitalize t-subtitle text-[##344054]">{text}</h1>}
    </div>
  );
}
