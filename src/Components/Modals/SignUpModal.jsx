import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cropper from "react-easy-crop";
import InputField from "../InputFields/InputField";

const SignUpModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);    
  const [profileImage, setProfileImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.3 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      }, "image/jpeg");
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setProfileImage(croppedImage);
      setShowCropper(false);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-3 mobile:p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mobile:max-w-xl p-6 mobile:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Cropper Modal */}
              <AnimatePresence>
                {showCropper && (
                  <motion.div
                    className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full max-w-md"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Crop Profile Picture
                      </h3>

                      <div className="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          cropShape="round"
                          showGrid={false}
                        />
                      </div>

                      <div className="mt-4">
                        <label className="text-sm text-gray-600 dark:text-gray-400">
                          Zoom
                        </label>
                        <input
                          type="range"
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          onChange={(e) => setZoom(e.target.value)}
                          className="w-full mt-1 accent-gray-900 dark:accent-gray-400"
                        />
                      </div>

                      <div className="flex gap-3 mt-6">
                        <motion.button
                          onClick={handleCropCancel}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          onClick={handleCropConfirm}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white rounded-lg transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Apply
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <h2 className="text-2xl mobile:text-3xl font-bold text-center mb-6 mobile:mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Create Account
              </h2>

              {/* Profile Image Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 mobile:w-28 mobile:h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-4 border-dashed border-gray-300 dark:border-gray-600">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-gray-900 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-full p-2 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </motion.button>
                  {profileImage && (
                    <motion.button
                      type="button"
                      onClick={() => {
                        setProfileImage(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <form className="space-y-4 mobile:space-y-5">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 mobile:grid-cols-2 gap-4">
                  <InputField
                    name="firstName"
                    id="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 344 384"
                        fill="#6b7280"
                      >
                        <path d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z" />
                      </svg>
                    }
                  />
                  <InputField
                    name="lastName"
                    id="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 344 384"
                        fill="#6b7280"
                      >
                        <path d="M170.5 192q-35.5 0-60.5-25t-25-60.5T110 46t60.5-25T231 46t25 60.5t-25 60.5t-60.5 25zm0 43q31.5 0 69.5 9t69.5 29.5T341 320v43H0v-43q0-26 31.5-46.5T101 244t69.5-9z" />
                      </svg>
                    }
                  />
                </div>

                {/* Email Field */}
                <InputField
                  type="email"
                  name="email"
                  id="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#6b7280"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  helper="We'll never share your email"
                />

                {/* Username and Gender Row */}
                <div className="grid grid-cols-1 mobile:grid-cols-2 gap-4">
                  <InputField
                    name="username"
                    id="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    icon={
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#6b7280"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                    helper="Choose a unique username"
                  />

                  <div className="relative">
                    <select
                      name="gender"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="peer w-full p-3 mini:p-3.5 mobile:p-4 pt-5 mini:pt-5.5 mobile:pt-6 pl-9 mini:pl-10 mobile:pl-11 pr-3 mini:pr-4 
                               bg-inherit border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
                               border-gray-500 dark:border-gray-400 focus:border-gray-900 dark:focus:border-gray-300
                               dark:bg-gray-900 text-gray-900 dark:text-white text-sm mini:text-base appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <label
                      className="absolute text-xs mini:text-sm mobile:text-base duration-150 transform top-4 mini:top-5 z-10 origin-[0] left-9 mini:left-10 mobile:left-11 
                               text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-300 scale-75 -translate-y-3 mini:-translate-y-4"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <div className="absolute top-5 mini:top-5.5 mobile:top-6 left-3 mini:left-3.5 mobile:left-4 text-gray-500 dark:text-gray-400">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#6b7280"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <svg
                      className="absolute right-3 top-5 mini:top-5.5 mobile:top-6 w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Password Fields */}
                <InputField
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  helper="Must be at least 8 characters"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#6b7280"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  }
                />

                <InputField
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#6b7280"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  }
                />

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-gray-900 focus:ring-gray-500 dark:text-gray-600 dark:focus:ring-gray-400"
                  />
                  <span className="ml-2 text-xs mini:text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <motion.button
                  type="submit"
                  className="relative w-full py-3.5 px-4 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600
                           dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500
                           text-white font-semibold rounded-lg shadow-lg overflow-hidden group transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Create Account</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <button className="text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium">
                    Sign in
                  </button>
                </div>
              </form>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
