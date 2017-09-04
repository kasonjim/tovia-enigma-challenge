import { Button } from 'react-toolbox/lib/button';
import { Input } from 'react-toolbox/lib/input';
import { DatePicker } from 'react-toolbox/lib/date_picker';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: '',
      date: ''
    };
  }

  inputHandler(type, value) {
    this.setState({
      [type]: value
    }, () => {
      console.log('current state: ', this.state);
    })
  }

  encrypt() {
    console.log('encrypt')
  }

  decrypt() {
    console.log('decrypt')
  }

  render() {
    return (
      <div>
        <h1>Tovias Enigma</h1>
        <Input type="text" label="Name" name="name" required onChange={this.inputHandler.bind(this, 'name')} />
        <Input type="text" label="Message" name="message" maxLength={120} multiline required onChange={this.inputHandler.bind(this, 'message')} />
        <DatePicker label="Expiration Date" name="date" required onChange={this.inputHandler.bind(this, 'date')} />
        <Button label="ENCRYPT" onMouseUp={this.encrypt.bind(this)} />
        <Button label="DECRYPT" onMouseUp={this.decrypt.bind(this)} />
      </div>
    );
  }
}

window.App = App;