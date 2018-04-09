import PropTypes from 'prop-types';
import Slugify from 'slugify';
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
	<nav className={ `au-breadcrumbs${ inverted ? ' au-breadcrumbs--inverted' : '' }` } aria-label={ label }>
		<LinkList inverted={ inverted } inline items={ items } />
	</nav>
);

const Categoryheader = ( page ) => {

	const theme = page._pages[ page._ID ].theme ? page._pages[ page._ID ].theme : 'dark';
	const breadcrumbs = [];

	page._parents
		.filter( parent => parent !== 'index' )
		.map( ( parent ) => breadcrumbs.push({
			link: ( page._pages[ parent ]._url === page._pages[ page._ID ]._url ? undefined : page._pages[ parent ]._url ),
			text: page._pages[ parent ].pagetitle,
	}));

	return (
		<div id="content" className={`category__header category__header--${ theme } header category__header--ID-${ Slugify( page._ID ).toLowerCase() }`}>
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<div className="header__subheader">
							<a href="/" title="Guides home">
								<img className="header__logo" src={`/assets/img/coa${ theme === 'blue' || theme === 'dark' ? '-white' : '' }.png`}
									alt="The Australian Government coat of Arms"/>
							</a>
							<div className="header__text">
								<a href="/" className="header__text__headline">
									{
										page._pages[ page._ID ]['header-title']
											? page._pages[ page._ID ]['header-title']
											: 'Digital Guides'
									}
								</a>

									{
										breadcrumbs.length > 1
											? <Breadcrumbs label="Breadcrumb for this page" items={ breadcrumbs } inverted={ theme === 'blue' || theme === 'dark' } />
											: null
									}
							</div>

							<a href="https://www.surveymonkey.com/r/XFWJ5TC" className="feedback__btn au-btn">
								Give feedback
							</a>

							{ /*
								<div className="header__menu">
									<span className="menu">Menu</span>
								</div>
							*/ }
						</div>

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

Categoryheader.propTypes = {
	/**
	 * title: User research
	 */
	title: PropTypes.string,

	/**
	 * description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
	 */
	description: PropTypes.string,
};


Categoryheader.defaultProps = {};


export default Categoryheader;
