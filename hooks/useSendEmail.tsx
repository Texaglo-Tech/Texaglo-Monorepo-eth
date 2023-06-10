import { send } from "emailjs-com";
import React, { useState } from "react";
import { toast } from "react-toastify";

type UseSendEmail = {
  templateId: string;
  onSuccess?: () => void;
};

const useSendEmail = ({ onSuccess, templateId }: UseSendEmail) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (values: any) => {
    setIsSubmitting(true);
    send("ServiceId", templateId, values, "TemplateID").then(
      (result) => {
        onSuccess && onSuccess();
        setIsSubmitting(false);
        toast.success("Form is submitted successfully");
      },
      (error) => {
        setIsSubmitting(false);
        toast.error("Failed to submit form");
      },
    );
  };

  return { isSubmitting, sendEmail };
};

export default useSendEmail;
