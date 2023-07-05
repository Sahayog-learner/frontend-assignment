import React from "react";

import './collections-overview.css'

import  {connect} from 'react-redux';

import { createStructuredSelector } from "reselect";

import CollectionPreview from "../menu-item/collection-preview/collection-preview";

import {selectCollectionForPreview} from '../../redux/shop/shop.selectors.js';

const CollectionsOverview = ({collections}) => ( 
    
        <div className="collections-overview">
            {
                collections.map(({id, ...otherCollectionProps }) => (
                <CollectionPreview key = {id} {...otherCollectionProps} /> 
            ))
            } 

    </div>
);

const mapStateToProps = createStructuredSelector({
    collections : selectCollectionForPreview
   })

export default connect(mapStateToProps)(CollectionsOverview)