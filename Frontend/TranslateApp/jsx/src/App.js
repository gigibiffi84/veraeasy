import logo from './logo.svg';
import './App.css';

function App() {
  const sum = 1 + 2;
  const message = `Hi There ${sum}`;
  const style = { border: '3px solid red' };
  return (

    <section className={"layout"}>
      <div className={"header"}>  <h1>{message}</h1>
        <input width={"100%"} type={"number"} minLength={5} maxLength={10} style={style}></input></div>
      <div className={"leftSide"}>2</div>
      <div className={"body"}>3</div>
      <div className={"rightSide"}>4</div>
      <div className={"footer"}>5</div>
    </section>

  );
}

export default App;
