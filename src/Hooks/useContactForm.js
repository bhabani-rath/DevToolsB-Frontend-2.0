// hooks/useContactForm.js
import { useState, useCallback } from "react";
import { toast } from "sonner";

const useContactForm = (isDarkMode) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validateForm();

      if (Object.keys(errors).length === 0) {
        toast.success(
          "Message sent successfully! We'll get back to you soon.",
          {
            duration: 4000,
            position: "bottom-right",
            style: {
              background: isDarkMode ? "#1f2937" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#1f2937",
              border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
            },
          }
        );
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({});
      } else {
        setFormErrors(errors);
      }
    },
    [formData, isDarkMode]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [formErrors]
  );

  return {
    formData,
    formErrors,
    handleInputChange,
    handleSubmit,
  };
};

export default useContactForm;
