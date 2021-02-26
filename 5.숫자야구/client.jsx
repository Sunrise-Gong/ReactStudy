import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import NumberBaseball from './NumberBaseball';
//import Test from './Test';

const Hot = hot(NumberBaseball); // 숫자 야구 게임 
//const Hot = hot(Test); // 리액트 성능 최적화 테스트

ReactDOM.render(<Hot />, document.querySelector("#root"))
