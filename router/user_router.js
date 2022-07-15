const express = require("express");
const router = express.Router();
const Joi = require("joi");

//data
const users = [
  { id: 1, ad: "furkan", yas: 22 },
  { id: 2, ad: "aleyna", yas: 21 },
  { id: 3, ad: "fatih", yas: 27 },
];

//Joi ile gelen inputların kontrolünü sağlayan fonksiyon
function validateUserParameter(user) {
  const schema = Joi.object({
    ad: Joi.string().min(3).max(30).required(),
    yas: Joi.number().integer().min(10).max(99).required(),
  });

  return schema.validate(user);
}

///users?ters=true şeklinde query parameter geçerek parametrelere göre daha detaylı istekler yapabiliriz
router.get("/", (req, res) => {
  if (req.query.ters) {
    res.send(users.reverse());
  } else {
    res.send(users);
  }
});

//id parametresi ile user getirme
router.get("/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));
  if (findUser) {
    res.send(findUser);
  } else {
    res.status(404).send(`user ${req.params.id} not found`);
  }
});

//kullanıcı ekleme
router.post("/", (req, res) => {
  const { error } = validateUserParameter(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const newUser = {
      id: users.length + 1,
      ad: req.body.ad,
      yas: req.body.yas,
    };
    users.push(newUser);
    res.send(newUser);
  }
});

//kullanıcı güncelleme
router.put("/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));
  if (!findUser) {
    res.status(404).send(`${req.params.id}. user not found`);
  }

  const { error } = validateUserParameter(req.body); //destructing ile reg body içinde bulunan error kısmına direk olarak eriştik

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    (findUser.ad = req.body.ad), (findUser.yas = req.body.yas);
    res.send(findUser);
  }
});

//id parametresi ile kullanıcı silme
router.delete("/:id", (req, res) => {
  const findUser = users.find((user) => user.id === parseInt(req.params.id));
  if (findUser) {
    const index = users.indexOf(findUser);
    users.splice(index, 1);
    res.send(findUser);
  } else {
    res.status(404).send(`user ${req.params.id} not found`);
  }
});

module.exports = router;
