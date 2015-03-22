/**
 * Created by ruanzr on 3/21/15.
 */
angular.module('app').controller('SummaryCtrl', SummaryCtrl);

SummaryCtrl.$inject = ['$state', 'Fund'];

function SummaryCtrl($state, Fund) {
    var vm = this;
    vm.amount = 0;
    vm.dayIncome = 0;
    vm.totalIncome = 0;
    vm.date = '';
    var data = Fund.query({which: $state.current.name}, function() {
        console.log(JSON.stringify(data));
        initFundData(data.funds);
        $('.navbar-toggle').click();
    });

    function initFundData(funds) {
        vm.funds = funds;
        $.each(vm.funds, function (i, o) {
            vm.amount += o.amount;
            o.dayValIncome = o.today_value - o.preday_value;
            o.dayIncome = o.dayValIncome * o.shares;
            vm.dayIncome += o.dayIncome;
            o.totalIncome = o.today_value * o.shares - o.principal;
            vm.totalIncome += o.totalIncome;
            vm.date = (o.value_date > vm.date) ? o.value_date: vm.date;
        });
    }
}