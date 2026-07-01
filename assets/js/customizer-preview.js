/**
 * Customizer live preview bindings.
 *
 * @package NodeBrains
 */

( function ( $ ) {
	'use strict';

	wp.customize( 'nodebrains_copyright_text', function ( setting ) {
		setting.bind( function ( value ) {
			$( '.copyright-text' ).text( value );
		} );
	} );
}( jQuery ) );
