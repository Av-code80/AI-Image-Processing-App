import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function H1({ className, children, ...props }: Props) {
  return (
    <h1
      className={twMerge('text-4xl font-bold text-center', className)}
      {...props}
    >
      {children}
    </h1>
  )
}
