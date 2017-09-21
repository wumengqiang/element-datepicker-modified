<template>
  <table @click="handleQuarterTableClick" class="el-month-table">
    <tbody>
    <tr>
      <td :class="getCellStyle(0)">
        <a class="cell">{{ t('el.datepicker.months.halfyear.first') }}</a>
      </td>
      <td :class="getCellStyle(1)">
        <a class="cell">{{ t('el.datepicker.months.halfyear.second') }}</a>
      </td>
      <td :class="getCellStyle(2)">
        <a class="cell">{{ t('el.datepicker.months.halfyear.third') }}</a>
      </td>
      <td :class="getCellStyle(3)">
        <a class="cell">{{ t('el.datepicker.months.halfyear.fourth') }}</a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
  import Locale from 'element-ui/src/mixins/locale';
  import { hasClass } from 'element-ui/src/utils/dom';

  export default {
      props: {
          disabledDate: {},
          date: {},
          quarter: {
              type: Number
          }
      },
      mixins: [Locale],
      methods: {
          getCellStyle(quarter) {
              const style = {};

              var year = this.date.getFullYear();
              var date = new Date(0);
              date.setFullYear(year);
              date.setMonth(quarter * 3);
              date.setHours(0);
              var nextQuarter = new Date(date);
              if (quarter < 3) {
                  nextQuarter = nextQuarter.setMonth(quarter * 3 + 3);
              } else {
                  nextQuarter.setMonth(0);
                  nextQuarter.setFullYear(year + 1);
              }

              // 如果有一天可选，那么该项可选
              var flag = false;
              if (typeof this.disabledDate === 'function') {

                  while (date < nextQuarter) {
                      if (this.disabledDate(date)) {
                          date = new Date(date.getTime() + 8.64e7);
                          flag = true;
                      } else {
                          flag = false;
                          break;
                      }
                  }
              }

              style.disabled = flag;
              style.current = this.quarter === quarter;

              return style;
          },

          handleQuarterTableClick(event) {
              const target = event.target;
              if (target.tagName !== 'A') return;
              if (hasClass(target.parentNode, 'disabled')) return;
              const column = target.parentNode.cellIndex;
              this.$emit('pick', column);
          }
      }
  };
</script>
