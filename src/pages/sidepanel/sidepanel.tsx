import {render} from "solid-js/web";
import '../../index.css';
import {Card} from "./components/card";

function App() {
    return (
      <div class="flex-col  w-full font-mono bg-amber-200 h-screen">
        <h1 class="text-3xl text-center">Planning Poker</h1>
        <div class="flex flex-col w-full p-4 absolute bottom-0 gap-8">
          <div class="flex flex-wrap gap-4 w-full justify-center">
            <Card value={1} />
            <Card value={2} />
            <Card value={3} />
            <Card value={5} />
            <Card value={8} />
            <Card value={13} />
          </div>
          <button class="bg-green-light hover:bg-green text-xl rounded-lg w-full p-4 shadow-md">
            Reveal Estimations
          </button>
        </div>
      </div>
    );
}

render(App, document.getElementById("app"))
