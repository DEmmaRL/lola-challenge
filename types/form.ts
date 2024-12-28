// Add your form types here
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl?: string;
}

export interface Experience {
  currentRole: string;
  yearsOfExperience: number;
  skills?: string[];
  company: string;
  achievements: string;
}

export interface ApplicationForm extends PersonalInfo, Experience {}

export interface FormField {
  label: string;
  name: keyof ApplicationForm;
  placeholder?: string;
  type?: string;
}

export interface FieldsByStep {
  [step: number]: FormField[];
}

export interface Step {
  title: string;
  details: string;
}

// Props
export interface TagsInputProps {
  name: string;
  errors?: { message?: string };
  initialTags?: string[];
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
}