export interface AlertProps {
  badge: 'Info' | 'Warning' | 'Error' | 'Success',
  message: string
}

export const Alert = (props: AlertProps) => {
  return (
    <div class="text-center p-4">
      <div class="p-2 bg-green-light items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
           role="alert">
        <span class="flex rounded-full bg-green-dark text-green-light uppercase px-2 py-1 text-xs font-bold mr-3">{props.badge}</span>
        <span
          class="font-semibold text-green-dark mr-2 text-left flex-auto">{props.message}
        </span>
      </div>
    </div>
  )
}