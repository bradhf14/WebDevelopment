/**
 * Created by Bradley on 4/12/16.
 */

//data for now stored as mock data
var forms = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {

    var api = {
        createForm: createForm,                     //C
        createField: createField,                   //C
        findAllForms: findAllForms,                 //R
        findFormById: findFormById,                 //R
        findFieldsByFormId: findFieldsByFormId,      //R
        findFormByTitle: findFormByTitle,           //R
        findAllFormsByUserId: FindAllFormsByUserId, //R
        findFieldInFormById: findFieldInFormById,   //R
        updateForm: updateForm,                     //U
        updateField: updateField,                   //U
        deleteForm: deleteForm,                     //D
        deleteField: deleteField                    //D
        //any other necessary ones to implement here, look at CRUD requirements
    };

    return api;

    //accept instance, add it to corresponding collection, and return the collection
    function createForm(newForm){
        newForm._id = (new Date()).getTime();
        newForm.fields = [];
        forms.push(newForm);
        return forms;
    }

    //accept formId and new field object, creates a field in that form object if form object exists, returns fields or null
    function createField(formId, passedInField){
        var newField = {};
        var passedField = passedInField.type;
        console.log("this is the passed field");
        console.log(passedField)
        for(var f in forms) {
            if( forms[f]._id == formId) {
                newField._id = uuid.v1();

                if(passedField == "Single Line Text Field"){
                    newField.label = "New Text Field";
                    newField.type = "TEXT";
                    newField.placeholder = "New Field";
                }else if (passedField == "Multi Line Text Field"){
                    newField.label = "New Text Field";
                    newField.type = "TEXTAREA";
                    newField.placeholder = "New Field";
                }else if (passedField == "Date Field"){
                    newField.label = "New Date Field";
                    newField.type = "DATE";
                }else if (passedField == "Dropdown Field"){
                    newField.label = "New Dropdown";
                    newField.type = "OPTIONS";
                    newField.options = [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }else if (passedField == "Checkbox Field") {
                    newField.label = "New Checkboxes";
                    newField.type = "CHECKBOXES";
                    newField.options = [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]

                }else if (passedField == "Radio Button Field"){
                    newField.label = "New Radio Buttons";
                    newField.type = "RADIOS";
                    newField.options = [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
                forms[f].fields.push(newField);
                return forms[f].fields;
            }
        }
        return null;
    }


    //takes in no argument, and returns the collection
    function findAllForms() {

        return forms;
    }

    //takes in ID, finds instance, return the instance found, or null otherwise
    function findFormById(id){
        for(var f in forms) {
            if( forms[f]._id == id) {
                return forms[f];
            }
        }
        return null;
    }

    function findFieldsByFormId(id){

        fields = [];
        for(var f in forms) {
            if( forms[f]._id == id) {
                for (var fi in forms[f].fields)
                    fields.push(forms[f].fields[fi]);
            }
        }
        console.log("this is the fields object");
        console.log(fields);
        return fields;
    }

    function findFormByTitle(title) {

        for(var f in forms) {
            if( forms[f].title == title) {
                return forms[f];
            }
        }
        return null;

    }


    //TODO build out this function
    function FindAllFormsByUserId(userId){

        var formsUser = [];
        for(var f in forms) {
            if (forms[f].userId == userId) {
                formsUser.push(forms[f]);
            }
        }

        return formsUser;
    }

    //finds the object with id, updates the found instance, return all forms
    function updateForm(formId, updatedForm) {
        for(var f in forms) {
            if( forms[f]._id == formId) {
                forms[f].title = updatedForm.title;
                forms[f].userId = updatedForm.userId;
                forms[f].fields = updatedForm.fields;
                return forms;
            }
        }
        return null;
    }

    //finds the object with id, updates the found instance, return the instance, otherwise null?
    //TODO SOME OF the fields variables might not exists, be blank.  how to handle this???
    function updateField(formId, fieldId, field) {

        for(var f in forms) {
            if (forms[f]._id == formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id==fieldId){
                        forms[f].fields[i]._id = field._id;
                        forms[f].fields[i].label = field.label;
                        forms[f].fields[i].type = field.type;
                        forms[f].fields[i].placeholder = field.placeholder;
                        forms[f].fields[i].options = field.options;
                        return forms[f].fields[i];
                    }
                }

            }
        }
        return null;
    }

    //accepts form ID and field ID, returns field with that ID in given form, otherwise null
    function findFieldInFormById(formId, fieldId){

        for(var f in forms) {
            if (forms[f]._id == formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id==fieldId){
                        return forms[f].fields[i];
                    }
                }

            }
        }
        return null;
    }

    //should accept an ID as an argument, remove instance of object with that ID,
    //return updated list?
    function deleteForm(formId){
        for (var f in forms){
            if (forms[f]._id == formId){
                forms.splice(f, 1);
            }
        }
        return forms;
    }

    function deleteField(formId, fieldId){

        for(var f in forms) {
            if (forms[f]._id == formId) {
                for(var i in forms[f].fields){
                    if(forms[f].fields[i]._id==fieldId){
                        forms[f].fields.splice(i,1);
                    }
                }
            }
        }
        return forms;
    }


}
