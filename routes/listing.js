const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware");
const listingController=require("../controllers/listings.js");
const {storage}=require("../cloudConfig.js");
const multer=require('multer');
const upload = multer({storage})

  router
  .route("/")
  .get( wrapAsync (listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
   wrapAsync (listingController.createListing)
   );

   router.get("/new", isLoggedIn,listingController.renderNewForm);

  
   router.route("/:id")
   .get( isLoggedIn,wrapAsync (listingController.showListing))
   .put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing, wrapAsync (listingController.updateListing))
  .delete(
  isLoggedIn,
  isOwner,wrapAsync ( listingController.destroyListing)
  );


  

//Index Route

  //New Route
  
  //Show Route
  router.get("/:id/edit",isLoggedIn,
  isOwner,
   wrapAsync (listingController.renderEditForm));
  
  //Create Route
  
  //Edit Route
 
  
  //Update Route
  
  
  
  //Delete Route

  module.exports =router;
  