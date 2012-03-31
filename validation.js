var runFormValidation;
runFormValidation = function() {
  /*
    RegEx
    */
  var addErrorStyle, addSuccessStyle, allinputs, choices, code, codes, email, emailRegEx, emails, emptyRegEx, input, inputs, number, numberRegEx, numbers, passwordRegEx, password_confirmations, passwords, postalCodeRegEx, selects, validateChoiceSelect, validateForm, validateInputs, validatePassword, validatePwdConf, validateSelect, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m;
  emailRegEx = new RegExp("^[-_.a-z0-9]+@[-_a-z0-9]+\.[a-z]{2,4}$");
  emptyRegEx = new RegExp("[-_.a-zA-Z0-9]{3,}");
  numberRegEx = new RegExp("^[0-9]{3,}$");
  postalCodeRegEx = new RegExp("^[A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}");
  passwordRegEx = new RegExp("^(.+){6,}$");
  /*
    Arrays of inputs, by types
    */
  inputs = [];
  emails = [];
  codes = [];
  selects = [];
  choices = [$("#premier-choix"), $("#deuxieme-choix"), $("#troisieme-choix"), $("#quatrieme-choix")];
  numbers = [];
  /*
    Fetching and sorting all form inputs
    */
  allinputs = $(".validate").filter(":input");
  for (_i = 0, _len = allinputs.length; _i < _len; _i++) {
    input = allinputs[_i];
    if ($(input).hasClass("text")) {
      inputs.push($(input));
    }
    if ($(input).hasClass("email")) {
      emails.push($(input));
    }
    if ($(input).hasClass("code")) {
      codes.push($(input));
    }
    if ($(input).hasClass("select")) {
      selects.push($(input));
    }
    if ($(input).hasClass("number")) {
      numbers.push($(input));
    }
    if ($(input).hasClass("password")) {
      passwords = $(input);
    }
    if ($(input).hasClass("password_confirmation")) {
      password_confirmations = $(input);
    }
  }
  /*
    Inputs keyup validation
    */
  for (_j = 0, _len2 = inputs.length; _j < _len2; _j++) {
    input = inputs[_j];
    input.unbind("keyup").bind("keyup", function() {
      return validateInputs($(this), emptyRegEx);
    });
  }
  /*
    Email keyup validation
    */
  for (_k = 0, _len3 = emails.length; _k < _len3; _k++) {
    email = emails[_k];
    email.unbind("keyup").bind("keyup", function() {
      return validateInputs($(this), emailRegEx);
    });
  }
  /*
    Postal Code keyup validation
    */
  for (_l = 0, _len4 = codes.length; _l < _len4; _l++) {
    code = codes[_l];
    code.unbind("keyup").bind("keyup", function() {
      return validateInputs($(this), postalCodeRegEx);
    });
  }
  /*
    Numbers keyup validation
    */
  for (_m = 0, _len5 = numbers.length; _m < _len5; _m++) {
    number = numbers[_m];
    number.unbind("keyup").bind("keyup", function() {
      return validateInputs($(this), numberRegEx);
    });
  }
  /*
    Password(s) keyup validation
    */
  password.unbind("keyup").bind("keyup", function() {
    return validatePassword($(this), passwordRegEx);
  });
  /*
    Password confirmation(s) keyup validation
    */
  password_confirmation.unbind("keyup").bind("keyup", function() {
    return validatePwdConf(password, $(this));
  });
  validateForm = function() {
    var badFields, valid;
    $.extend(badFields = [], validateInputs(inputs, emptyRegEx), validateInputs(emails, emailRegEx), validateInputs(codes, postalCodeRegEx), validateSelect(selects), validateInputs(numbers, numberRegEx), validateChoiceSelect(choices), validatePassword(password, passwordRegEx), validatePwdConf(password, password_confirmation));
    if (badFields.length === 0) {
      valid = true;
    } else {
      valid = false;
    }
    return valid;
  };
  validateInputs = function(inputs, regex) {
    var error, input, _len6, _n;
    error = [];
    for (_n = 0, _len6 = inputs.length; _n < _len6; _n++) {
      input = inputs[_n];
      if (regex.test($(input).val())) {
        addSuccessStyle(input);
      } else {
        error.push($(input).attr("id"));
        addErrorStyle(input);
      }
    }
    return error;
  };
  validateSelect = function(selects) {
    var error, select, _len6, _n;
    error = [];
    for (_n = 0, _len6 = selects.length; _n < _len6; _n++) {
      select = selects[_n];
      if ($(select).val() !== "0") {
        addSuccessStyle(select);
      } else {
        error.push($(select).attr("id"));
        addErrorStyle(select);
      }
    }
    return error;
  };
  validateChoiceSelect = function(choices) {
    var choice, current, error, verif, _len6, _len7, _n, _o;
    error = [];
    for (_n = 0, _len6 = choices.length; _n < _len6; _n++) {
      choice = choices[_n];
      current = choice;
      for (_o = 0, _len7 = choices.length; _o < _len7; _o++) {
        verif = choices[_o];
        if ($(current).attr("id") === $(verif).attr("id") || $(current).val() !== $(verif).val()) {
          addSuccessStyle($(choice));
        } else {
          addErrorStyle($(choice));
          error.push($(current).attr("id"));
          $("#error-choice").html(errorMessages['choices']);
        }
      }
    }
    if (error.length === 0) {
      $("#error-choice").html("");
    }
    return error;
  };
  validatePassword = function(password, passwordRegEx) {
    var error;
    error = [];
    if (regex.test($(password).val())) {
      addSuccessStyle(password);
    } else {
      error.push($(password).attr("id"));
      addErrorStyle(password);
    }
    return error;
  };
  validatePwdConf = function(password, password_confirmation) {
    var error;
    error = [];
    if (password.val() === password_confirmation.val()) {
      addSuccessStyle(password_confirmation);
    } else {
      error.push($(password_confirmation).attr("id"));
      addErrorStyle(password_confirmation);
      $(password_confirmation).next().text("Passwords don't match");
    }
    return error;
  };
  /*
    Error Styling: sets class of parent .control-group to .success or .error for Twitter Bootstrap stylings
    */
  addErrorStyle = function(element) {
    $(element).parent().addClass('error');
    return $(element).parent().removeClass('success');
  };
  addSuccessStyle = function(element) {
    $(element).parent().addClass('success');
    return $(element).parent().removeClass('error');
  };
  return $('.validate-form').submit(function() {
    return validateForm();
  });
};
$(document).ready(function() {
  return $(document).on("mousedown", function() {
    return runFormValidation();
  });
});