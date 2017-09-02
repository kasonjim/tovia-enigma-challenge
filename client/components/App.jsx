import { Button } from 'react-toolbox/lib/button';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Tovias Enigma</h1>
        <Button label="Hello there!" />
      </div>
    );
  }
}

window.App = App;