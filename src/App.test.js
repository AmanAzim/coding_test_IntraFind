import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('App.js renders properly', () => {
    const wrappper = renderer.create(<App />).toJSON();
    expect(wrappper).toMatchSnapshot();
});
