import Form from './Form.js'
import Passphrase from './Passphrase.js'
import Dialogs from './Dialogs.js'

// **TODO** make sure linter is working
// **TODO** setup grunt

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
  }

  componentDidMount() {
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
    .catch( err => {
      // Log error if issue with encrypting
      // console.log('Encrypt error: ', err)
    })
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
      // console.log('Decrypt error: ', err)
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
      <div className="row justify-content-around" style={{fontFamily: 'Roboto, Helvetica, Arial, sans-serif'}} >

        <div style={{width: '350px', margin: '10px'}}>
          <Form
            name={this.state.name}
            message={this.state.message}
            date={this.state.date}
            encryptedString={this.state.encryptedString}
            nameHandler={this.inputHandler.bind(this, 'name')}
            messageHandler={this.inputHandler.bind(this, 'message')}
            dateHandler={this.inputHandler.bind(this, 'date')}
            encrypt={this.encrypt.bind(this)}
            handleCryptionDialog={this.handleCryptionDialog.bind(this)} />

          <Passphrase
            passphrase={this.state.passphrase}
            generatePassphrase={this.generatePassphrase.bind(this)} />

          <Dialogs
            decrypt={this.decrypt.bind(this)}
            encryptedString={this.state.encryptedString}
            encryptedStringHandler={this.inputHandler.bind(this, 'encryptedString')}
            cryptDialogActive={this.state.cryptDialogActive}
            errorDialogActive={this.state.errorDialogActive}
            incompleteDialogActive={this.state.incompleteDialogActive}
            handleCryptionDialog={this.handleCryptionDialog.bind(this)}
            handleErrorDialog={this.handleErrorDialog.bind(this)}
            handleIncompleteDialog={this.handleIncompleteDialog.bind(this)} />

        </div>

      </div>
    );
  }
}

window.App = App;