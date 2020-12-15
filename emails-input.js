(function () {
  /**
   * @typedef {Object} Data
   * @property {string} type - element type
   * @property {Object} properties - element properties
   * @property {string} class - element class name
   */
  /**
   * Creates Element
   * @param {Data} data - element data
   */

  var createElement = function (data) {
    var element = document.createElement(data.type);
    var properties = data.properties;
    var className = data.class;

    if (properties) {
      for (var propName in data.properties) {
        element[propName] = properties[propName];
      }
    }

    if (className) {
      element.classList.add(className);
    }

    return element;
  };

  window.EmailsInput = function (inputContainerNode) {
    if (!(this instanceof EmailsInput )) {
      return new EmailsInput(inputContainerNode);
    }

    this._emailsList = [];
    this._inputContainer = this._createInputContainer(inputContainerNode);
    // div that is used measure a width of a text inside the input
    this._textMeasureBlock = this._createTextMeasureBlock(this._inputContainer);
    this._input = this._createInput(this._inputContainer);
  };

  EmailsInput.prototype.addEmail = function (value) {
    if (!value) return;

    var isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);

    var email = createElement({
      type: 'div',
      class: 'emailsinputlib-email',
      properties: {
        innerHTML: value
      }
    });

    if (isValid) {
      email.classList.add('emailsinputlib-valid-email');
    } else {
      email.classList.add('emailsinputlib-invalid-email');
    }

    this._emailsList.push(value);
    var that = this;

    var removeIcon = this._createRemoveIcon(function (e) {
      that._removeEmail(email);
    });

    email.appendChild(removeIcon);
    this._inputContainer.insertBefore(email, this._input);
    var containerParentNode = this._inputContainer.parentNode;
    containerParentNode.scrollTop = containerParentNode.scrollHeight;
  };

  EmailsInput.prototype.getEmails = function () {
    return this._emailsList.join(',');
  }

  EmailsInput.prototype._createInputContainer = function (parentNode) {
    var inputContainer = createElement({
      type: 'div',
      class: 'emailsinputlib-input-container'
    });
    parentNode.appendChild(inputContainer);

    var inputInnerContainer = createElement({
      type: 'div',
      class: 'emailsinputlib-input-inner-container'
    });

    inputContainer.appendChild(inputInnerContainer);

    var that = this;
    inputContainer.addEventListener('click', function () {
      that._input.focus();
    });

    return inputInnerContainer;
  }

  EmailsInput.prototype._createTextMeasureBlock = function (parentNode) {
    var textMeasureBlock = createElement({
      type: 'span',
      class: 'emailsinputlib-hidden'
    });
    parentNode.appendChild(textMeasureBlock);

    return textMeasureBlock;
  };

  EmailsInput.prototype._createInput = function (parentNode) {
    var input = createElement({
      type: 'input',
      class: 'emailsinputlib-input',
      properties: {
        type: 'email',
        placeholder: 'add more people…'
      }
    });

    var that = this;

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ',') {
        if (e.key === ',') {
          e.preventDefault();
        }
        that.addEmail(input.value);
        that._resetInput();
      }
    });

    input.addEventListener('focusout', function() {
      that.addEmail(input.value);
      that._resetInput();
    });

    input.addEventListener('paste', this._handlePasteEvent.bind(this));

    input.addEventListener('keyup', this._measureText.bind(this));

    parentNode.appendChild(input);

    return input;
  };

  EmailsInput.prototype._resetInput = function () {
    this._input.value = '';
    this._input.classList.remove('emailsinputlib-input-full-width');
  }

  EmailsInput.prototype._handlePasteEvent = function (e) {
    var pastedData = e.clipboardData
      ? e.clipboardData.getData('text/plain')
      : window.clipboardData.getData('Text'); // IE

    var emails = pastedData.split(',');
    var that = this;
    emails.forEach(function (value) {
      that.addEmail(value);
    });
    e.preventDefault();
  }

  EmailsInput.prototype._createRemoveIcon = function (onClick) {
    var removeIconContainer = createElement({
      type: 'div',
      class: 'emailsinputlib-remove-icon'
    });

    var removeIcon = createElement({
      type: 'img',
      properties: {
        src: './remove.svg'
      }
    });

    removeIconContainer.appendChild(removeIcon);
    removeIconContainer.addEventListener('click', onClick);

    return removeIconContainer;
  };

  EmailsInput.prototype._removeEmail = function (emailNode) {
    var emails = Array.prototype.slice.call(document.querySelectorAll('.emailsinputlib-email'))
    var emailIndex = emails.indexOf(emailNode);
    this._emailsList.splice(emailIndex, 1);
    this._inputContainer.removeChild(emailNode);
  };


  EmailsInput.prototype._measureText = function (e) {
    this._textMeasureBlock.innerHTML = e.target.value;

    // move the input to the next line if input text overlaps input
    if (this._input.clientWidth < this._textMeasureBlock.offsetWidth) {
      this._input.classList.add('emailsinputlib-input-full-width');
      var scrolledNode = this._inputContainer.parentNode;
      scrolledNode.scrollTop = scrolledNode.scrollHeight;
    }
  };
})()
