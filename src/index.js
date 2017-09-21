import DatePicker from './picker/date-picker';
/* istanbul ignore next */
DatePicker.install = function install(Vue) {
    // eslint-disable-next-line no-console
    Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
