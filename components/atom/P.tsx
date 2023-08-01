import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {}

export default function P({ className, children, ...props }: Props) {
  return (
    <p className={twMerge('text-lg', className)} {...props}>
      {children}
    </p>
  )
}
