interface LabelProps {
  label: string
  size?: 'md' | 'sm'
}
export function Label({ label, size = 'md' }: LabelProps) {
  return (
    <div
      className={`bg-gray-300 flex justify-center items-center font-semibold text-gray-600 ${size === 'md' ? 'py-2 px-4  text-md' : 'py-1 px-3 text-sm'}   rounded-full`}
    >
      {label}
    </div>
  )
}
