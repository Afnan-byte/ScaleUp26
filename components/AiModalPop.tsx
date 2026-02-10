"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast, Toaster } from "react-hot-toast";
import { allCountries } from "country-telephone-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AvatarGeneratorModal from "@/components/AvatarGeneratorModal";

interface AvatarRegistrationData {
  name: string;
  email: string;
  phone_no: string;
  district: string;
  category: string;
  organization: string;
}

const MAKEMYPASS_VALIDATE_URL =
  "https://api.makemypass.com/makemypass/public-form/f9290cc6-d840-4492-aefb-76f189df5f5e/validate-rsvp/";

const FIXED_VALIDATE_PAYLOAD = {
  name: "John Doe",
  email: "john@example.com",
  district: "Kannur",
  category: "Students",
  organization: "tfg",
  did_you_attend_the_previous_scaleup_conclave_: "No",
};

interface AiModalPopProps {
  showFloatingIcon?: boolean;
  showFloatingform?: boolean;
}

export function AiModalPop({ showFloatingIcon = true,showFloatingform = true }: AiModalPopProps) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showExistingImageModal, setShowExistingImageModal] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isExternalModalOpen, setIsExternalModalOpen] = useState(false);
  const [avatarRegistrationData, setAvatarRegistrationData] =
    useState<AvatarRegistrationData | null>(null);
  const [countryCode, setCountryCode] = useState("+91"); // Country dial code
  const [phone, setPhone] = useState(""); // Just the digits
  const [mail, setMail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("+91"); // Track selected country
  const [countrySearch, setCountrySearch] = useState(""); // Search filter for countries
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [loading, setLoading] = useState(false);
  const [shouldOpenAvatarAfterOtp, setShouldOpenAvatarAfterOtp] =
    useState(false);

  const OTP_VERIFY_TTL_MS = 5 * 60 * 1000;

  const getVerifiedAt = (phoneValue: string) => {
    if (!phoneValue || typeof window === "undefined") return 0;
    const raw = localStorage.getItem(
      `scaleup2026:otp_verified_at:${phoneValue}`,
    );
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const setVerifiedAt = (phoneValue: string) => {
    if (!phoneValue || typeof window === "undefined") return;
    localStorage.setItem(
      `scaleup2026:otp_verified_at:${phoneValue}`,
      Date.now().toString(),
    );
  };

  const clearVerifiedAt = (phoneValue: string) => {
    if (!phoneValue || typeof window === "undefined") return;
    localStorage.removeItem(`scaleup2026:otp_verified_at:${phoneValue}`);
  };

  const isVerifiedRecently = (phoneValue: string) => {
    const verifiedAt = getVerifiedAt(phoneValue);
    if (!verifiedAt) return false;
    const expired = Date.now() - verifiedAt > OTP_VERIFY_TTL_MS;
    if (expired) {
      clearVerifiedAt(phoneValue);
      return false;
    }
    return true;
  };

  // Timer for OTP resend
  useEffect(() => {
    if (!otpSent || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timeLeft]);
  useEffect(() => {
  const openAiPop = () => {
    setShowPhoneModal(true); // this opens the OTP / phone modal
  };

  window.addEventListener("open-aipop", openAiPop as EventListener);

  return () => {
    window.removeEventListener("open-aipop", openAiPop as EventListener);
  };
}, []);


  useEffect(() => {
    const handleRegistrationOpen = () => setIsExternalModalOpen(true);
    const handleRegistrationClose = () => setIsExternalModalOpen(false);
    const handleAvatarOpen = () => setIsExternalModalOpen(true);
    const handleAvatarClose = () => setIsExternalModalOpen(false);
    const handleRegistrationTrigger = () => setIsExternalModalOpen(true);

    window.addEventListener(
      "registration-modal-opened",
      handleRegistrationOpen as EventListener,
    );
    window.addEventListener(
      "open-registration-modal",
      handleRegistrationTrigger as EventListener,
    );
    window.addEventListener(
      "registration-modal-closed",
      handleRegistrationClose as EventListener,
    );
    window.addEventListener(
      "avatar-modal-opened",
      handleAvatarOpen as EventListener,
    );
    window.addEventListener(
      "avatar-modal-closed",
      handleAvatarClose as EventListener,
    );

    return () => {
      window.removeEventListener(
        "registration-modal-opened",
        handleRegistrationOpen as EventListener,
      );
      window.removeEventListener(
        "open-registration-modal",
        handleRegistrationTrigger as EventListener,
      );
      window.removeEventListener(
        "registration-modal-closed",
        handleRegistrationClose as EventListener,
      );
      window.removeEventListener(
        "avatar-modal-opened",
        handleAvatarOpen as EventListener,
      );
      window.removeEventListener(
        "avatar-modal-closed",
        handleAvatarClose as EventListener,
      );
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const openRegistrationModal = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("open-registration-modal"));
  };

  const getStoredImageUrl = (phoneValue: string) => {
    if (!phoneValue || typeof window === "undefined") return "";
    try {
      return (
        localStorage.getItem(`scaleup2026:final_image_url:${phoneValue}`) || ""
      );
    } catch (error) {
      console.error("Failed to read stored image URL:", error);
      return "";
    }
  };

  const handleShowExistingImage = (url: string) => {
    setExistingImageUrl(url);
    setShowExistingImageModal(true);
    setShowPhoneModal(false);
    const combined = countryCode + phone;
    if (combined) {
      setVerifiedAt(combined);
    }
  };

  const handleSendMail = async (finalImageUrl: any) => {
    console.log("mail",mail);
    
    if (!mail.trim()) {
      toast.error("Please enter a mail address");
      return;
    }
    // const response = await fetch("http://localhost:3002/scaleup2026/otp/generate", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     mail: mail,
    //   }),
    // });

    // console.log("OTP Generate Response Status:", response.status);
    // const responseData = await response.json().catch(() => ({}));
    // console.log("OTP Generate Response Data:", responseData);

    // if (response.ok) {
    //   setOtpSent(true);
    //   setTimeLeft(600);
    //   toast.success("OTP sent to your mail address");
    // } else {
    //   toast.error(responseData.error || "OTP not able to send.");
    // }
    
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: mail,
          subject: "ScaleUp Conclave 2026 - OTP Verification",
          otp : "9876",
          // finalImageUrl: finalImageUrl || "No image URL found",
        }),
      });

      const data = await res.json();
      console.log("data",data);
        setOtpSent(true);
      
      if (data.success) {
        console.log("Mail sent successfully ✅");
        setOtpSent(true);
        setTimeLeft(600);
      } else {
        console.error("Failed to send mail ❌");
      }
    } catch (err) {
      console.error("Error sending mail:", err);
    }
  };

  const handleSendOtp = async () => {
    console.log("phone",phone);
    
    if (!phone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    const combined = phone;
    console.log("Sending OTP for:", combined);

    setLoading(true);
    try {
      // const validatePayload = new FormData();
      // validatePayload.append("name", FIXED_VALIDATE_PAYLOAD.name);
      // validatePayload.append("email", FIXED_VALIDATE_PAYLOAD.email);
      // validatePayload.append("phone", combined);
      // validatePayload.append("district", FIXED_VALIDATE_PAYLOAD.district);
      // validatePayload.append("category", FIXED_VALIDATE_PAYLOAD.category);
      // validatePayload.append(
      //   "organization",
      //   FIXED_VALIDATE_PAYLOAD.organization,
      // );
      // validatePayload.append(
      //   "did_you_attend_the_previous_scaleup_conclave_",
      //   FIXED_VALIDATE_PAYLOAD.did_you_attend_the_previous_scaleup_conclave_,
      // );

      // const validateResponse = await fetch(MAKEMYPASS_VALIDATE_URL, {
      //   method: "POST",
      //   body: validatePayload,
      // });

      // if (validateResponse.status === 200) {
      //   openRegistrationModal();
      //   toast.error("You are not registered. Please complete registration first.");
      //   setLoading(false);
      //   setShowPhoneModal(false);
      //   return;
      // }

      // if (validateResponse.status === 400) {
      //   const storedUrl = getStoredImageUrl(combined);
      //   if (storedUrl) {
      //     handleShowExistingImage(storedUrl);
      //     setLoading(false);
      //     return;
      //   }

      //   setShouldOpenAvatarAfterOtp(true);
      // } else {
      //   toast.error("Unable to verify registration. Please try again.");
      //   setLoading(false);
      //   return;
      // }

      const response = await fetch("https://scaleup.frameforge.one/scaleup2026/otp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_no: combined,
        }),
      });

      console.log("OTP Generate Response Status:", response.status);
      const responseData = await response.json().catch(() => ({}));
      console.log("OTP Generate Response Data:", responseData);

      if (response.ok) {
        setOtpSent(true);
        setTimeLeft(600);
        toast.success("OTP sent to your phone number");
      } else {
        toast.error(responseData.error || "OTP not able to send.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const combined = countryCode + phone;
      console.log("Verifying OTP for:", combined, "OTP:", otp);

      const response = await fetch(
        "https://scaleup.frameforge.one/scaleup2026/otp/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: combined,
            otp,
          }),
        },
      );

      console.log("OTP Verify Response Status:", response.status);
      const responseData = await response.json().catch(() => ({}));
      console.log("OTP Verify Response Data:", responseData);

      if (response.ok) {
        const combined = countryCode + phone;

        // Check if backend response contains generated_image_url (nested in user object)
        const backendImageUrl =
          responseData.user?.generated_image_url ||
          responseData.generated_image_url;
        if (backendImageUrl) {
          console.log("Backend returned image URL:", backendImageUrl);
          // Store it in localStorage for future use
          if (typeof window !== "undefined") {
            localStorage.setItem(
              `scaleup2026:final_image_url:${combined}`,
              backendImageUrl,
            );
          }
          handleShowExistingImage(backendImageUrl);
          setLoading(false);
          return;
        }

        toast.success("Phone number verified successfully!");
        if (shouldOpenAvatarAfterOtp) {
          handleOpenAvatarGenerator();
        } else {
          setShowPhoneModal(false);
        }
      } else {
        toast.error(responseData.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    handleSendOtp();
  };

  const handleOpenAvatarGenerator = () => {
    setShowPhoneModal(false);
    setAvatarRegistrationData({
      name: "",
      email: "",
      phone_no: countryCode + phone,
      district: "",
      category: "",
      organization: "",
    });
    setIsAvatarModalOpen(true);
    setShouldOpenAvatarAfterOtp(false);
  };

  const openPhoneModal = () => {
    const combined = countryCode + phone;
    if (combined && isVerifiedRecently(combined)) {
      const storedUrl = getStoredImageUrl(combined);
      if (storedUrl) {
        handleShowExistingImage(storedUrl);
        return;
      }
      handleOpenAvatarGenerator();
      return;
    }

    setShowPhoneModal(true);
  };

  const resetForm = () => {
    setCountryCode("+91");
    setSelectedCountry("+91");
    setCountrySearch("");
    setPhone("");
    setMail("");
    setOtp("");
    setOtpSent(false);
    setTimeLeft(600);
    setShouldOpenAvatarAfterOtp(false);
  };

  // Filter countries based on search
  const filteredCountries = allCountries.filter((country: any) => {
    const searchLower = countrySearch.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.dialCode.includes(searchLower) ||
      country.iso2?.toLowerCase().includes(searchLower)
    );
  });

  // Get selected country display name
  const getSelectedCountryDisplay = () => {
    const country = allCountries.find(
      (c: any) => c.dialCode === selectedCountry,
    );
    return country ? `${country.dialCode} ${country.name}` : selectedCountry;
  };

  const handleClosePhoneModal = () => {
    setShowPhoneModal(false);
    resetForm();
  };

  const handleDownloadExistingImage = async () => {
    if (!existingImageUrl) return;

    try {
      window.open(existingImageUrl, "_blank", "noopener,noreferrer");
      const response = await fetch(existingImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `avatar-${countryCode}${phone || "user"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Error downloading image. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Phone & OTP Modal */}
      <Dialog open={showPhoneModal} onOpenChange={handleClosePhoneModal}>
        <DialogContent className="w-[600px] h-[372px] p-0 overflow-hidden rounded-xl [&>button]:text-white ">
        <VisuallyHidden>
          <DialogTitle>Phone Number Verification</DialogTitle>
        </VisuallyHidden>

          <div className="flex flex-col md:flex-row h-full">

            {/* LEFT SIDE - Forms */}
            <div
              className={`w-full md:w-1/2 ${
                !otpSent ? "flex" : "grid"
              } items-center overflow-y-auto bg-white p-4`}
            >

              {!otpSent ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm  font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        className="w-full h-10 sm:flex-1 px-3 py-1 border-2 rounded-lg focus:ring-2 outline-none h-10"
                      />
                    </div>
                    <button
                      onClick={handleSendMail}
                      disabled={loading}
                      className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Get Code"}
                    </button>
                  </div>

                  
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <p className="text-xs text-gray-500">
                      OTP sent to {countryCode}
                      {phone}
                    </p>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      maxLength={6}
                      className="w-full px-3 py-2 border-2 border-indigo-500 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-center text-xl sm:text-2xl tracking-widest"
                    />
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.length !== 6}
                    className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Didn't receive OTP?</span>
                    {timeLeft > 0 ? (
                      <span className="text-indigo-600 font-medium">
                        Resend in {formatTime(timeLeft)}
                      </span>
                    ) : (
                      <button
                        onClick={handleResendOtp}
                        className="text-indigo-600 font-medium hover:text-indigo-700"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      resetForm();
                      setOtpSent(false);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Change Mail Address
                  </button>
                </>
              )}

            </div>

            {/* RIGHT SIDE - Images/GIF */}
            <div className="hidden md:block md:w-1/2 relative bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center p-0">
                <img
                  src="/assets/images/reg1.png"
                  alt="Register"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

        </DialogContent>
      </Dialog>

      {/* Existing Image Modal */}
      <Dialog
        open={showExistingImageModal}
        onOpenChange={setShowExistingImageModal}
      >
        <DialogContent
          className="fixed w-[95vw] max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto"
          style={{
            backgroundColor: "#fff",
            color: "var(--neutral-50)",
          }}
        >
          <DialogClose asChild />
          <DialogHeader className="flex flex-col items-center text-center space-y-2">
            <DialogTitle className="text-lg font-[700]">
              Your Generated Avatar
            </DialogTitle>
            <p className="text-sm text-gray-600">
              We found your previous AI avatar. You can download it below.
            </p>
          </DialogHeader>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="w-full max-h-[60vh] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 flex items-center justify-center">
              <img
                src={existingImageUrl}
                alt="Generated avatar"
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>
            <button
              onClick={handleDownloadExistingImage}
              className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-8 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              Download
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Avatar Generator Modal */}
      <AvatarGeneratorModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        registrationData={avatarRegistrationData || undefined}
      />

      {/* Floating Icon - Bottom Right - Sticky and Larger */}
      {showFloatingIcon &&
        !showPhoneModal &&
        !showExistingImageModal &&
        !isAvatarModalOpen &&
        !isExternalModalOpen && (
          <button
            onClick={openPhoneModal}
            className="fixed bottom-8 right-8 !z-99 w-40 h-40 rounded-full transition-all flex items-center justify-center hover:scale-110 transform duration-300 animate-bounce"
            // className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-2xl hover:shadow-purple-500/50 hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center hover:scale-110 transform duration-300 animate-bounce"
            style={{ position: 'fixed' }}
            title="Generate AI Avatar"
          >
            <img src="/AI.png" alt="AI" className="h-40 w-40" />
          </button>
        )}
    </>
  );
}

export default AiModalPop;
