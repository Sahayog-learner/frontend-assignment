import React from "react";
import { Route,Routes } from "react-router-dom";
import CollectionPage from "../collection/collection.component";

import CollectionsOverview from'../../../components/collections-overview/collections-overview';

const ShopPage = ({match}) =>{
        return(
        <div className="shop-page">
                {/* <Routes>
                <Route exact path = {`${match.path}`} Component={CollectionsOverview}/>
                <Route  path ={`${match.path}/:collectionId`} Component={CollectionPage}/>
                </Routes> */}
                <Routes>                        
                        <Route path ='/' element={<CollectionsOverview/>} />
                        <Route path ='/shop/:collectionId' element={<CollectionPage/>} />
                </Routes>

        </div>
    )};
   

   
export default  ShopPage;