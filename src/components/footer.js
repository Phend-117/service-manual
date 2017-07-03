import React from "react";

export default ( page ) => {

	const theme = page._pages[ page._ID ].theme ? page._pages[ page._ID ].theme : 'dark';

	return (
		<footer className={`uikit-grid uikit-body uikit-footer footer footer--${ theme }`} role="contentinfo">
			<div className="container">
				<div className="row">
					<div className="col-md-2">
						<img className="footer__logo" src={`/assets/img/coa${ theme === 'blue' || theme === 'dark' ? '-white' : '' }.png`} />
					</div>
					<div className="col-md-10">
						<div className="footer__links__wrapper">
							<ul className="footer__links uikit-link-list uikit-link-list--inline uikit-link-list--inverted">
								{
									page.links && page.links.map( ( link, i ) =>
										<li key={ i } className="footer__listitem" >
											<a href={ page._pages[ link ].url } className="footer__link">{ page._pages[ link ].title }</a>
										</li>
									)
								}
							</ul>
						</div>
						<div className="footer__text footer__text--small">
							{ page._body }
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
