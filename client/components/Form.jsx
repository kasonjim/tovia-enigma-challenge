import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import { Button } from 'react-toolbox/lib/button';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <div>

        <Card>
          <CardTitle
            title="Tovia's Enigma" />
          <CardText>
            <div className="row align-items-center">
              <div className="col-2">
                <Avatar title={this.props.name || '?'} />
              </div>
              <div className="col-8">
                <Input
                  type="text"
                  label="Name"
                  name="name"
                  value={this.props.name}
                  required
                  onChange={this.props.nameHandler} />
              </div>
            </div>
            <Input
              type="text"
              label="Message"
              name="message"
              value={this.props.message}
              maxLength={120}
              multiline
              required
              onChange={this.props.messageHandler} />
            <DatePicker
              label="Expiration Date"
              name="date"
              value={this.props.date}
              required
              sundayFirstDayOfWeek
              onChange={this.props.dateHandler} />
          </CardText>
          <CardActions>
            <Button
              label="ENCRYPT"
              onClick={this.props.encrypt} />
            <Button
              label="DECRYPT"
              onClick={this.props.handleCryptionDialog} />
          </CardActions>
        </Card>

      </div>
    );
  }
}

window.Form = Form;