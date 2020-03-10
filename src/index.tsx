import { Test } from "./component/index";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(<Test />, document.getElementById('root'));


if (module.hot) {
    module.hot.accept();
}