
// PureComponent 로 성능 최적화

import React,{ PureComponent } from 'react'
import Try from './Try';

class Test extends PureComponent {
    state = {
        counter: 0,
    }

    onClick = () => {
        this.setState({}) //  이렇게 아무것도 넣지 않았는데도 렌더링이 일어남
    }

    render() { 
        console.log('렌더링',this.state);
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}
export default Test;
//------------------------------------------------------------------------
/*
// shouldComponentUpdate 로 성능최적화

import React,{ Component } from 'react'
import Try from './Try';

class Test extends Component {
    state = {
        counter: 0,
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) { // 어떤 경우에 렌더링을 할지 지정해줄 수 있음
        if (this.state.counter !== nextState.counter) { // 카운터 값이 변경되었을 경우만
            return true; // 렌더링을 한다.
        } else {
            return false;
        }
    }

    onClick = () => {
        this.setState({}) //  이렇게 아무것도 넣지 않았는데도 렌더링이 일어남
    }

    render() { 
        console.log('렌더링',this.state);
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}
export default Test;
*/