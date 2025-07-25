import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { checkIfEmailExists } from "../../auth/auth";

function GtngStrtdForm() {
  const navigate = useNavigate();
  const focusRef = useRef();
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState();

  async function handleClick(e) {
    e.preventDefault();

    const email = focusRef.current.value.trim();

    if (!email) {
      focusRef.current.focus(); // focus the input
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setIsLoading(true);
    try {
      const cleanedEmail = email.trim().toLowerCase();
      const methods = await checkIfEmailExists(cleanedEmail);
      console.log(methods);

      if (methods && methods.length > 0) {
        setTimeout(() => {
          navigate("/login", { state: { email, fromLanding: true } });
          setIsLoading(false);
        }, 400);
      } else {
        setIsLoading(true);
        setTimeout(() => {
          navigate("/signup", { state: { email } });
          setIsLoading(false);
        }, 600);
      }
    } catch (error) {
      console.error("Firebase check error:", error.message);
      setEmailError(true);
    }
  }

  return (
    <div>
      <form
        action=""
        onSubmit={handleClick}
        className="  mt-3  flex sm:flex-row flex-col justify-between   relative max-h-15"
      >
        <input
          className={`peer input-autofill-dark text-white bg-black/50 py-4 pl-5 sm:w-[62%] w-full border ${emailError ? "border-red-500" : "border-[#5f5f5e]"} rounded-md placeholder-transparent focus:outline-none focus:ring-2`}
          type="text"
          id="email"
          placeholder=""
          ref={focusRef}
        />

        <label
          htmlFor="email"
          className="text-gray-400 absolute  left-6  top-1/2  -translate-y-1/2  transition-all  peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-white  peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:left-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-300 peer-focus:top-3   peer-focus:left-5 peer-focus:text-xs  peer-focus:text-gray-300 "
        >
          Email address
        </label>

        <p className="hidden">Please enter a valid email address</p>

        <button
          type="submit"
          className={` ${isLoading ? "cursor-wait" : "cursor-pointer"} hover:bg-red-700 active:bg-gray-600 transition-colors duration-300 lg:px-3.5 sm:py-7 py-5 px-2 sm:mx-0 mx-auto max-h-13 sm:mt-0 ${emailError ? "mt-10" : "sm:mt-0"} mt-3  text-white bg-[#e50815] rounded-md lg:font-semibold sm:font-normal text-xs lg:text-sm sm:w-[35%] sm:max-w-60 max-w-55 flex  justify-center items-center lg:gap-2 `}
        >
          <span className="text-2xl font-bold">Get started</span>
          <IoIosArrowForward className="text-3xl" />
        </button>
        {emailError && (
          <p className="text-[#e50815] absolute top-15 left-2  text-sm flex items-center gap-1">
            <span>
              <RxCrossCircled />
            </span>{" "}
            Please enter valid email address
          </p>
        )}
      </form>
    </div>
  );
}

export default GtngStrtdForm;
