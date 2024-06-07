import { useEmail } from "@/context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useState } from "react";

const EmailSection = () => {
  const { email } = useEmail()
  const [buttonColor, setButtonColor] = useState('bg-violet');

  const handleCopyClick = () => {
    navigator.clipboard.writeText(email);
    setButtonColor('bg-green');

    setTimeout(() => {
      setButtonColor('bg-violet');
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto mt-5 ">
      <div className="border-dashed border-2 p-2 sm:p-8">
        <h3 className="text-gray-300 text-2xl text-center tracking-wide leading-8 font-semibold mb-3">Your Temporary Email Address</h3>
        <div className="flex flex-col sm:flex-row items-center space-x-2">
          <input
            type="text"
            className="w-[90%] sm:flex-grow border border-gray-900 rounded-lg px-3 py-2 text-lg bg-zinc-900 text-gray-300 font-semibold focus:border-violet-600 focus:outline-none"
            placeholder="exmaple@gmail.com"
            value={email}
            readOnly
          />
          <TooltipProvider>
            <Tooltip delayDuration={130}>
              <TooltipTrigger>
                <button
                  className={`${buttonColor+"-600"} text-gray-200 p-2 rounded font-semibold hover:${buttonColor}-800 mt-2 sm:mt-0`}
                  onClick={handleCopyClick}
                >
                  Copy
                </button>

              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={2}>
                Copy
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="text-gray-500 font-semibold mt-4">
        <p>Tired of spam emails cluttering your inbox? Try this free temporary email service</p>
        <p className="text-blue-400 italic mt-1">**Refresh Every 10 seconds</p>
      </div>
    </div>
  )
}

export default EmailSection