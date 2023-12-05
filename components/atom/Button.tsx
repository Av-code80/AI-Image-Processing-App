import { twMerge } from 'tailwind-merge'
interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, children, ...props }: Props) {
  return (
      <button
        className={twMerge(
          'bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded',
          className,
        )}
        {...props}
      >
        {children}
      </button>
  )
}
