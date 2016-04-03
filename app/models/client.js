/**
 * Created by usman on 3/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClientSchema = new Schema({
    cli_fname: { type: String, required: true },
    cli_mname: { type: String, required: true },
    cli_lname: { type: String, required: true },
    cli_prefname: { type: String, required: true },
    cli_dob: {type: String, required: true},
    cli_sex: { type: String, required: true },
    cli_ssn: { type: String, required: true },
    cli_address_street: { type: String, required: true },
    cli_address_street2: { type: String, required: true },
    cli_address_city: { type: String, required: true },
    cli_address_state: { type: String, required: true },
    cli_address_zip: { type: String, required: true },
    cli_phone1: { type: String, required: true },
    cli_phone2: { type: String },
    // cli_ccu: {type: Schema.Types.ObjectId, null:true},
    family: [{type: Schema.Types.ObjectId, ref: 'family'}],
    cli_ccu: {type: String},
    cli_startdate: { type: String, required: true},
    cli_ccu_caseworker: { type: String, required: true },
    cli_photo: { type: String, required: true },
    cli_paymethod: { type: String, required: true },
    cli_status: { type: String, required: true },
    cli_livingarrangement: { type: String, required: true },
    cli_notes: { type: String},
    cli_mconame: { type: String },
    cli_mcoprocedurecodes: { type: String },
    cli_medicaidnumber: { type: String },
    cli_mco_casemanager: { type: String },
    cli_mco_diagnosis: { type: String },
    // cli_mco_memberid: {type: Schema.Types.ObjectId, null:true},
    cli_mco_memberid: { type: String },
    cli_mco_medicarenumber: { type: String },
    cli_mco_authnumber: { type: String },
    cli_mco_casemanagerphone: { type: String },
    cli_mco_comments: { type: String },
    // Care Plan
    cli_cp_eating: { type: String },
    cli_cp_bathing: { type: String },
    cli_cp_address1: { type: String },
    cli_cp_preparingmeal: { type: String },
    cli_cp_laundry: { type: String },
    cli_cp_workphone: { type: String },
    // Care Plan
    // Schedule
    cli_sch_mondaystart: { type: String },
    cli_sch_mondayend: { type: String },
    cli_sch_tuesdaystart: { type: String },
    cli_sch_tuesdayend: { type: String },
    cli_sch_wednesdaystart: { type: String },
    cli_sch_wednesdayend: { type: String },
    cli_sch_thursdaystart: { type: String },
    cli_sch_thursdayend: { type: String },
    cli_sch_fridaystart: { type: String },
    cli_sch_fridayend: { type: String },
    cli_sch_saturdaystart: { type: String },
    cli_sch_saturdayend: { type: String },
    cli_sch_sundaystart: { type: String },
    cli_sch_sundayend: { type: String },
    cli_sch_mrassessment: { type: String },
    cli_sch_comments: { type: String },
    cli_sch_ccpunitsperday: { type: String },
    cli_sch_ccpdaysperweek: { type: String },
    cli_sch_ccpunitsperweek: { type: String },
    cli_sch_unitspermonth: { type: String },
    cli_sch_totalincome: { type: String },
    cli_sch_familysize: { type: String },
    cli_sch_donscore: { type: String },
    cli_sch_feeschedule: { type: String },
    cli_sch_maximumcopay: { type: String },
    cli_sch_otherservicecost: { type: String },
    // Schedule
    // 911
    cli_911_fname : { type: String },
    cli_911_lname : { type: String },
    cli_911_address1 : { type: String },
    cli_911_company : { type: String },
    cli_911_department : { type: String },
    cli_911_workphone : { type: String },
    // 911
    cli_co_id: {type: Schema.Types.ObjectId, null:true},

});

/*
    fname: "John",
    mname: "Matthew",
    lname: "Doe",
    prefname: "Jack",
    dob_mo: "12",
    dob_da: "18",
    dob_yr: "1951",
    sex: "male",
    ssn: "329-76-3271",
    address_street: "12951 S. McVickers Ave.",
    address_street2: "",
    address_city: "Palos Heights",
    address_state: "13",
    address_zip: "60463-2921",
    phone1: "7083710681",
    phone2: "7083269299",
    ccu: "1",
    startdate: "08/17/2014",
    ccu_caseworker: "Sarah SMith",
    photo: "0",
    paymethod: "",
    status: "",
    livingarrangement: "",
    notes: "blah blah blah",
    mconame: "",
    mcoprocedurecodes: "",
    medicaidnumber: "",
    mco_casemanager: "",
    mco_diagnosis: "",
    mco_memberid: "",
    mco_medicarenumber: "",
    mco_authnumber: "",
    mco_casemanager: "",
    mco_casemanagerphone: "",
    mco_comments: "",
    co_id: "1"
 */
mongoose.model('Client', ClientSchema);
