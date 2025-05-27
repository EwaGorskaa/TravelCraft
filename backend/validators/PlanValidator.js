const { body } = require("express-validator");

const PlanValidator = [

    body("title").trim().notEmpty().withMessage("Podaj tytuł podróży").isLength({ max: 100 }).withMessage("Tytuł może mieć maksymalnie 100 znaków."),

    body("description").trim().notEmpty().withMessage("Podaj opis podróży").isLength({ max: 500 }).withMessage("Opis może mieć maksymalnie 500 znaków."),

    body("mainDestination").notEmpty().withMessage("Podaj główny cel podróży").isLength({ max: 100 }).withMessage("Główny cel podróży może mieć maksymalnie 100 znaków."),
    
    body("startDate").notEmpty().withMessage("Podaj datę rozpoczęcia podróży").isISO8601().withMessage("Podaj poprawną datę początku podróży"),

    body("endDate").notEmpty().withMessage('Data zakończenia jest wymagana.').isISO8601().withMessage('Podaj poprawną datę końca podróży')
    .custom((value, { req}) =>{
        if(new Date(value) < new Date(req.body.startDate)){
            throw new Error("Data zakończenia musi być późniejsza niż data rozpoczęcia.")
        }
        return true;
    }),


]

module.exports = { PlanValidator };
