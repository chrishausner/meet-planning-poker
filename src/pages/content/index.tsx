import {render } from 'solid-js/web';

const App = () => {
    return (
        <div>
            Hello There
        </div>
    )
}

const root = document.createElement('div');
root.id = 'extension-root';
document.body.append(root);

render(App, root);