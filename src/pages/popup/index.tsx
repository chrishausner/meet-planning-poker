import { render } from "solid-js/web";

const Popup = () => {
    return (
        <div>
            POPUP
        </div>
    );
};

const appContainer = document.querySelector("#app-container");
if (!appContainer) {
    throw new Error("Can not find AppContainer");
}

render(Popup, appContainer);