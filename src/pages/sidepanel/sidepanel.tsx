import { render } from "solid-js/web";
import { createEffect, createSignal } from "solid-js";
import '../../index.css';
import { Card } from "./components/card";
import { SelectBox } from "@pages/sidepanel/components/selectBox";
import { Alert } from "@pages/sidepanel/components/alert";

const sendMessageToContent = (data: { type: string; value?: number | string; }): any => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, data);
  });
}

function App() {
    const [estimation , setEstimation] = createSignal(undefined);
    const [error, setError] = createSignal(false);
    const [estimationValues, setEstimationValues] = createSignal(['?', '1', '2', '3', '5', '8', '13']);

    createEffect(() => {
        if (estimation() !== undefined) {
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
      if(request.type === "REVEAL_TRIGGERED") {
        if (estimation() !== undefined) {
          sendResponse({value: estimation()});
          setEstimation(undefined);
        } else {
          sendResponse({value: null})
        }
      } else if (request.type === "ERROR") {
        setError(true);
        sendResponse(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    });

    return (
      <div class="flex-col w-full h-screen m-2">
        <SelectBox setEstimationValues={setEstimationValues}/>
        <div class="flex flex-col w-full p-4 absolute bottom-0 gap-8">
          {error() && <Alert badge={'Error'} message={'Chat window not found'} setError={setError}/>}
          <div class="flex flex-wrap gap-4 w-full justify-center">
            {estimationValues().map((value) => (
              <Card value={value} setEstimation={setEstimation}/>
            ))}
          </div>
          <button onClick={handleSubmit} class="bg-green-light hover:ring hover:ring-green active:bg-green text-lg text-green-dark rounded-full w-full p-4 shadow-md">
            Reveal Estimations
          </button>
        </div>
      </div>
    );
}

render(App, document.getElementById("app"))