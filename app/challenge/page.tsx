"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfoSchema } from "@/schemas/personal-info.schema";
import { ExperienceSchema } from "@/schemas/experience.schema";
import Stepper from "@/components/Stepper";
import TagsInput from "@/components/TagsInput";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { title: "Información Personal", details: "Datos personales" },
  { title: "Logros", details: "Información de experiencia" },
  { title: "Revisión", details: "Confirma todos los datos" },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [direction, setDirection] = useState( "next" );

  const getStoredData = () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("formData");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  };

  const storedData = getStoredData();

  const methods = useForm({
    resolver: zodResolver(currentStep === 0 ? PersonalInfoSchema : ExperienceSchema),
    defaultValues: storedData,
  });

  const { handleSubmit, watch, trigger, formState, setValue } = methods;
  const { errors } = formState;

  useEffect(() => {
    const subscription = watch((value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("formData", JSON.stringify(value));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setDirection("next");
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setDirection("prev");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (stepIndex) => setCurrentStep(stepIndex);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  const fieldsByStep = [
    [
      { label: "Nombre Completo", name: "fullName", placeholder: "Ingresa tu nombre completo" },
      { label: "Correo Electrónico", name: "email", type: "email", placeholder: "Ingresa tu correo" },
      { label: "Teléfono", name: "phone", placeholder: "Ingresa tu teléfono" },
      { label: "Ubicación", name: "location", placeholder: "Ingresa tu ubicación" },
      { label: "URL de Portafolio", name: "portfolioUrl", type: "url", placeholder: "Ingresa tu portafolio (opcional)" },
    ],
    [
      { label: "Puesto Actual", name: "currentRole", placeholder: "Ingresa tu puesto actual" },
      {
        label: "Años de Experiencia",
        name: "yearsOfExperience",
        type: "number",
        placeholder: "Ingresa tus años de experiencia",
        options: { min: 0 },
      },
      { label: "Habilidades", name: "skills", type: "tags" },
      { label: "Empresa", name: "company", placeholder: "Ingresa el nombre de tu empresa" },
      {
        label: "Descripción de Logros",
        name: "achievementsDescription",
        placeholder: "Describe tus logros (mínimo 100 caracteres)",
      },
    ],
  ];

  const renderFields = (fields) =>
    fields.map((field) =>
      field.type === "tags" ? (
        <TagsInput
          key={field.name}
          register={methods.register}
          name={field.name}
          errors={errors[field.name]}
          initialTags={methods.getValues(field.name)}
        />
      ) : (
        <div key={field.name} className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">{field.label}</label>
          <input
            type={field.type || "text"}
            {...methods.register(field.name)}
            placeholder={field.placeholder}
            className={`w-full p-3 rounded-md border bg-white shadow-sm text-sm transition-colors ${
              errors[field.name] ? "border-red-500" : "border-neutral-300"
            } focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name].message}</p>
          )}
        </div>
      )
    );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto my-6 p-6 rounded-xl border bg-white shadow-md"
      >
        <Stepper steps={steps} currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep < steps.length - 1 && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction === "next" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -50 : 50 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
                {renderFields(fieldsByStep[currentStep])}
              </div>
            </motion.div>
          )}

          {currentStep === steps.length - 1 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: direction === "next" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -50 : 50 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-4">Revisar Detalles</h2>
                <div className="space-y-6">
                  {Object.entries(methods.getValues()).map(([key, value]) => (
                    <div key={key} className="bg-gray-100 p-4 rounded shadow">
                      <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</h3>
                      {Array.isArray(value) ? (
                        <div className="flex flex-wrap mt-2">
                          {value.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded mr-2"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="break-words">{value || "No proporcionado"}</p>
                      )}
                      <button
                        type="button"
                        className="mt-2 text-blue-600 hover:underline"
                        onClick={() => goToStep(fieldsByStep.findIndex((fields) => fields.some((f) => f.name === key)))}
                      >
                        Editar
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                    />
                    <span>Confirmo que los detalles son correctos.</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
            disabled={currentStep === 0}
          >
            Anterior
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              className={`px-4 py-2 bg-green-500 text-white rounded-md ${
                isConfirmed ? "hover:bg-green-600" : "opacity-50 cursor-not-allowed"
              } transition-all`}
              disabled={!isConfirmed}
            >
              Enviar
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
