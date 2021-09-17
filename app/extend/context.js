'use strict';

module.exports = {
  /**
   * validate data with rules
   *
   * @param  {Object} rules  - validate rule object, see [parameter](https://github.com/node-modules/parameter)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(rules, data) {
    data = data || this.request.body;
    const errors = this.app.validator.validate(rules, data);
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }
  },
  // 抛出 errorResponse 类型的错误
  validateMessage(rules, data) {
    data = data || this.request.body;
    const errors = this.app.validator.validate(rules, data);
    if (errors) {
      this.logger.error(`validate error for request ${data}, errors ${errors}`);
      // 只返回第一个错误
      const firstError = errors[0];
      const code = firstError.code;
      const field = firstError.field;

      if (this.app.config.env !== 'prod') {
        // 非正式服
        if (code === 'missing_field') {
          // 提示哪个参数没传
          return field + ' 必填!!!';
        }
        return rules[field].errorMsg || firstError.message;
      }
      // 正式服，不允许提示详细信息
      if (code === 'missing_field') {
        return '参数错误';
      }
      return rules[field].error || '参数错误';
    }
    return '';
  },
};
