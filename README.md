# Modifications
- Added basic password validation (through RegEx)
- Check that password_confirmation matches password
- Change to keyup event for "as-you-type validation"
- Modify for Twitter Bootstrap error-stylings
- Reassess fields on each mousedown event to find new forms (for example, dynamically loaded ajax pages)

# Original README
This is a very easy to use client side validation written in CoffeeScript / jQuery.

125 lines of coffee (including comments, spacing and everything, for a better look)
158 lines of javascript, uncompressed, 5,6kb
1 line of javsscript, compressed, 3,9kb

Please, if you have any suggestion, comment, advice, don't hesitate to post or add your lines into this code. Please update the Coffee file, not the JS one.

Actually, it does validates:
  - Text inputs, checks for empty fields
  - Email
  - Postal Code (Canada)
  - Number inputs
  - Selects (checks if the first one is selected)


It is really simple, check the example form provided to see what exactly is under the hood.
All you got to do is add a class name "validate" for the fields you want to validate, and another class name that specifies the type of validation.
Be sure that your form as the "validate-form" class.

types are;
- text
- email
- code (postal code)
- number
- select

Be sure to add you error messages in the head section of your page, just like in the example, specifying them by ids within an associative array.

-----------------------
Programming Path
-----------------------
- CAN/US Validation
- Password Validation
- Radio Buttons
- Checkboxes
