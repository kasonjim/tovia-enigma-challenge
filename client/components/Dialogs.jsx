import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';

export default class Errors extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>

        <Dialog
          title="De/Encrypt"
          active={this.props.cryptDialogActive}
          onEscKeyDown={this.props.handleCryptionDialog}
          onOverlayClick={this.props.handleCryptionDialog}
          actions={[
            { label: 'Cancel', onClick: this.props.handleCryptionDialog },
            { label: 'Decrypt', onClick: this.props.decrypt }
          ]}>
          <Input
            type="text"
            label="Message"
            name="encryptedString"
            value={this.props.encryptedString}
            multiline
            required
            onChange={this.props.encryptedStringHandler} />
        </Dialog>

        <Dialog
          title="Invalid Code"
          active={this.props.errorDialogActive}
          onEscKeyDown={this.props.handleErrorDialog}
          onOverlayClick={this.props.handleErrorDialog}
          actions={[
            { label: 'Close', onClick: this.props.handleErrorDialog }
          ]}>
          <p>The code you have entered is either invalid or has expired</p>
        </Dialog>

        <Dialog
          title="Invalid Form"
          active={this.props.incompleteDialogActive}
          onEscKeyDown={this.props.handleIncompleteDialog}
          onOverlayClick={this.props.handleIncompleteDialog}
          actions={[
            { label: 'Close', onClick: this.props.handleIncompleteDialog }
          ]}>
          <p>All fields in the form must be filled out before encrypting.</p>
        </Dialog>

      </div>
    );
  }
}

window.Errors = Errors;