runFormValidation = () ->
  ###
  RegEx
  ###
  emailRegEx = new RegExp("^[-_.a-z0-9]+@[-_a-z0-9]+\.[a-z]{2,4}$")
  emptyRegEx = new RegExp("[-_.a-zA-Z0-9]{3,}")
  numberRegEx = new RegExp("^[0-9]{3,}$")
  postalCodeRegEx = new RegExp("^[A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}") 
  passwordRegEx = new RegExp("^(.+){6,}$")

  ###
  Arrays of inputs, by types
  ###
  inputs = []
  emails = []
  codes = []
  selects = []
  choices = [$("#premier-choix"), $("#deuxieme-choix"), $("#troisieme-choix"), $("#quatrieme-choix")]
  numbers = []

  ###
  Fetching and sorting all form inputs
  ###
  allinputs = $(".validate").filter(":input")
  for input in allinputs
    if $(input).hasClass("text")
      inputs.push($(input))
    if $(input).hasClass("email")
      emails.push($(input))
    if $(input).hasClass("code")
      codes.push($(input))
    if $(input).hasClass("select")
      selects.push($(input))
    if $(input).hasClass("number")
      numbers.push($(input))
    if $(input).hasClass("password")
      passwords=$(input)
    if $(input).hasClass("password_confirmation")
      password_confirmations=$(input)
  
  ###
  Inputs keyup validation
  ###
  for input in inputs
    input.unbind("keyup").bind "keyup", -> #Have unbind as quick hack to keep from multiple bindings
      validateInputs($(this), emptyRegEx)
  ###
  Email keyup validation
  ###
  for email in emails
    email.unbind("keyup").bind "keyup", ->
      validateInputs($(this), emailRegEx)
  ###
  Postal Code keyup validation
  ###
  for code in codes
    code.unbind("keyup").bind "keyup", ->
      validateInputs($(this), postalCodeRegEx)
  ###
  Numbers keyup validation
  ###
  for number in numbers
    number.unbind("keyup").bind "keyup", ->
      validateInputs($(this), numberRegEx)
  ###
  Password(s) keyup validation
  ###
  password.unbind("keyup").bind "keyup", ->
    validatePassword($(this), passwordRegEx)
  ###
  Password confirmation(s) keyup validation
  ###
  password_confirmation.unbind("keyup").bind "keyup", ->
    validatePwdConf(password,$(this))
  

  validateForm = () ->
    $.extend(badFields = [], validateInputs(inputs, emptyRegEx), validateInputs(emails, emailRegEx), validateInputs(codes, postalCodeRegEx), validateSelect(selects), validateInputs(numbers, numberRegEx), validateChoiceSelect(choices), validatePassword(password, passwordRegEx), validatePwdConf(password,password_confirmation))
    if badFields.length is 0
      valid = true
    else
      valid = false
    return valid
  
  validateInputs = (inputs, regex) ->
    error = []
    for input in inputs
      if regex.test($(input).val())
        addSuccessStyle(input)
      else
        error.push($(input).attr("id"))
        addErrorStyle(input)
    return error

  validateSelect = (selects) ->
    error = []
    for select in selects
      if $(select).val() isnt "0"
        addSuccessStyle(select)
      else
        error.push($(select).attr("id"))
        addErrorStyle(select)
    return error
  
  validateChoiceSelect = (choices) ->
    error = []
    for choice in choices
      current = choice
      for verif in choices
        if($(current).attr("id") is $(verif).attr("id") or $(current).val() isnt $(verif).val())
          addSuccessStyle($(choice))
        else
          addErrorStyle($(choice))
          error.push($(current).attr("id"))
          $("#error-choice").html(errorMessages['choices'])
    if error.length is 0
      $("#error-choice").html("")
    return error

  validatePassword = (password, passwordRegEx) ->
    error=[]
    if regex.test($(password).val())
      addSuccessStyle(password)
    else
      error.push($(password).attr("id"))
      addErrorStyle(password)
    return error

  validatePwdConf = (password, password_confirmation) ->
    error=[]
    if password.val() == password_confirmation.val()
      addSuccessStyle(password_confirmation)
    else
      error.push($(password_confirmation).attr("id"))
      addErrorStyle(password_confirmation)
      $(password_confirmation).next().text("Passwords don't match") #Update Bootstrap's inline-help text
    return error
  
  ###
  Error Styling: sets class of parent .control-group to .success or .error for Twitter Bootstrap stylings
  ###
  addErrorStyle = (element) ->
    $(element).parent().addClass('error')
    $(element).parent().removeClass('success')

  addSuccessStyle = (element) ->
    $(element).parent().addClass('success')
    $(element).parent().removeClass('error')

  $('.validate-form').submit ->
    return validateForm()

$(document).ready ->
  $(document).on "mousedown", -> #find and capture new forms if any exist after each mousedown
    runFormValidation()
    
