import { FormattedMessage as T } from "react-intl";
import "style/Logs.less";

const Logs = ({
  showHxdLogs,
  showDcrwalletLogs,
  onShowHxdLogs,
  onShowDcrwalletLogs,
  onHideHxdLogs,
  onHideDcrwalletLogs,
  hxdLogs,
  dcrwalletLogs,
  isDaemonRemote,
  isDaemonStarted,
  walletReady,
}
) => (
  <Aux>
    <div className="tabbed-page-subtitle"><T id="logs.subtitle" m="System Logs"/></div>
    {!isDaemonRemote && isDaemonStarted ?
      !showHxdLogs ?
        <div className="log-area hidden">
          <div className="log-area-title hidden" onClick={onShowHxdLogs}>
            <T id="help.logs.hxd" m="hxd" />
          </div>
        </div>:
        <div className="log-area expanded">
          <div className="log-area-title expanded" onClick={onHideHxdLogs}>
            <T id="help.logs.hxd" m="hxd" />
          </div>
          <div className="log-area-logs">
            <textarea rows="30" value={hxdLogs} disabled />
          </div>
        </div> :
      <div/>
    }
    {!walletReady ? null : !showDcrwalletLogs ?
      <div className="log-area hidden">
        <div className="log-area-title hidden" onClick={onShowDcrwalletLogs}>
          <T id="help.logs.dcrwallet" m="dcrwallet" />
        </div>
      </div>:
      <div className="log-area expanded">
        <div className="log-area-title expanded" onClick={onHideDcrwalletLogs}>
          <T id="help.logs.dcrwallet" m="dcrwallet" />
        </div>
        <div className="log-area-logs">
          <textarea rows="30" value={dcrwalletLogs} disabled />
        </div>
      </div>
    }
  </Aux>
);

export default Logs;
