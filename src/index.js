import DatePicker from './picker/date-picker';
import deepmerge from 'deepmerge';
import lang from './lang/zh-CN';

/* istanbul ignore next */
DatePicker.install = function install(Vue) {
    // eslint-disable-next-line no-console
    console.log(Vue.config.lang);
    Vue.locale(Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.confcig.lang) || {}, { clone: true }));
    Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
