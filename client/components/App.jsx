import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';

// **TODO** Update form with data received when decrypting (for DATE)
// **TODO** Encryption: show dialog with encrypted value

// **TODO** Form validation
// **TODO** when typing in url /#12345, set the current state passphrase value to the URL
// **TODO** copy passphrase upon click
// **TODO** fix up styling
// **TODO** separate into smaller components

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      message: '',
      date: '',
      passphrase: '',
      encryptedString: '',
      dialogActive: false
    };

    this.pvalues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.actions = [
      { label: 'Cancel', onClick: this.handleToggle.bind(this) },
      { label: 'Decrypt', onClick: this.decrypt.bind(this) }
    ];
  }

  componentDidMount() {
    this.generatePassphrase();
  }

  handleToggle() {
    this.setState({ dialogActive: !this.state.dialogActive });
  }

  inputHandler(type, value) {
    this.setState({
      [type]: value
    }, () => {
      console.log('current state: ', this.state);
    })
  }

  encrypt() {
    fetch('/api/encrypt/' + this.state.passphrase, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        message: this.state.message,
        date: this.state.date
      })
    })
    .then( (res) => res.json() )
    .then( (data) => {
      this.setState({
        encryptedString: data
      }, () => {
        // **TODO** Show a pop up with the encrypted string
        console.log('current state: ', this.state);
      })
    })
    .catch( err => console.log('Encrypt error: ', err))
  }

  decrypt() {
    fetch('/api/decrypt/' + this.state.passphrase, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        encryptedString: this.state.encryptedString
      })
    })
    .then( (res) => res.json() )
    .then( (data) => {
      this.setState({
        name: data.name,
        message: data.message,
        date: data.date
      }, () => {
        console.log('current state: ', this.state);
        this.handleToggle();
      })
    })
    .catch( err => console.log('Decrypt error: ', err))
  }

  generatePassphrase() {
    let text = '';

    for (let i = 0; i < 5; i++) {
      text += this.pvalues.charAt(Math.floor(Math.random() * this.pvalues.length));
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
              value={this.state.name}
              required
              onChange={this.inputHandler.bind(this, 'name')} />
            <Input
              type="text"
              label="Message"
              name="message"
              value={this.state.message}
              maxLength={120}
              multiline
              required
              onChange={this.inputHandler.bind(this, 'message')} />
            <DatePicker
              label="Expiration Date"
              name="date"
              value={this.state.date}
              required
              sundayFirstDayOfWeek
              onChange={this.inputHandler.bind(this, 'date')} />
          </CardText>
          <CardActions>
            <Button
              label="ENCRYPT"
              onClick={this.encrypt.bind(this)} />
            <Button
              label="DECRYPT"
              onClick={this.handleToggle.bind(this)} />
          </CardActions>
          <CardText>
            <div>Your Passphrase - {this.state.passphrase}</div>
            <div><a href="#" onClick={this.generatePassphrase.bind(this)}>Generate new Passphrase</a></div>
          </CardText>
        </Card>

        <Dialog
          title="De/Encrypt"
          active={this.state.dialogActive}
          onEscKeyDown={this.handleToggle.bind(this)}
          onOverlayClick={this.handleToggle.bind(this)}
          actions={this.actions}>
          <Input
            type="text"
            label="Message"
            name="encryptionString"
            value={this.state.encryptedString}
            required />
        </Dialog>
      </div>
    );
  }
}

window.App = App;