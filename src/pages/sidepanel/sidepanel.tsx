import {render} from "solid-js/web";
import { createEffect, createSignal } from "solid-js";
import '../../index.css';
import {Card} from "./components/card";

function App() {
    const [estimation, setEstimation] = createSignal(0);

    createEffect(() => {
        console.log(estimation());
    })

    const handleSubmit = () => {
      setEstimation(0);
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, "REVEAL_ESTIMATIONS").then(response => {console.log(response)});
      })
    }

    return (
      <div class="flex-col  w-full font-mono h-screen">
        <h1 class="text-3xl text-center p-4">Planning Poker</h1>
        <div class="flex flex-col w-full p-4 absolute bottom-0 gap-8">
          <div class="flex flex-wrap gap-4 w-full justify-center">
            <Card value={1} setEstimation={setEstimation}/>
            <Card value={2} setEstimation={setEstimation}/>
            <Card value={3} setEstimation={setEstimation}/>
            <Card value={5} setEstimation={setEstimation}/>
            <Card value={8} setEstimation={setEstimation}/>
            <Card value={13} setEstimation={setEstimation}/>
          </div>
          <button onClick={handleSubmit} class="bg-green-light hover:ring hover:ring-green active:bg-green text-xl rounded-lg w-full p-4 shadow-md">
            Reveal Estimations
          </button>
        </div>
      </div>
    );
}

render(App, document.getElementById("app"))
