import { StepperProps } from "@/types/form";

export default function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <ol className="flex items-center justify-center w-full mx-auto">
            {steps.map((step, index) => (
                <li
                    key={index}
                    className={
                        `flex items-center w-full 
                        ${index < currentStep ? 'text-blue-600 dark:text-blue-500' : 
                            'text-gray-500 dark:text-gray-400'} 
                            after:content-[''] after:w-full after:h-1 
                        ${index < steps.length - 1 ? (index < currentStep ? 
                            'after:border-b-4 after:border-blue-100 dark:after:border-blue-800' : 
                            'after:border-b-4 after:border-gray-100 dark:after:border-gray-700') : ''}
                    `}
                >
                    <span className={`flex items-center justify-center w-10 h-10 ${index < currentStep ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12`}>
                        {index < currentStep ? (
                            <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                            </svg>
                        ) : (
                            <span className={`text-${index === currentStep ? 'blue-600 dark:text-blue-500' : 'gray-500 dark:text-gray-400'}`}>{index + 1}</span>
                        )}
                    </span>
                </li>
            ))}
        </ol>
    );
}
