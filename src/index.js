const CHEQD_BASE_ID = 'https://resolver.cheqd.net/1.0/identifiers/did:cheqd';
const MAINNET = 'mainnet'
const TESTNET = 'testnet'

// https://resolver.cheqd.net/1.0/identifiers/did:cheqd:mainnet:zF7rhDBfUt9d1gJPjx7s1JXfUY7oVWkY

async function gatherResponse( response ){
    const { headers } = response;
    const contentType = headers.get( 'content-type' ) || '';
    if ( contentType.includes( 'application/json' ) ) {
        return JSON.stringify( await response.json() );
    } else if ( contentType.includes( 'application/text' ) ) {
        return response.text();
    } else if ( contentType.includes( 'text/html' ) ) {
        return response.text();
    } else {
        return response.text();
    }
}

const isOnMainnet = ( network ) => MAINNET === network

const decideOnRequests = ( event ) => {
    const url = event.request.url;
    const searchQueries = url.toString().split( "?" )[1]
    const searchParams = new URLSearchParams( searchQueries )
    const methodSpecificId = searchParams.get( 'method_specific_id' )
    const network = searchParams.get( 'network' )
    const inputValidationErrors = handleInputErrors( methodSpecificId, network )
    if ( inputValidationErrors ) {
        return event.respondWith(new Response( inputValidationErrors ))
    }
    if ( isOnMainnet( network ) ) {
        return event.respondWith( handleRequest( methodSpecificId, MAINNET ) );
    } else {
        return event.respondWith( handleRequest( methodSpecificId, TESTNET ) );
    }
}

const handleInputErrors =
    ( methodSpecificId, network ) => {

        if ( methodSpecificId === null || network === null ) {
            return JSON.stringify( { "errorMessage": "query params 'network' and 'method_specific_id' are required." } )
        }
        if ( methodSpecificId.trim() === '' ) {
            return JSON.stringify( { errorMessage: "query param 'method_specific_id' cannot be empty. Please, put correct id" } );
        }
        if ( network.trim() === '' ) {
            return JSON.stringify( { errorMessage: "query param 'network' cannot be empty. Please, choose your network.'mainnet' or 'testnet' " } );
        }
    }

async function handleRequest( methodSpecificId, network ){

    const init = {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    };
    const response = await fetch( `${CHEQD_BASE_ID}:${network}:${methodSpecificId}`, init );

    const results = await gatherResponse( response );
    return new Response( results, init );
}

addEventListener( 'fetch', event => {
    decideOnRequests( event )
} );
