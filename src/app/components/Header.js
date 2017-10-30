import React from "react";
export default class Header extends React.Component {
  render() {
    return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
				<header className="mdl-layout__header">
					<div className="mdl-layout__header-row">
					  <span className="mdl-layout-title">Currency Converter</span>
					 
					</div>
				</header>
			</div>
      );
  }
}
