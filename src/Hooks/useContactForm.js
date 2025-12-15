/**
 * useContactForm Hook
 *
 * @description Custom React hook for managing contact form state, validation, and submission.
 * Handles form data, error states, and provides themed toast notifications.
 *
 * @hook
 * @features
 * - Form state management
 * - Real-time validation
 * - Error handling with user-friendly messages
 * - Theme-aware toast notifications
 * - Auto-clear errors on input change
 *
 * @param {boolean} isDarkMode - Current theme mode for toast styling
 * @returns {Object} Form utilities
 * @returns {Object} formData - Current form field values
 * @returns {Object} formErrors - Validation errors for each field
 * @returns {Function} handleInputChange - Input change handler
 * @returns {Function} handleSubmit - Form submission handler
 *
 * @author DevToolsB Team
 * @version 1.0.0
 *
 * @example
 * const { formData, formErrors, handleInputChange, handleSubmit } = useContactForm(isDarkMode);
 */

import { useState, useCallback } from "react";
import { toast } from "sonner";

const useContactForm = (isDarkMode) => {
  // Form data state - stores name, email, and message fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Validation errors state - tracks errors for each field
  const [formErrors, setFormErrors] = useState({});

  /**
   * Validate form fields
   * Checks for required fields and email format
   * @returns {Object} Object containing validation errors (empty if valid)
   */
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) errors.name = "Name is required";

    // Email validation - required and format check
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Message validation
    if (!formData.message.trim()) errors.message = "Message is required";

    return errors;
  };

  /**
   * Handle form submission
   * Validates form and shows appropriate toast notification
   * Resets form on successful validation
   * @param {Event} e - Form submit event
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validateForm();

      if (Object.keys(errors).length === 0) {
        // Success - show themed toast and reset form
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
        // Validation failed - update errors
        setFormErrors(errors);
      }
    },
    [formData, isDarkMode]
  );

  /**
   * Handle input field changes
   * Updates form data and clears corresponding error
   * @param {Event} e - Input change event
   */
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Update form data
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error for this field if it exists
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
