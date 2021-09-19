'use strict';

const Parameter = require('parameter');

module.exports = app => {
  /**
   * Validate
   *
   * ```js
   * app.validator.addRule('jsonString', (rule, value) => {
   *   try {
   *     JSON.parse(value);
   *   } catch (err) {
   *     return 'must be json string';
   *   }
   * });
   *
   * app.validator.validate({
   * 	 name: 'string',
   * 	 info: { type: 'jsonString', required: false },
   * }, {
   *   name: 'Egg',
   *   info: '{"foo": "bar"}',
   * });
   * ```
   */
  app.validator = new Parameter(app.config.validate);
  // 增加规则
  // 支持 json 类型
  app.validator.addRule('json',
    (rule, value) => {
      try {
        JSON.parse(value);
      } catch (err) {
        return 'must be json string';
      }
    },
    // 覆盖
    // true,
    value => {
      return JSON.parse(value);
    });
  // 大于 0 的整数
  app.validator.addRule('biggerZero', (rule, value) => {
    const v = parseInt(value);
    if (isNaN(v)) {
      return 'must integer';
    }
    if (v < 1) {
      return 'integer must bigger 0';
    }
  },
  value => {
    return parseInt(value);
  }
  );
  // 字符串表示的整数
  app.validator.addRule('intString', (rule, value) => {
    const v = parseInt(value);
    if (isNaN(v)) {
      return 'must integer';
    }
    if (rule.min && v < rule.min) {
      // 不能小于最小值
      return 'must bigger than ' + rule.min;
    }
    if (rule.max && v > rule.max) {
      // 不能大于最大值
      return 'must lower than ' + rule.max;
    }
  },
  value => {
    return parseInt(value);
  }
  );
};
