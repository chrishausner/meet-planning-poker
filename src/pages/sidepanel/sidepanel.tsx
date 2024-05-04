import { render } from "solid-js/web";
import { createEffect, createSignal } from "solid-js";
import '../../index.css';
import { Card } from "./components/card";
import { Alert } from "@pages/sidepanel/components/alert";

const sendMessageToContent = (data: { type: string; value?: number | string; }): any => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, data);
  });
}

function App() {
    const [estimation, setEstimation] = createSignal(0);
    const [error, setError] = createSignal(false);

    createEffect(() => {
        if (estimation() > 0) {
          sendMessageToContent({type: "ESTIMATION"});
        }
    })

    const handleSubmit = () => {
      const data = {
        type: "REVEAL_ESTIMATIONS",
        value: '--------Estimations--------'
      }
      sendMessageToContent(data)
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.type === "REVEAL_TRIGGERED" && estimation() > 0) {
        sendResponse({value: estimation()});
        setEstimation(0);
      }
    });

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