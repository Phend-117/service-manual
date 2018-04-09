import PropTypes from 'prop-types';
import React from 'react';


/**
 * The Category header component
 */
 const LinkListItem = ({ item }) => {
	const attributeOptions = {};

	if( typeof item.onClick === 'function' ) {
		attributeOptions.onClick = item.onClick;

		// if we find an onClick event but no link we make it a link so onClick can be added (no button support yet)
		if( !item.link ) {
			item.link = '#';
		}
	}

	return (
		<li>
			{ item.link === undefined
				? ( item.text )
				: ( <a href={ item.link } { ...attributeOptions }>{ item.text }</a> )
			}
		</li>
	);
 };

const LinkList = ({ inverted, inline, items }) => (
	<ul className={ `au-link-list${ inverted ? ' au-link-list--inverted' : '' }${ inline ? ' au-link-list--inline' : '' }` }>
		{ items.map( ( item, i ) => <LinkListItem key={ i } item={ item } /> ) }
	</ul>
);

const Breadcrumbs = ({ inverted, label, items }) =>	(
	<nav id="nav" className={ `au-breadcrumbs${ inverted ? ' au-breadcrumbs--inverted' : '' }` } aria-label={ label }>
		<LinkList inverted={ inverted } inline items={ items } />
	</nav>
);

const Homeheader = ( page ) => {

	const theme = page._pages[ page._ID ].theme ? page._pages[ page._ID ].theme : 'dark';
	const breadcrumbs = [];

	page._parents
		.filter( parent => parent !== 'index' )
		.map( ( parent ) => breadcrumbs.push({
			link: ( page._pages[ parent ]._url === page._pages[ page._ID ]._url ? undefined : page._pages[ parent ]._url ),
			text: page._pages[ parent ].pagetitle,
	}));

	return (
		<div className={`home__header header`} id="content">
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div className="header__subheader">
							<a href="/" title="Guides home">
								<img className="header__logo" src={`/assets/img/coa${ theme === 'blue' || theme === 'dark' ? '-white' : '' }.png`}
									alt="The Australian Government coat of Arms"/>
							</a>

							<a href="https://www.surveymonkey.com/r/XFWJ5TC" className="feedback__btn au-btn">
								Give feedback
							</a>

							{ /*	removed until nav is ready
							<div className="header__menu">
								<span className="menu">Menu</span>
							</div>
							*/ }
						</div>

						{ /*	removed until nav is ready
						<div className="home__header__logo">
							<svg className="home__header__logo__svg" role="img" title="Govau logo">
								<use xlinkHref="/assets/svg/map.svg#govau_logo" />
							</svg>
						</div>
						*/}

						<div className="textwrapper">
							<h1 className="header__title">
								{ page.title }
							</h1>

							<div className="header__description">
								{ page.description }
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

Homeheader.propTypes = {
	/**
	 * title: User research
	 */
	title: PropTypes.string.isRequired,

	/**
	 * description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
	 */
	description: PropTypes.string.isRequired,
};

Homeheader.defaultProps = {};


export default Homeheader;
