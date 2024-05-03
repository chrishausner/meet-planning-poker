import {render} from "solid-js/web";
import { createEffect, createSignal } from "solid-js";
import '../../index.css';
import {Card} from "./components/card";
import { Alert } from "@pages/sidepanel/components/alert";

function App() {
    const [estimation, setEstimation] = createSignal(0);
    const [error, setError] = createSignal(false);

    createEffect(() => {
        console.log(estimation());
        const data = {
          type: "ESTIMATION",
          value: estimation()
        }
    })

    const handleSubmit = () => {
      const data = {
        type: "REVEAL_ESTIMATIONS",
        value: estimation()
      }
      sendMessage(data)
      setEstimation(0);
    }

    const sendMessage = (data: { type: string; value: number; }): any => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, data).then(
          response => {
            if (response && response.value === "error") {
              console.log("Error sending message");
              setError(true);
            }
          }
        );
      })
    }

    return (
      <div class="flex-col w-full h-screen">
        <h1 class="text-3xl text-center p-4">Planning Poker</h1>
        {error() && <Alert badge="Info" message="This is an Info Message" />}
        <div class="flex flex-col w-full p-4 absolute bottom-0 gap-8">
          <div class="flex flex-wrap gap-4 w-full justify-center">
            <Card value={1} setEstimation={setEstimation}/>
            <Card value={2} setEstimation={setEstimation}/>
            <Card value={3} setEstimation={setEstimation}/>
            <Card value={5} setEstimation={setEstimation}/>
            <Card value={8} setEstimation={setEstimation}/>
            <Card value={13} setEstimation={setEstimation}/>
          </div>
          <button onClick={handleSubmit} class="bg-green-light hover:ring hover:ring-green active:bg-green text-lg text-green-dark rounded-full w-full p-4 shadow-md">
            Reveal Estimations
          </button>
        </div>
      </div>
    );
}

render(App, document.getElementById("app"))