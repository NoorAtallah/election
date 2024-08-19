const express = require("express");
const AdvertisementController = require("../controllers/AdvertisementController");

const router = express.Router();

// Route to get all advertisements
router.get(
  "/advertisements-active",
  AdvertisementController.getAllAdvertisementsActive
);
router.get("/advertisements", AdvertisementController.getAllAdvertisements);

// Route to get a specific advertisement by ID
router.get(
  "/advertisements/:ad_id",
  AdvertisementController.getAdvertisementById
);

// Route to create a new advertisement
router.post("/advertisements", AdvertisementController.createAdvertisement);

// Route to update an existing advertisement by ID
router.put(
  "/advertisements/:ad_id",
  AdvertisementController.updateAdvertisement
);

router.delete(
  "/advertisements/:ad_id",
  AdvertisementController.deleteAdvertisement
);

router.put(
  "/advertisements/:ad_id/status",
  AdvertisementController.updateAdvertisementStatus
);

module.exports = router;
