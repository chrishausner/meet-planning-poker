import '../../../index.css'

export interface CardProps {
  value: number
}

export const Card = (props: CardProps) => {
  return (
    <button class="flex w-20 h-32 bg-blue-light hover:bg-blue-dark active:bg-blue focus:ring-blue-dark focus:bg-blue rounded-lg justify-center items-center shadow-md border-b-blue-dark">
      <span class="text-2xl">{props.value}</span>
    </button>
  )
}