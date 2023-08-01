import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  type?: 'text' 
  name?: string
  className?: string
  label?: string
}

export function TextInput({
  id,
  type = 'text',
  name = id,
  className = '',
  label = '',
  ...props
}: InputProps) {
  return (
    <label
      htmlFor={id}
      className={`mb-6 block text-sm font-medium  text-purple-900 bold ${className}`}
    >
      {label}
      <input
        type={type}
        id={id}
        name={name}
        className="mt-4  text-purple-900  block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        {...props}
      />
    </label>
  )
}
