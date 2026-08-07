// Form Validation Utility Helpers

export const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.toLowerCase())) {
    return 'Please enter a valid email address (e.g. farmer@agriconnect.in).';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Mobile phone number is required.';
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  if (cleaned.length < 10) {
    return 'Please enter a valid 10-digit mobile number.';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return null;
};

export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'Please enter your full name (minimum 2 characters).';
  }
  return null;
};
