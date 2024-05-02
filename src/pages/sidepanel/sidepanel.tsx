import {render} from "solid-js/web";
import '../../index.css';

function App() {
    return (
        // @ts-ignore
        <div class="flex-col w-full font-mono bg-amber-200 h-10">
            <h1 class="text-3xl text-center">Planning Poker</h1>
        </div>

    );
}

render(App, document.getElementById("app"))
