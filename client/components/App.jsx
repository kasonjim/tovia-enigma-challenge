import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';

import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';

import CopyToClipboard from 'react-copy-to-clipboard';

const TooltipLink = Tooltip(Link);

// **TODO** when typing in url /#12345, set the current state passphrase value to the URL

// **TODO** fix up styling
//            * avatar should be on same line as name
//            * move all "style" tags into classes in a separate CSS file?
// **TODO** make sure linter is working
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
      cryptDialogActive: false,
      errorDialogActive: false,
      incompleteDialogActive: false
    };

    this.pvalues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    this.actions = [
      { label: 'Cancel', onClick: this.handleCryptionDialog.bind(this) },
      { label: 'Decrypt', onClick: this.decrypt.bind(this) }
    ];
    this.errorActions = [
      { label: 'Close', onClick: this.handleErrorDialog.bind(this) }
    ];
    this.incompleteActions = [
      { label: 'Close', onClick: this.handleIncompleteDialog.bind(this) }
    ];
  }

  componentDidMount() {
    // **TODO** when typing in url /#12345, set the current state passphrase value to the URL
    // If there is a URL value passphrase, set that to this.state.passphrase
    // Otherwise, generate a fresh passphrase
    if (window.location.hash) {
      this.setState({
        passphrase: window.location.hash.replace('#','')
      })
    } else {
      this.generatePassphrase();
    }
  }

  handleCryptionDialog() {
    this.setState({ cryptDialogActive: !this.state.cryptDialogActive });
  }

  handleErrorDialog() {
    this.setState({ errorDialogActive: !this.state.errorDialogActive });
  }

  handleIncompleteDialog() {
    this.setState({ incompleteDialogActive: !this.state.incompleteDialogActive });
  }

  inputHandler(type, value) {
    this.setState({
      [type]: value
    }, () => {
      // console.log('current state: ', this.state);
    })
  }

  formValid() {
    if (this.state.name && this.state.message && this.state.date) {
      return true;
    } else {
      this.handleIncompleteDialog();
      return false;
    }
  }

  encrypt() {
    if (!this.formValid()) {
      return;
    }

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
        this.handleCryptionDialog();
        // console.log('current state: ', this.state);
      })
    })
    .catch( err => console.log('Encrypt error: ', err))
  }

  decrypt() {
    if (!this.state.encryptedString) {
      return;
    }

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
      let today = Date.now().valueOf();
      let expire = (new Date(data.date)).valueOf();

      if (today < expire) {
        this.setState({
          name: data.name,
          message: data.message,
          date: new Date(data.date)
        }, () => {
          // console.log('current state: ', this.state);
          this.handleCryptionDialog();
        })
      } else {
        this.handleCryptionDialog();
        this.handleErrorDialog();
      }
    })
    .catch( err => {
      console.log('Decrypt error: ', err)
      this.handleCryptionDialog();
      this.handleErrorDialog();
    })
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
      <div style={{width: '350px'}}>

        <Card style={{width: '100%'}}>
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
              onClick={this.handleCryptionDialog.bind(this)} />
          </CardActions>

        </Card>

        <div style={{width: '100%', textAlign: 'center', fontFamily: 'Roboto, Helvetica, Arial, sans-serif', fontSize: '0.8em'}}>
          <div style={{padding: '20px 5px 5px 5px'}}>
            <span>Your Passphrase - </span>
            <CopyToClipboard text={this.state.passphrase}>
              <TooltipLink href="#" style={{display: 'inline'}} label={this.state.passphrase} tooltip='Click to copy to clipboard' tooltipHideOnClick={true} />
            </CopyToClipboard>
          </div>
          <div style={{padding: '10px 5px'}}>
            <a href="#" onClick={this.generatePassphrase.bind(this)}>Generate new Passphrase</a>
          </div>
        </div>

        <Dialog
          title="De/Encrypt"
          active={this.state.cryptDialogActive}
          onEscKeyDown={this.handleCryptionDialog.bind(this)}
          onOverlayClick={this.handleCryptionDialog.bind(this)}
          actions={this.actions}>
          <Input
            type="text"
            label="Message"
            name="encryptedString"
            value={this.state.encryptedString}
            multiline
            required
            onChange={this.inputHandler.bind(this, 'encryptedString')} />
        </Dialog>

        <Dialog
          title="Invalid Code"
          active={this.state.errorDialogActive}
          onEscKeyDown={this.handleErrorDialog.bind(this)}
          onOverlayClick={this.handleErrorDialog.bind(this)}
          actions={this.errorActions}>
          <p>The code you have entered is either invalid or has expired</p>
        </Dialog>

        <Dialog
          title="Invalid Form"
          active={this.state.incompleteDialogActive}
          onEscKeyDown={this.handleIncompleteDialog.bind(this)}
          onOverlayClick={this.handleIncompleteDialog.bind(this)}
          actions={this.incompleteActions}>
          <p>All fields in the form must be filled out before encrypting.</p>
        </Dialog>

      </div>
    );
  }
}

window.App = App;