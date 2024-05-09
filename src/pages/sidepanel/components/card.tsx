import '../../../index.css'
import { Setter } from "solid-js";

export interface CardProps {
  value: string,
  setEstimation: Setter<string>
}

export const Card = (props: CardProps) => {
  return (
    <button onClick={() => props.setEstimation(props.value)}
            class="flex w-20 h-32 bg-blue-light text-blue-dark hover:ring hover:ring-blue-dark active:bg-blue focus:ring-blue-dark focus:bg-blue focus:text-white rounded-2xl justify-center items-center shadow-md border-b-blue-dark">
      <span class="text-2xl">{props.value}</span>
    </button>
  )
}