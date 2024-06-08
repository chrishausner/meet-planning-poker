import { Setter } from "solid-js";

export interface SelectBoxProps {
  readonly setEstimationValues: Setter<string[]>;
}

type SelectValue = 'FIBONACCI' | 'EXTENDED_FIBONACCI' | 'SHIRTS';

const valueMapping: Record<SelectValue, string[]> = {
  FIBONACCI: ['?', '1', '2', '3', '5', '8', '13'],
  EXTENDED_FIBONACCI: ['?', '1', '2', '3', '5', '8', '13', '21', '34', '55'],
  SHIRTS: ['?', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

export const SelectBox = (props: SelectBoxProps) => {
  const handleChange = (event: Event) => {
    const selectedValue = (event.target as HTMLSelectElement).value as SelectValue;
    props.setEstimationValues(valueMapping[selectedValue]);
  }

  return (
    <div class="flex justify-center w-full">
      <form class="flex justify-center bg-yellow-light border border-yellow text-gray-900 text-md rounded-full w-1/2 shadow-md">
          <select id="values"
                  onChange={handleChange}
                  class="text-center bg-yellow-light focus:outline-none m-2.5 rounded-full w-full">
            <option selected value='FIBONACCI'>Fibonacci (1 - 13)</option>
            <option value='EXTENDED_FIBONACCI'>Fibonacci (1 - 55)</option>
            <option value='SHIRTS'>Shirt sizes</option>
          </select>
      </form>
    </div>
)};