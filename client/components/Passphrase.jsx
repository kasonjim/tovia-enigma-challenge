import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';
import CopyToClipboard from 'react-copy-to-clipboard';

const TooltipLink = Tooltip(Link);

export default class Passphrase extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className="row justify-content-around">
          <div style={{padding: '20px 5px 5px 5px'}}>
            <span>Your Passphrase - </span>
            <CopyToClipboard text={this.props.passphrase}>
              <TooltipLink href="#" style={{display: 'inline'}} label={this.props.passphrase} tooltip='Click to copy to clipboard' tooltipHideOnClick={true} />
            </CopyToClipboard>
          </div>
          <div style={{padding: '10px 5px'}}>
            <a href="#" onClick={this.props.generatePassphrase}>Generate new Passphrase</a>
          </div>
        </div>
      </div>
    );
  }
}

window.Passphrase = Passphrase;