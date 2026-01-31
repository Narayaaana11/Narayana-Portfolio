// EmailJS Configuration Validation
export const validateEmailJSConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const missingVars: string[] = [];
  
  if (!serviceId || serviceId === 'your_service_id') {
    missingVars.push('VITE_EMAILJS_SERVICE_ID');
  }
  
  if (!templateId || templateId === 'your_template_id') {
    missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
  }
  
  if (!publicKey || publicKey === 'your_public_key') {
    missingVars.push('VITE_EMAILJS_PUBLIC_KEY');
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    config: {
      serviceId,
      templateId,
      publicKey
    }
  };
};

// EmailJS Template Parameters Type
export interface EmailJSTemplateParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_email: string;
}
