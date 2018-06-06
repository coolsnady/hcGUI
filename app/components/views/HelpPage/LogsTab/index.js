import Logs from "./Page";
import { getHxdLogs, getDcrwalletLogs } from "wallet";
import { logging } from "connectors";
import { DescriptionHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import ReactTimeout from "react-timeout";

export const LogsTabHeader = () =>
  <DescriptionHeader
    description={<T id="help.description.logs" m="Please find your current logs below to look for any issue or error you are having." />}
  />;
@autobind
class LogsTabBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentDidMount() {
    const interval = this.props.setInterval(() => {
      Promise
        .all([ getHxdLogs(), getDcrwalletLogs() ])
        .then(([ rawHxdLogs, rawDcrwalletLogs ]) => {
          const hxdLogs = Buffer.from(rawHxdLogs).toString("utf8");
          const dcrwalletLogs = Buffer.from(rawDcrwalletLogs).toString("utf8");
          if ( hxdLogs !== this.state.hxdLogs )
            this.setState({ hxdLogs });
          if ( dcrwalletLogs !== this.state.dcrwalletLogs )
            this.setState({ dcrwalletLogs });
        });
    }, 2000);
    this.setState({ interval });
  }

  componentWillUnmount() {
    this.props.clearInterval(this.state.interval);
  }

  getInitialState() {
    return {
      interval: null,
      hxdLogs: "",
      dcrwalletLogs: "",
      decreditonLogs: null,
      showHxdLogs: false,
      showDcrwalletLogs: false,
      showDecreditonLogs: false
    };
  }

  render() {
    const { onShowDecreditonLogs, onShowHxdLogs, onShowDcrwalletLogs,
      onHideDecreditonLogs, onHideHxdLogs, onHideDcrwalletLogs
    } = this;
    const { isDaemonRemote, isDaemonStarted } = this.props;
    const {
      hxdLogs, dcrwalletLogs, decreditonLogs, showHxdLogs, showDcrwalletLogs, showDecreditonLogs
    } = this.state;
    return (
      <Logs
        {...{
          ...this.props, ...this.state }}
        {...{
          showDecreditonLogs,
          showHxdLogs,
          showDcrwalletLogs,
          onShowDecreditonLogs,
          onShowHxdLogs,
          onShowDcrwalletLogs,
          onHideDecreditonLogs,
          onHideHxdLogs,
          onHideDcrwalletLogs,
          hxdLogs,
          dcrwalletLogs,
          decreditonLogs,
          isDaemonRemote,
          isDaemonStarted
        }}
      />
    );
  }

  onShowDecreditonLogs() {
    this.setState({ showDecreditonLogs: true });
  }

  onHideDecreditonLogs() {
    this.setState({ showDecreditonLogs: false });
  }

  onShowHxdLogs() {
    this.setState({ showHxdLogs: true });
  }

  onHideHxdLogs() {
    this.setState({ showHxdLogs: false });
  }

  onShowDcrwalletLogs() {
    this.setState({ showDcrwalletLogs: true });
  }

  onHideDcrwalletLogs() {
    this.setState({ showDcrwalletLogs: false });
  }
}

export const LogsTab = ReactTimeout(logging(LogsTabBody));
