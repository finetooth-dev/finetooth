'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type QuestionProps = {
  type: 'short' | 'long' | 'select' | 'email';
  question: string;
  required: boolean;
  options?: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onEnterPress?: () => void;
};

const Question: React.FC<QuestionProps> = ({
  type,
  question,
  required,
  options,
  value,
  onChange,
  onEnterPress,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'short' && (
        <input
          type="text"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === 'long' && (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
          rows={4}
        />
      )}
      {type === 'select' && options && (
        <div className="grid grid-cols-2 gap-2">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                onChange(
                  value.includes(option)
                    ? (value as string[]).filter((v) => v !== option)
                    : [...(value as string[]), option]
                )
              }
              className={`py-2 px-4 border rounded hover:opacity-60 transition ${
                value.includes(option)
                  ? 'bg-blue-300 text-blue-500'
                  : 'bg-white text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {type === 'email' && (
        <input
          type="email"
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
    </div>
  );
};

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    timelineAndBudget: '',
    email: '',
    longAnswer: '',
    selectedOptions: [] as string[],
  });

  const encode = (data: Record<string, string | string[]>) => {
    return Object.keys(data)
      .map((key) =>
        Array.isArray(data[key])
          ? data[key]
              .map(
                (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
              )
              .join('&')
          : `${encodeURIComponent(key)}=${encodeURIComponent(
              data[key] as string
            )}`
      )
      .join('&');
  };

  const handleSubmit = async () => {
    const payload = {
      'form-name': 'client-intake',
      name: formData.name,
      website: formData.website,
      services: formData.selectedOptions,
      timelineAndBudget: formData.timelineAndBudget,
      email: formData.email,
      additionalInfo: formData.longAnswer,
      'bot-field': '',
    };

    await fetch('/__forms.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Form-Submission-Debug': 'true',
      },
      body: encode(payload),
    })
      .then(() => {
        console.log('Form submitted');
        // Optionally redirect or show success
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        setErrorMessage('Something went wrong. Please try again.');
        setTimeout(() => setErrorMessage(''), 4000);
      });

    setErrorMessage('submitting...');
    setTimeout(() => {
      setErrorMessage('');
      setTimeout(() => {
        setErrorMessage('Success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }, 1000);
    }, 500);
  };

  const questions: QuestionProps[] = [
    {
      type: 'short',
      question: "What's the name of your business/project?",
      required: true,
      value: formData.name,
      onChange: (value) =>
        setFormData((prev) => ({ ...prev, name: value as string })),
      onEnterPress: () => handleNext(),
    },
    {
      type: 'short',
      question: 'Do you have an existing website? If so, please paste it here',
      required: false,
      value: formData.website,
      onChange: (value) =>
        setFormData((prev) => ({ ...prev, website: value as string })),
      onEnterPress: () => handleNext(),
    },
    {
      type: 'select',
      question: 'What services are you interested in?',
      required: false,
      options: [
        'web design',
        'web development',
        'branding',
        'motion design',
        'video editing',
        'SEO',
        'copywriting',
      ],
      value: formData.selectedOptions,
      onChange: (value) =>
        setFormData((prev) => ({
          ...prev,
          selectedOptions: value as string[],
        })),
    },
    {
      type: 'short',
      question: "what's your ideal timeline and ballpark budget?",
      required: false,
      value: formData.timelineAndBudget,
      onChange: (value) =>
        setFormData((prev) => ({
          ...prev,
          timelineAndBudget: value as string,
        })),
      onEnterPress: () => handleNext(),
    },
    {
      type: 'email',
      question: "what's the best email to reach you?",
      required: true,
      value: formData.email,
      onChange: (value) =>
        setFormData((prev) => ({ ...prev, email: value as string })),
      onEnterPress: () => handleNext(),
    },
    {
      type: 'long',
      question: "anything else you'd like to add?",
      required: false,
      value: formData.longAnswer,
      onChange: (value) =>
        setFormData((prev) => ({ ...prev, longAnswer: value as string })),
      onEnterPress: () => handleNext(),
    },
  ];

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = currentQuestion.value;

    if (
      currentQuestion.required &&
      (!currentAnswer || currentAnswer.length === 0)
    ) {
      setErrorMessage('This field is required');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <form
      name="client-intake"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full p-4 sm:w-[24rem] mx-auto flex items-center justify-center flex-col gap-2 relative h-full"
    >
      {/* Netlify hidden inputs */}
      <input type="hidden" name="form-name" value="client-intake" />
      <input type="hidden" name="bot-field" />

      {/* Main UI */}
      <div className="w-full p-4 sm:w-[24rem] mx-auto mt-10 flex items-center justify-center flex-col gap-2 relative">
        <div className="mt-4 text-xs w-full text-gray-300">
          {currentStep + 1}/{questions.length}
        </div>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Question {...questions[currentStep]} />
        </motion.div>

        {/* Navigation */}
        <div className="flex w-full justify-between items-center mt-4">
          <div
            onClick={handleBack}
            className={`${
              currentStep === 0
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer'
            } hover:opacity-60 transition`}
          >
            [ back ]
          </div>
          <div
            onClick={
              currentStep === questions.length - 1 ? handleSubmit : handleNext
            }
            className="hover:opacity-60 transition cursor-pointer"
          >
            {currentStep === questions.length - 1 ? '[ submit ]' : '[ next ]'}
          </div>
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="w-full z-40 p-2 bg text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] border border-white backdrop-blur-[4px] rounded absolute w-full bottom-0 sm:bottom-64"
            style={{
              background:
                'linear-gradient(45deg, transparent,rgba(237, 237, 237, 0.24))',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {errorMessage}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden static inputs for Netlify to parse at build time */}
      <div hidden aria-hidden="true">
        <input type="text" name="name" />
        <input type="text" name="website" />
        <input type="text" name="services" />
        <input type="text" name="timelineAndBudget" />
        <input type="email" name="email" />
        <textarea name="additionalInfo" />
      </div>
    </form>
  );
};

export default Form;
