const { User } = require("../../db/models");
const router = require("express").Router();

const STEPS = [
  [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "bio",
      label: "Bio",
      type: "multiline-text",
    },
  ],
  [
    {
      name: "country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "receiveNotifications",
      label:
        "I would like to receive email notiications for new messages when I'm logged out",
      type: "yes-no",
      required: true,
    },
    {
      name: "receiveUpdates",
      label: "I would like to receive updates about the product via email",
      type: "yes-no",
      required: true,
    },
  ],
];

// const methodNotAllowed = (req, res, next) => {
//   return res.header("Allow", "GET").sendStatus(405);
// };

const getOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).json({ steps: STEPS });
  } catch (error) {
    next(error);
  }
};
const setOnboarding = async (req, res, next) => {

  const bodyValidation = ['name', 'value'];

  try {

    const firstName = req.body.steps[0][0];
    const lastName = req.body.steps[0][1];
    const country = req.body.steps[0][2];
    const bio = req.body.steps[0][3];
    const receiveNotifications = req.body.steps[1][0];
    const receiveUpdates = req.body.steps[1][1];

    //Checking if the user exists or not
    if (!req.user) {
      return res.sendStatus(401);
    }

    //Checking if there is any data received
    if (!req.body.steps) {
      return res.status(400).json({ error: "Onboarding Failed, Data Not-Found." });
    }

    //Checking if the body has only name and value fields
    for (let i = 0; i < req.body.steps.length; i++) {
      for (let j = 0; j < req.body.steps[i].length; j++) {
        if (JSON.stringify(Object.keys(req.body.steps[i][j])) === JSON.stringify(bodyValidation)) {
          continue
        }
        else {
          return res
            .status(400)
            .json({ error: "Only name and value fields should be there in the Request.Body" });
        }
      }
    }

    //Checking if first name and country values are provided
    if (!firstName.value || !country.value) {
      return res
        .status(400)
        .json({ error: "First Name and Country are required" });
    }
    // checking the datatypes of the values
    if (typeof (firstName.value) != "string" || typeof (lastName.value) != "string" || typeof (country.value) != "string" || typeof (bio.value) != "string" || typeof (receiveNotifications.value) != "boolean" || typeof (receiveUpdates.value) != "boolean") {
      return res
        .status(400)
        .json({ error: "All the data types of the Onboarding values should be of their respective type" });
    }

    //Finding a User
    const onboardingUser = await User.findOne({ where: { username: req.user.dataValues.username } });
    //Converting the user data to JSON
    const user = onboardingUser.toJSON()

    // Ensuring that the user can complete onboarding only once
    if (!user.completedOnboarding) {
      await User.update({
        firstName: firstName.value,
        lastName: lastName.value,
        country: country.value,
        bio: bio.value,
        receiveNotifications: receiveNotifications.value,
        receiveUpdates: receiveUpdates.value,
        completedOnboarding: true,
      }, {
        where: {
          username: req.user.dataValues.username
        }
      });
    }
    else {
      return res
        .status(400)
        .json({ error: "User completed Onboarding" });
    }

    //Finding the user with updated data
    const onboardingUser1 = await User.findOne({ where: { username: req.user.dataValues.username } });
    const userDetails = onboardingUser1.toJSON()


    //Checking if the data is present for the user and sending the response to the client
    if (userDetails) {
      return res.status(200).json
        ({
          "bio": userDetails.bio,
          "completedOnboarding": userDetails.completedOnboarding,
          "country": userDetails.country,
          "createdAt": userDetails.createdAt,
          "email": userDetails.email,
          "firstName": userDetails.firstName,
          "id": userDetails.id,
          "lastName": userDetails.lastName,
          "photoUrl": userDetails.photoUrl,
          "receiveNotifications": userDetails.receiveNotifications,
          "receiveUpdates": userDetails.receiveUpdates,
          "updatedAt": userDetails.updatedAt,
          "username": userDetails.username
        });
    }
  }
  catch (error) {
    next(error);
  }
};



router.route("/").get(getOnboarding);
router.route("/").post(setOnboarding);


module.exports = router;
