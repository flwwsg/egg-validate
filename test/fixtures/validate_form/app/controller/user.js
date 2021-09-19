'use strict';

const createRule = {
  username: {
    type: 'email',
  },
  password: {
    type: 'password',
    compare: 're-password'
  },
  addition: {
    required: false,
    type: 'json'
  },
  biggerZero: {
    type: 'biggerZero',
    required: false,
  }
};

exports.create = function* () {
  this.validate(createRule);
  this.body = this.request.body;
};
