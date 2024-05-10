import { Setter } from "solid-js";

export interface AlertProps {
  badge: 'Info' | 'Warning' | 'Error' | 'Success',
  message: string
  setError: Setter<boolean>
}

export const Alert = (props: AlertProps) => {
  return (
    <div class="text-center p-4">
      <div class="p-2 bg-red-light items-center text-indigo-100 leading-none rounded-full flex lg:inline-flex"
           role="alert">
        <span class="flex rounded-full bg-red-dark text-red-light uppercase px-2 py-1 text-xs font-bold mr-3">{props.badge}</span>
        <span
          class="font-semibold text-red-dark mr-2 text-left flex-auto">{props.message}
        </span>
        <button onClick={() => props.setError(false)} class="rounded-full text-red-dark border-2 border-red-dark uppercase text-xs font-bold px-2 py-1">X</button>
      </div>
    </div>
  )
}