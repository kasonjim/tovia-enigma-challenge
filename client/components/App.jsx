import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Button } from 'react-toolbox/lib/button';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: '',
      date: '',
      pvalues: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      passphrase: '',
    };
  }

  componentDidMount() {
    this.generatePassphrase();
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

  generatePassphrase() {
    let text = '';

    for (let i = 0; i < 5; i++) {
      text += this.state.pvalues.charAt(Math.floor(Math.random() * this.state.pvalues.length));
    }

    this.setState({
      passphrase: text
    })
  }

  render() {
    return (
      <div>
        <Card style={{width: '450px'}}>
          <CardTitle
            title="Tovia's Enigma" />
          <CardText>
            <Avatar title={this.state.name || '?'} />
            <Input
              type="text"
              label="Name"
              name="name"
              required
              onChange={this.inputHandler.bind(this, 'name')} />
            <Input
              type="text"
              label="Message"
              name="message"
              maxLength={120}
              multiline
              required
              onChange={this.inputHandler.bind(this, 'message')} />
            <DatePicker
              label="Expiration Date"
              name="date"
              required
              onChange={this.inputHandler.bind(this, 'date')} />
          </CardText>
          <CardActions>
            <Button
              label="ENCRYPT"
              onClick={this.encrypt.bind(this)} />
            <Button
              label="DECRYPT"
              onClick={this.decrypt.bind(this)} />
          </CardActions>
          <CardText>
            <div>Your Passphrase - {this.state.passphrase}</div>
            <div><a href="#" onClick={this.generatePassphrase.bind(this)}>Generate new Passphrase</a></div>
          </CardText>
        </Card>
      </div>
    );
  }
}

window.App = App;